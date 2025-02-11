import React from "react";
import { getSubmissions } from "@/lib/actions/submissions";
import { DataTable } from "./data-table";
import { columns } from "./columns";

const page = async () => {
  const submissions = await getSubmissions();
  if (!submissions || submissions.error || !submissions.data) return null;
  return (
    <div>
      <DataTable columns={columns} data={submissions.data} />
    </div>
  );
};

export default page;
