import React from "react";
import { getSubmissions } from "@/lib/actions/submissions";
import { DataTable } from "./data-table";
import { columns } from "./columns";

const page = async () => {
  const submissions = await getSubmissions();
  if (!submissions || submissions.error || !submissions.data) return null;
  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:px-6 md:py-8">
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Submissions</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              View all your submitted solutions
            </p>
          </div>
        </div>
      </header>
      <DataTable columns={columns} data={submissions.data} />
    </div>
  );
};

export default page;
