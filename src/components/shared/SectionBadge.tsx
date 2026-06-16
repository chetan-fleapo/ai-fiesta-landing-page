export function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-token-strong inline-flex items-center gap-2 rounded-pill border bg-card px-4 py-1.5 text-sm text-muted-foreground">
      {children}
    </div>
  );
}
