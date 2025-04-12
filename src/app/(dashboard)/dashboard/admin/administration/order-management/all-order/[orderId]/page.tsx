import SingleOrderComponent from "@/components/dashboard/admin/order/SingleOrderComponent";
import React from "react";

export default async function page({
  params,
}: {
  params: { orderId: string };
}) {
  const orderId = params?.orderId;
  return (
    <div>
      <SingleOrderComponent orderId={orderId} />
    </div>
  );
}
