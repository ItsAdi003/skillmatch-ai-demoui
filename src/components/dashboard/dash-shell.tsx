import { Link, Outlet } from "@tanstack/react-router";
import { Bell, LogOut, Menu, Search } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export type NavItem = { label: string; to: string; icon: LucideIcon };

function NavList({ items, onNavigate }: { items: NavItem[]; onNavigate?: () => void }) {
  return (
    <nav className="flex flex-col gap-1">
      {items.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          onClick={onNavigate}
          activeOptions={{ exact: item.to.split("/").length <= 2 }}
          activeProps={{
            className:
              "bg-sidebar-accent text-sidebar-accent-foreground font-semibold shadow-card",
          }}
          inactiveProps={{ className: "text-muted-foreground hover:bg-sidebar-accent/50" }}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all"
        >
          <item.icon className="h-[17px] w-[17px] shrink-0" />
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

export function DashShell({
  items,
  role,
  user,
  initials,
  children,
}: {
  items: NavItem[];
  role: string;
  user: string;
  initials: string;
  children?: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-background">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r bg-sidebar px-4 py-5 lg:flex">
        <Logo />
        <Badge variant="secondary" className="mt-5 w-fit rounded-full">
          {role}
        </Badge>
        <div className="mt-4 flex-1 overflow-y-auto">
          <NavList items={items} />
        </div>
        <div className="mt-4 rounded-xl bg-soft p-4">
          <p className="text-sm font-semibold">Demo workspace</p>
          <p className="mt-1 text-xs text-muted-foreground">
            All numbers on this dashboard are mock data.
          </p>
        </div>
        <Button asChild variant="ghost" className="mt-3 justify-start gap-3 text-muted-foreground">
          <Link to="/login">
            <LogOut className="h-[17px] w-[17px]" /> Sign out
          </Link>
        </Button>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-40 flex h-16 items-center gap-3 border-b glass px-4 sm:px-6">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 bg-sidebar px-4 py-5">
              <Logo />
              <Badge variant="secondary" className="mt-5 w-fit rounded-full">
                {role}
              </Badge>
              <div className="mt-4">
                <NavList items={items} onNavigate={() => setOpen(false)} />
              </div>
            </SheetContent>
          </Sheet>

          <div className="relative hidden max-w-sm flex-1 sm:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search jobs, skills, candidates…" className="pl-9" />
          </div>

          <div className="ml-auto flex items-center gap-1.5">
            <ThemeToggle />
            <Button variant="ghost" size="icon" aria-label="Notifications" className="relative">
              <Bell className="h-[18px] w-[18px]" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-destructive" />
            </Button>
            <div className="ml-1 flex items-center gap-2.5">
              <Avatar className="h-9 w-9">
                <AvatarFallback className="bg-brand text-xs font-bold text-primary-foreground">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="hidden leading-tight sm:block">
                <p className="text-sm font-semibold">{user}</p>
                <p className="text-xs text-muted-foreground">{role}</p>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-[1200px] animate-fade-up">{children ?? <Outlet />}</div>
        </main>
      </div>
    </div>
  );
}

export function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">{title}</h1>
        {subtitle && <p className="mt-1.5 text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
