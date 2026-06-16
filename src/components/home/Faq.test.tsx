import { FAQ_ITEMS } from '@/constants/faq';
import '@/i18n/i18n';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Faq } from './Faq';

describe('<Faq />', () => {
  it('renders every question', () => {
    render(<Faq />);
    for (const item of FAQ_ITEMS) {
      expect(screen.getByText(item.question)).toBeDefined();
    }
    expect(FAQ_ITEMS).toHaveLength(14);
  });

  it('expands an item on click and collapses it again', () => {
    render(<Faq />);
    const first = FAQ_ITEMS[0];
    const trigger = screen.getByText(first.question);
    const answerText = (first.answer[0] as { text: string }).text;

    expect(screen.queryByText(answerText)).toBeNull();
    fireEvent.click(trigger);
    expect(screen.getByText(answerText)).toBeDefined();
    fireEvent.click(trigger);
    expect(screen.queryByText(answerText)).toBeNull();
  });

  it('only keeps one item open at a time', () => {
    render(<Faq />);
    const [first, second] = FAQ_ITEMS;
    const firstAnswer = (first.answer[0] as { text: string }).text;
    const secondAnswer = (second.answer[0] as { text: string }).text;

    fireEvent.click(screen.getByText(first.question));
    expect(screen.getByText(firstAnswer)).toBeDefined();

    fireEvent.click(screen.getByText(second.question));
    expect(screen.getByText(secondAnswer)).toBeDefined();
    expect(screen.queryByText(firstAnswer)).toBeNull();
  });

  it('links the contact CTA to the support email', () => {
    render(<Faq />);
    const contact = screen.getByText('Contact us').closest('a');
    expect(contact?.getAttribute('href')).toBe('mailto:Support@aifiesta.ai');
  });
});
