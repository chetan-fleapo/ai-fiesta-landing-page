import { registerAndCheckout } from '@/lib/payments';
import { usePricingStore } from '@/stores/pricing';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
}

/**
 * "User Details" modal replicated from the original site: collects name and
 * email, then opens Razorpay subscription checkout.
 */
export default function PaymentModal({ open, onClose }: PaymentModalProps) {
  const { t } = useTranslation();
  const period = usePricingStore((s) => s.period);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get('name') ?? '').trim();
    const email = String(form.get('email') ?? '').trim();
    if (!name || !email) return;

    setSubmitting(true);
    setError(null);
    try {
      await registerAndCheckout(name, email, period);
      onClose();
    } catch {
      setError(t('paymentModal.genericError'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={t('paymentModal.title')}
      onClick={onClose}
    >
      <div
        className="w-full max-w-md animate-fade-in rounded-2xl bg-white p-8 text-black shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h3 className="font-heading text-2xl font-bold">
            {t('paymentModal.title')}
          </h3>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="text-2xl leading-none text-black/60 hover:text-black"
          >
            ×
          </button>
        </div>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <label className="block">
            <span className="text-sm font-medium">
              {t('paymentModal.email')} <span className="text-red-500">*</span>
            </span>
            <input
              type="email"
              name="email"
              required
              className="mt-1.5 w-full rounded-lg border border-black/20 px-4 py-3 outline-none focus:border-[#4caf50]"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium">
              {t('paymentModal.name')} <span className="text-red-500">*</span>
            </span>
            <input
              type="text"
              name="name"
              required
              className="mt-1.5 w-full rounded-lg border border-black/20 px-4 py-3 outline-none focus:border-[#4caf50]"
            />
          </label>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-pill bg-black py-3.5 font-heading font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {submitting
              ? t('paymentModal.processing')
              : t('paymentModal.submit')}
          </button>
        </form>
      </div>
    </div>
  );
}
