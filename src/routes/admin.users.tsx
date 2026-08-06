import { createFileRoute } from "@tanstack/react-router";
import { MoreHorizontal, Search } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/dashboard/dash-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { users } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/users")({
  head: () => ({
    meta: [
      { title: "User Management — SkillMatch AI Admin" },
      {
        name: "description",
        content: "Search, filter and moderate every candidate, employer and admin account.",
      },
      { property: "og:title", content: "User Management — SkillMatch AI Admin" },
      { property: "og:description", content: "Moderate accounts across the platform." },
    ],
  }),
  component: UsersPage,
});

const statusTone: Record<string, string> = {
  Active: "bg-success/12 text-success",
  Verified: "bg-primary/12 text-primary",
  Pending: "bg-warning/15 text-warning",
  Suspended: "bg-destructive/12 text-destructive",
};

const filters = ["All", "Candidate", "Employer", "Admin"] as const;

function UsersPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");

  const rows = users.filter(
    (u) =>
      (filter === "All" || u.role === filter) &&
      (u.name.toLowerCase().includes(query.toLowerCase()) ||
        u.email.toLowerCase().includes(query.toLowerCase())),
  );

  return (
    <>
      <PageHeader title="User management" subtitle={`${users.length} accounts in the demo dataset`} />

      <div className="mb-5 flex flex-wrap items-center gap-3">
        <div className="relative max-w-xs flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name or email…"
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          {filters.map((f) => (
            <Button
              key={f}
              size="sm"
              variant={filter === f ? "default" : "outline"}
              className={filter === f ? "bg-brand" : ""}
              onClick={() => setFilter(f)}
            >
              {f}
            </Button>
          ))}
        </div>
      </div>

      <Card className="gap-0 overflow-hidden p-0">
        {rows.length === 0 ? (
          <div className="flex flex-col items-center gap-2 p-14 text-center">
            <p className="font-display text-lg font-bold">No accounts found</p>
            <p className="text-sm text-muted-foreground">
              Nothing matches this filter combination.
            </p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Flags</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((u) => (
                <TableRow key={u.id}>
                  <TableCell className="font-semibold">{u.name}</TableCell>
                  <TableCell className="text-muted-foreground">{u.email}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="rounded-full">
                      {u.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{u.joined}</TableCell>
                  <TableCell className={u.flags > 0 ? "font-semibold text-destructive" : ""}>
                    {u.flags}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={`rounded-full ${statusTone[u.status]}`}>
                      {u.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost" aria-label="Row actions">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => toast("Profile opened")}>
                          View profile
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toast.success("Account verified")}>
                          Verify account
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => toast.error("Account suspended")}
                        >
                          Suspend
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </>
  );
}
