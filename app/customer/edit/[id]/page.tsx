import EditForm from "@/app/components/customer/EditForm";
import React from "react";

export default function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  return <EditForm id={id} />;
}
