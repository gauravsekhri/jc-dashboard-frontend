import AddProductForm from "@/components/ProductsModule/AddProductForm";
import { Button } from "@/components/ui/button";
import { Plus, List } from "lucide-react";
import Link from "next/link";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const AddProduct = () => {
  return (
    <>
      <Breadcrumb className="my-10">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/products">Products</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Add Product</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Add Product</h1>
      </div>
      <AddProductForm />
    </>
  );
};

export default AddProduct;
