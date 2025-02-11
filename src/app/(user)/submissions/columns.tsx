"use client";

import { DeliverableTypes } from "@/utils/types";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ArrowUpRight, MoreHorizontal } from "lucide-react";
import { ArrowUpDown } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import { toast } from "sonner";
import { DeliverableStatus } from "@prisma/client";
import { changeDeliverableStatus } from "@/lib/actions/submissions";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<DeliverableTypes>[] = [
  {
    accessorKey: "user.name",
    header: "Submitted By",
  },
  {
    accessorKey: "challenge.title",
    header: "Challenge Title",
  },
  {
    accessorKey: "challengeId",
    header: "Challenge ID",
  },
  {
    accessorKey: "codebase_link",
    header: "Repository Link",
    cell: ({ row }) => {
      const url = row.getValue("codebase_link") as string;
      const displayUrl = url.replace(/^https?:\/\//, "").split("/")[0];

      return (
        <Link
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center hover:underline text-primary"
        >
          {displayUrl}
          <ArrowUpRight className="ml-1 h-4 w-4" />
        </Link>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as DeliverableStatus;

      return (
        <Badge
          className={
            status === "Submitted"
              ? "bg-slate-200 text-slate-800 border-slate-300 dark:bg-slate-700 dark:text-slate-200 dark:border-slate-600"
              : status === "Accepted"
              ? "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800"
              : status === "Rejected"
              ? "bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-900/30 dark:text-rose-400 dark:border-rose-800"
              : "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800"
          }
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="font-medium"
        >
          Submission Time
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return format(new Date(row.getValue("createdAt")), "PPp");
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const challengeId = row.original.challengeId;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open actions menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(challengeId);
                toast("Challenge ID copied", {
                  description: "Challenge ID has been copied to clipboard",
                  duration: 3000,
                });
              }}
            >
              Copy Challenge ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled aria-disabled="true">
              Nudge issue
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <Dialog>
              <DialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  Change Status
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Change Status</DialogTitle>
                  <DialogDescription>
                    Update your current status here. Click save when you&apos;re
                    done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="status" className="text-right">
                      Status
                    </Label>
                    <Select
                      onValueChange={async (value: DeliverableStatus) => {
                        const result = await changeDeliverableStatus(
                          row.original.id,
                          value
                        );
                        if (result.error) {
                          toast.error(result.error);
                        } else {
                          toast.success("Status updated successfully");
                        }
                      }}
                      defaultValue={row.original.status}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Submitted">Submitted</SelectItem>
                        <SelectItem value="Accepted">Accepted</SelectItem>
                        <SelectItem value="Rejected">Rejected</SelectItem>
                        <SelectItem value="NeedsRevision">
                          Needs Revision
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
