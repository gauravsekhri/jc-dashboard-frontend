import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

const ProductsLoading = () => {
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
          {[1, 2, 3, 4, 5].map((ele, ei: number) => (
            <TableRow key={ei}>
              <TableCell className="font-medium p-2 text-left">
                <Skeleton className="w-2/4 h-6 my-2" />
              </TableCell>
              <TableCell className="p-2">
                <Skeleton className="w-2/4 h-6 my-2" />
              </TableCell>
              <TableCell className="p-2">
                <Skeleton className="w-2/4 h-6 my-2" />
              </TableCell>
              <TableCell className="text-right p-2">
                <Skeleton className="w-2/4 h-6 my-2 ml-auto" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default ProductsLoading;
