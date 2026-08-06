import { Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <Link to="/" className={cn("flex items-center gap-2.5", className)}>
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand shadow-glow">
        <Sparkles className="h-[18px] w-[18px] text-primary-foreground" />
      </span>
      {!compact && (
        <span className="font-display text-[17px] font-bold tracking-tight">
          SkillMatch <span className="gradient-text">AI</span>
        </span>
      )}
    </Link>
  );
}
