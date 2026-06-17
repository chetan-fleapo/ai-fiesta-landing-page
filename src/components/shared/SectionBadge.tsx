export function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="section-badge inline-flex items-center gap-2 rounded-pill border border-[#0b4624] bg-card px-4 py-1.5 text-base text-[rgba(0,0,0,0.80)] dark:text-[#fff9]">
      {children}
    </div>
  );
}
