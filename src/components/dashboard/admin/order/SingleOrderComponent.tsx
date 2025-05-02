"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useApprovedOrderMutation,
  useGetSingleDoQuery,
  useRejectOrderMutation,
} from "@/redux/api/doApi/doApi";
import { globalErrorHandler } from "@/utils";
import dayjs from "dayjs";
import {
  ArrowBigLeft,
  BackpackIcon,
  CheckCircle,
  Clock,
  Download,
  LoaderIcon,
  Phone,
  Printer,
  Store,
  User,
} from "lucide-react";
import { useRouter } from "next-nprogress-bar";
import { useRef } from "react";
import { toast } from "sonner";

function SingleOrderComponent({ orderId }: { orderId: string }) {
  const { data, isLoading } = useGetSingleDoQuery(orderId, { skip: !orderId });
  const [approvedOrder, { isLoading: approveLoading }] =
    useApprovedOrderMutation();
  const [rejectOrder, { isLoading: rejectLoading }] = useRejectOrderMutation();
  const printRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const orderData = data?.data;
  // Format date
  const formatDate = (dateString: any) => {
    if (!dateString) return "";

    return dayjs(dateString).format("DD MMM YYYY, h:mm A");
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "BDT",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Format large numbers
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US").format(num);
  };

  const handlePrint = () => {
    if (printRef.current) {
      const printContent = printRef.current.innerHTML;
      const printWindow = window.open("", "", "width=900,height=650");
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Print Order </title>
              <style>
                @media print {
                  body {
                    font-family: sans-serif;
                    padding: 20px;
                  }
                }
                /* Optional: include any required styles here */
              </style>
              <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">

            </head>
            <body>
              ${printContent}
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => {
          printWindow.print();
          printWindow.close();
        }, 500);
      }
    }
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleApprove = async () => {
    if (orderData?._id) {
      try {
        const result = await approvedOrder(orderData?._id).unwrap();
        if (result) {
          toast.success("Order approved successfully");
        }
      } catch (error) {
        globalErrorHandler(error);
      }
    }
  };

  const handleRejectOrder = async () => {
    if (orderData?._id) {
      try {
        const result = await rejectOrder(orderData?._id).unwrap();
        if (result) {
          toast.success("Order rejected successfully");
        }
      } catch (error) {
        globalErrorHandler(error);
      }
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div ref={printRef} className="grid gap-6">
        {/* Order Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <ArrowBigLeft
                className="cursor-pointer"
                onClick={() => router.back()}
              />
              <h1 className="text-3xl font-bold">
                Order #{orderData?.orderCode}
              </h1>
            </div>
            <p className="text-muted-foreground">
              {formatDate(orderData?.createdAt)}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Badge
              variant={orderData?.status === "pending" ? "outline" : "default"}
              className="px-3 py-1 text-sm"
            >
              {orderData?.status === "pending" ? (
                <Clock className="mr-1 h-4 w-4" />
              ) : (
                <CheckCircle className="mr-1 h-4 w-4" />
              )}
              {orderData?.status?.charAt(0)?.toUpperCase() +
                orderData?.status?.slice(1)}
            </Badge>
            <Button variant="outline" onClick={handlePrint}>
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Dealer Information */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Store className="h-5 w-5" />
                Dealer Information
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div>
                <h3 className="font-semibold text-lg">
                  {orderData?.dealer?.shopName}
                </h3>
                <p className="text-muted-foreground text-sm">
                  Code: {orderData?.dealer?.code}
                </p>
              </div>

              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{orderData?.dealer?.mobile}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>NID: {orderData?.dealer?.nidNo}</span>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium">
                  Group: {orderData?.dealer?.group}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Order Details */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
              <CardDescription>
                Products ordered on {formatDate(orderData?.createdAt)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Code</TableHead>
                    <TableHead className="text-right">Quantity</TableHead>
                    <TableHead className="text-right">Unit Price</TableHead>
                    <TableHead className="text-right">SP</TableHead>
                    <TableHead className="text-right">NP</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orderData?.product?.map((item: any) => (
                    <TableRow key={item._id}>
                      <TableCell className="font-medium">
                        {item?.product?.name}
                      </TableCell>
                      <TableCell>{item?.product?.productCode}</TableCell>
                      <TableCell className="text-right">
                        {formatNumber(item?.quantity)}
                      </TableCell>
                      <TableCell className="text-right">
                        {item?.price}
                      </TableCell>
                      <TableCell className="text-right">
                        {item?.sp}
                      </TableCell>
                      <TableCell className="text-right">
                        {item?.np}
                      </TableCell>
                      <TableCell className="text-right">
                        {item?.price * item?.quantity}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex flex-col items-end gap-4">
              <Separator />
              <div className="flex justify-between w-full md:w-1/2 text-lg">
                <span className="font-semibold">Total Amount:</span>
                <span className="font-bold">
                  {formatCurrency(orderData?.total)}
                </span>
              </div>
              <div className="flex gap-4">
                {!orderData?.approved && orderData?.status !== "canceled" && (
                  <Button
                    onClick={handleRejectOrder}
                    disabled={rejectLoading}
                    variant="outline"
                    className="w-32"
                  >
                    Reject
                    {rejectLoading && (
                      <span className="ml-2 animate-spin">
                        <LoaderIcon className="h-4 w-4" />
                      </span>
                    )}
                  </Button>
                )}

                {!orderData?.approved && orderData?.status !== "canceled" && (
                  <Button
                    disabled={approveLoading}
                    onClick={handleApprove}
                    className="w-32"
                  >
                    Approve
                    {approveLoading && (
                      <span className="ml-2 animate-spin">
                        <LoaderIcon className="h-4 w-4" />
                      </span>
                    )}
                  </Button>
                )}
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default SingleOrderComponent;
