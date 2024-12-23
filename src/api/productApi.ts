import { IProduct } from "@/types/productType";

export const getProductById = async (
  id: string
): Promise<IProduct | undefined> => {
  const products: IProduct[] = [
    {
      productCode: "3312",
      description: "4 Seated Deluxe Table -Print R/W Golden(P/L)-TEL",
      name: "4 Seated Deluxe Table -Print R/W Golden(P/L)-TEL",
      price: 1555,
      stock: 5,
      group: "Table",
      image: "https://via.placeholder.com/150",
      _id: "1",
    },
    {
      productCode: "2312",
      description: "4 Seated Deluxe Table-Print Black Royal (Pl/L)-TEL",
      name: "4 Seated Deluxe Table-Print Black Royal (Pl/L)-TEL",
      price: 1555,
      stock: 10,
      group: "Table",
      image: "https://via.placeholder.com/150",
      _id: "2",
    },
  ];

  const product = products.find((product) => product._id === id);
  return product;
};

export const getProducts = async (): Promise<IProduct[]> => {
  const products: IProduct[] = [
    {
      productCode: "3312",
      description: "4 Seated Deluxe Table -Print R/W Golden(P/L)-TEL",
      name: "4 Seated Deluxe Table -Print R/W Golden(P/L)-TEL",
      price: 1555,
      stock: 5,
      group: "Table",
      image: "https://via.placeholder.com/150",
      _id: "1",
    },
    {
      productCode: "2312",
      description: "4 Seated Deluxe Table-Print Black Royal (Pl/L)-TEL",
      name: "4 Seated Deluxe Table-Print Black Royal (Pl/L)-TEL",
      price: 1555,
      stock: 10,
      group: "Table",
      image: "https://via.placeholder.com/150",
      _id: "2",
    },
  ];

  return products;
};
