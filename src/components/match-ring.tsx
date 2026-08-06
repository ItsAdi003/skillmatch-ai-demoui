import { cn } from "@/lib/utils";

export function MatchRing({
  value,
  size = 84,
  label,
  className,
  tone = "primary",
}: {
  value: number;
  size?: number;
  label?: string;
  className?: string;
  tone?: "primary" | "violet" | "success" | "warning" | "destructive";
}) {
  const stroke = size >= 70 ? 8 : 6;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const toneVar = {
    primary: "var(--color-primary)",
    violet: "var(--color-violet)",
    success: "var(--color-success)",
    warning: "var(--color-warning)",
    destructive: "var(--color-destructive)",
  }[tone];

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={stroke}
          stroke="var(--color-muted)"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={stroke}
          stroke={toneVar}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c - (Math.min(value, 100) / 100) * c}
          style={{ transition: "stroke-dashoffset 1s cubic-bezier(0.2,0.8,0.2,1)" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-base font-bold leading-none">{value}%</span>
        {label && (
          <span className="mt-0.5 text-[10px] font-medium text-muted-foreground">{label}</span>
        )}
      </div>
    </div>
  );
}
