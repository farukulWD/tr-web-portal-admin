import SingleUndeliveredPage from "@/components/dashboard/admin/undelivered/SingleUndeliveredPage";
import React from "react";

async function async({ params }: { params: { undeliveredId: string } }) {
  const id = params?.undeliveredId;

  return (
    <div>
      <SingleUndeliveredPage undeliveredId={id} />
    </div>
  );
}

export default async;
