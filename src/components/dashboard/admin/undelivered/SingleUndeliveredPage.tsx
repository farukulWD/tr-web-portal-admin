"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useSingleUndeliveredQuery } from "@/redux/api/doApi/doApi";
import GlobalSkeletonTable from "@/components/shared/global/GlobalSkeletonTable";
import { toast } from "sonner";
import { useMakeDeliveredMutation } from "@/redux/api/deliveredApi/deliveredApi";

export interface IDeliveredProduct {
  product: string;
  quantity: number;
  price: number;
  total: number;
  orderCode: string;
  doDate: Date;
  productCode: number;
  undeliveredPId: string;
  _id?: string;
}

// Type for the delivered document
export interface IDelivered {
  dealer: string;
  dealerCode: number;
  totalDeliveredAmount: number;
  products: IDeliveredProduct[];
}

export default function SingleUndeliveredPage({
  undeliveredId,
}: {
  undeliveredId: string;
}) {
  const [selectedProducts, setSelectedProducts] = useState<
    Record<string, boolean>
  >({});
  const [deliveryQuantities, setDeliveryQuantities] = useState<
    Record<string, number>
  >({});
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { data, isLoading: dataLoading } = useSingleUndeliveredQuery(
    undeliveredId,
    { skip: !undeliveredId, refetchOnMountOrArgChange: true }
  );
  const [makeDelivered] = useMakeDeliveredMutation();

  const dealerData = data?.data;

  // Initialize delivery quantities with product quantities
  useState(() => {
    const initialQuantities: Record<string, number> = {};
    dealerData?.products?.forEach((product: any) => {
      initialQuantities[product._id] = 0;
    });
    setDeliveryQuantities(initialQuantities);
  });

  const handleSelectProduct = (productId: string) => {
    setSelectedProducts((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const handleQuantityChange = (productId: string, value: string) => {
    const quantity = Number.parseInt(value) || 0;
    setDeliveryQuantities((prev) => ({
      ...prev,
      [productId]: quantity,
    }));
  };

  const showPreview = () => {
    const selectedProductsData = dealerData?.products?.filter(
      (product: any) => selectedProducts[product._id]
    );

    if (selectedProductsData.length === 0) {
      toast.warning("Please select at least one product for delivery", {
        position: "top-center",
      });
      return;
    }

    // Check if any selected product has a delivery quantity of 0
    const hasZeroQuantity = selectedProductsData?.some(
      (product: any) =>
        !deliveryQuantities[product._id] ||
        deliveryQuantities[product._id] === 0
    );

    if (hasZeroQuantity) {
      toast.warning(
        "Please enter a quantity greater than 0 for all selected products",
        { position: "top-center" }
      );
      return;
    }

    setIsPreviewOpen(true);
  };

  // Function to call API and process delivery
  const processDelivery = async () => {
    setIsLoading(true);

    try {
      const selectedProductsData = dealerData?.products?.filter(
        (product: any) => selectedProducts[product._id]
      );

      // Prepare data for API
      const deliveryData: IDelivered = {
        dealer: dealerData.dealer._id,
        dealerCode: dealerData?.dealerCode,
        products: selectedProductsData.map((product: any) => {
          return {
            product: product?.product?._id,
            productCode: product.productCode,
            orderCode: product.orderCode,
            quantity: deliveryQuantities[product._id],
            price: product?.price,
            total: deliveryQuantities[product?._id] * product?.price,
            doDate: product?.doDate,
            undeliveredPId: product._id,
          };
        }),
        totalDeliveredAmount: selectedProductsData.reduce(
          (sum: any, product: any) =>
            sum + deliveryQuantities[product._id] * product.price,
          0
        ),
      };

      // Call API to save delivery data
      // Replace with your actual API endpoint
      // const response = await fetch("/api/deliveries", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(deliveryData),
      // })

      // if (!response.ok) {
      //   throw new Error("Failed to process delivery")
      // }
      try {
        const response = await makeDelivered({
          undeliveredId,
          deliveredData: deliveryData,
        }).unwrap();
        console.log(response);
      } catch (error) {
        if (error) {
          throw new Error("Failed to process delivery");
        }
      }

      // // If API call is successful, generate PDFs
      generateDealerPDF(selectedProductsData);
      generateCompanyPDF(selectedProductsData);

      // Close the preview dialog
      setIsPreviewOpen(false);

      // Reset selections after successful delivery
      resetSelections();
    } catch (error) {
      toast.warning("Failed to process delivery. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetSelections = () => {
    setSelectedProducts({});
    const initialQuantities: Record<string, number> = {};
    dealerData.products.forEach((product: any) => {
      initialQuantities[product._id] = 0;
    });
    setDeliveryQuantities(initialQuantities);
  };

  const generateDealerPDF = (
    selectedProductsData: typeof dealerData.products
  ) => {
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(18);
    doc.text("Delivery Receipt - Dealer Copy", 105, 15, { align: "center" });

    // Add dealer information
    doc.setFontSize(12);
    doc.text(`Shop Name: ${dealerData.dealer.shopName}`, 14, 30);
    doc.text(`Dealer Code: ${dealerData.dealer.code}`, 14, 37);
    doc.text(`Mobile: ${dealerData.dealer.mobile}`, 14, 44);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 51);

    // Add product table
    const tableColumn = [
      "Order Code",
      "Product Code",
      "Product Name",
      "Quantity",
      "Price",
      "Total",
    ];
    const tableRows = selectedProductsData.map((product: any) => [
      product.orderCode,
      product.productCode,
      product?.product?.name,
      deliveryQuantities[product._id],
      product.price,
      deliveryQuantities[product._id] * product.price,
    ]);

    // Use autoTable directly
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 60,
      theme: "grid",
    });

    // Calculate total
    const total = selectedProductsData.reduce(
      (sum: any, product: any) =>
        sum + deliveryQuantities[product._id] * product.price,
      0
    );

    // Get the final Y position after the table
    const finalY = (doc as any).lastAutoTable.finalY || 150;

    doc.text(`Total Delivered Amount: ${total}`, 14, finalY + 10);

    // Add signature fields
    doc.text("Dealer Signature: _________________", 14, finalY + 25);
    doc.text("Company Representative: _________________", 14, finalY + 35);
    doc.text(
      `Total Undelivered Amount: ${dealerData.totalUndeliveredAmount - total}`,
      14,
      finalY + 64
    );

    // Save the PDF
    doc.save("dealer_delivery_receipt.pdf");
  };

  const generateCompanyPDF = (
    selectedProductsData: typeof dealerData.products
  ) => {
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(18);
    doc.text("Delivery Receipt - Company Copy", 105, 15, { align: "center" });

    // Add dealer information
    doc.setFontSize(12);
    doc.text(`Shop Name: ${dealerData.dealer.shopName}`, 14, 30);
    doc.text(`Dealer Code: ${dealerData.dealer.code}`, 14, 37);
    doc.text(`Mobile: ${dealerData.dealer.mobile}`, 14, 44);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 51);

    // Add product table
    const tableColumn = [
      "Order Code",
      "Product Code",
      "Product Name",
      "Quantity",
      "Price",
      "Total",
    ];
    const tableRows = selectedProductsData?.map((product: any) => [
      product.orderCode,
      product.productCode,
      product?.product?.name,
      deliveryQuantities[product._id],
      product.price,
      deliveryQuantities[product._id] * product.price,
    ]);

    // Use autoTable directly
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 60,
      theme: "grid",
    });

    // Calculate total
    const total = selectedProductsData.reduce(
      (sum: any, product: any) =>
        sum + deliveryQuantities[product._id] * product.price,
      0
    );

    // Get the final Y position after the table
    const finalY = (doc as any).lastAutoTable.finalY || 150;

    doc.text(`Total Delivered Amount: ${total}`, 14, finalY + 10);

    // Add signature fields
    doc.text("Dealer Signature: _________________", 14, finalY + 25);
    doc.text("Company Representative: _________________", 14, finalY + 35);

    // Add additional company information
    doc.text("Internal Use Only:", 14, finalY + 50);
    doc.text(`Delivery ID: ${Date.now()}`, 14, finalY + 57);
    doc.text(
      `Total Undelivered Amount: ${dealerData.totalUndeliveredAmount - total}`,
      14,
      finalY + 64
    );

    // Save the PDF
    doc.save("company_delivery_receipt.pdf");
  };

  // Get selected products for preview
  const selectedProductsData = dealerData?.products?.filter(
    (product: any) => selectedProducts[product._id]
  );

  // Calculate total amount for selected products
  const totalAmount = selectedProductsData?.reduce(
    (sum: any, product: any) =>
      sum + deliveryQuantities[product._id] * product.price,
    0
  );

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Single Undelivered</h1>

      {dataLoading ? (
        <div className="text-center">
          <GlobalSkeletonTable />
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Dealer Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="font-medium">Shop Name:</div>
                    <div>{dealerData.dealer.shopName}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="font-medium">Dealer Code:</div>
                    <div>{dealerData.dealer.code}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="font-medium">Mobile:</div>
                    <div>{dealerData.dealer.mobile}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="font-medium">Group:</div>
                    <div>{dealerData.dealer.group}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="font-medium">NID No:</div>
                    <div>{dealerData.dealer.nidNo}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Financial Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {/* <div className="grid grid-cols-2 gap-2">
                    <div className="font-medium">Total Balance:</div>
                    <div>{dealerData.dealer.money}</div>
                  </div> */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="font-medium">Undelivered Amount:</div>
                    <div>{dealerData.totalUndeliveredAmount}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="font-medium">Total Products:</div>
                    <div>{dealerData.products.length}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Products for Delivery</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">Select</TableHead>
                    <TableHead>Order Code</TableHead>
                    <TableHead>Product Code</TableHead>
                    <TableHead>Product Name</TableHead>

                    <TableHead>Available Quantity</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Delivery Quantity</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dealerData?.products?.map((product: any) => (
                    <TableRow key={product._id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedProducts[product._id] || false}
                          onCheckedChange={() =>
                            handleSelectProduct(product._id)
                          }
                        />
                      </TableCell>
                      <TableCell>{product.orderCode}</TableCell>
                      <TableCell>{product.productCode}</TableCell>
                      <TableCell>{product?.product?.name}</TableCell>
                      <TableCell>{product.quantity}</TableCell>
                      <TableCell>{product.price}</TableCell>
                      <TableCell>{product.total}</TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          min="1"
                          max={product?.quantity}
                          value={deliveryQuantities[product._id] || 1}
                          onChange={(e) =>
                            handleQuantityChange(product._id, e.target.value)
                          }
                          disabled={!selectedProducts[product._id]}
                          className="w-24"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button onClick={showPreview} size="lg">
              Process Delivery
            </Button>
          </div>

          {/* Preview Dialog */}
          <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Delivery Preview</DialogTitle>
                <DialogDescription>
                  Review the delivery details before confirming
                </DialogDescription>
              </DialogHeader>

              <div className="py-4">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <h3 className="font-semibold mb-2">Dealer Information</h3>
                    <p>Shop Name: {dealerData.dealer.shopName}</p>
                    <p>Dealer Code: {dealerData.dealer.code}</p>
                    <p>Mobile: {dealerData.dealer.mobile}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Delivery Information</h3>
                    <p>Date: {new Date().toLocaleDateString()}</p>
                    <p>Total Products: {selectedProductsData.length}</p>
                    <p>Total Amount: {totalAmount}</p>
                  </div>
                </div>

                <h3 className="font-semibold mb-2">Selected Products</h3>
                <ScrollArea className="h-[200px] rounded-md border p-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product Code</TableHead>
                        <TableHead>Order Code</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedProductsData.map((product: any) => (
                        <TableRow key={product._id}>
                          <TableCell>{product.productCode}</TableCell>
                          <TableCell>{product.orderCode}</TableCell>
                          <TableCell>
                            {deliveryQuantities[product._id]}
                          </TableCell>
                          <TableCell>{product.price}</TableCell>
                          <TableCell>
                            {deliveryQuantities[product._id] * product.price}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsPreviewOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={processDelivery} disabled={isLoading}>
                  {isLoading ? "Processing..." : "Confirm & Generate PDFs"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
}
