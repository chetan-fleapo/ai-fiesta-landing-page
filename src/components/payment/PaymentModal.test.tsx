import { PLAN_IDS } from '@/constants/pricing';
import '@/i18n/i18n';
import { usePricingStore } from '@/stores/pricing';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import PaymentModal from './PaymentModal';

const openSpy = vi.fn();
const razorpayCtor = vi.fn();

describe('<PaymentModal />', () => {
  beforeEach(() => {
    vi.unstubAllGlobals();
    openSpy.mockClear();
    razorpayCtor.mockReset();
    // Must be constructible (`new Razorpay(...)`), so no arrow function
    razorpayCtor.mockImplementation(function () {
      return { open: openSpy };
    });
    // Pre-set Razorpay so loadRazorpayScript resolves without injecting
    (window as unknown as { Razorpay: unknown }).Razorpay = razorpayCtor;
    usePricingStore.setState({ period: 'yearly' });
  });

  function fillAndSubmit() {
    fireEvent.change(screen.getByLabelText(/Email/), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/Name/), {
      target: { value: 'Test User' }
    });
    fireEvent.click(screen.getByText('Proceed to Pay'));
  }

  it('registers the subscriber and opens Razorpay checkout', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ id: 'sub_123' })
    });
    vi.stubGlobal('fetch', fetchMock);

    render(<PaymentModal open onClose={() => {}} />);
    fillAndSubmit();

    await waitFor(() => expect(openSpy).toHaveBeenCalled());

    const [url, init] = fetchMock.mock.calls[0];
    expect(String(url)).toContain('/api/razorpay/register-and-checkout');
    const body = JSON.parse((init as RequestInit).body as string);
    expect(body.name).toBe('Test User');
    expect(body.email).toBe('test@example.com');
    expect(body.planId).toBe(PLAN_IDS.yearly.rzpPlanId);
    expect(body.duration).toBe(12);

    const options = razorpayCtor.mock.calls[0][0];
    expect(options.subscription_id).toBe('sub_123');
    expect(options.prefill).toEqual({
      name: 'Test User',
      email: 'test@example.com'
    });
  });

  it('sends the monthly plan id when monthly is selected', async () => {
    usePricingStore.setState({ period: 'monthly' });
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ id: 'sub_456' })
    });
    vi.stubGlobal('fetch', fetchMock);

    render(<PaymentModal open onClose={() => {}} />);
    fillAndSubmit();

    await waitFor(() => expect(openSpy).toHaveBeenCalled());
    const body = JSON.parse(
      (fetchMock.mock.calls[0][1] as RequestInit).body as string
    );
    expect(body.planId).toBe(PLAN_IDS.monthly.rzpPlanId);
    expect(body.duration).toBe(1);
  });

  it('shows an error message when registration fails', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: false, status: 500 })
    );

    render(<PaymentModal open onClose={() => {}} />);
    fillAndSubmit();

    await waitFor(() =>
      expect(
        screen.getByText('Something went wrong. Please try again.')
      ).toBeDefined()
    );
    expect(openSpy).not.toHaveBeenCalled();
  });

  it('closes via the × button and renders nothing when closed', () => {
    const onClose = vi.fn();
    const { rerender, container } = render(
      <PaymentModal open onClose={onClose} />
    );
    fireEvent.click(screen.getByLabelText('Close'));
    expect(onClose).toHaveBeenCalled();

    rerender(<PaymentModal open={false} onClose={onClose} />);
    expect(container.innerHTML).toBe('');
  });
});
