import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import Link from "next/link";
import React from "react";
import { Plus } from "lucide-react";
import request from "@/utils/ApiRequest2";
import { IProduct } from "@/interfaces/productInterfaces";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import RowActions from "@/components/ProductsModule/RowActions";
import { Skeleton } from "@/components/ui/skeleton";

const ProductsPage = async () => {
  const response = await request("/products", "GET");
  const productsList: IProduct[] = response?.data ?? [];

  return (
    <>
      <Breadcrumb className="my-10">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>Products</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Products</h1>
        <Link href="/products/add-product">
          <Button size="sm">
            <Plus />
            Add Product
          </Button>
        </Link>
      </div>
      <div className="max-h-[70vh] overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="px-2">Product Name</TableHead>
              <TableHead className="px-2">Category</TableHead>
              <TableHead className="px-2">Price</TableHead>
              <TableHead className="px-2 text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productsList.map((row: IProduct, ri: number) => (
              <TableRow key={String(row.productId) + ri}>
                <TableCell className="font-medium p-2 text-left">
                  {row.name.substring(0, 20)}
                </TableCell>
                <TableCell className="p-2">{row.category}</TableCell>
                <TableCell className="p-2">{`₹${row.price.toLocaleString()}`}</TableCell>
                <TableCell className="text-right p-2">
                  <RowActions {...row} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default ProductsPage;
