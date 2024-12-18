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
import Link from "next/link";
import request from "@/utils/ApiRequest2";
import EditProductForm from "@/components/ProductsModule/EditProductForm";

const EditProductPage = async ({
  params,
}: {
  params: Promise<{ productid: string }>;
}) => {
  const productId = (await params).productid;
  const apiResponse = await request("/products/" + productId, "GET");

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
            <BreadcrumbPage>Edit Product</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Edit Product</h1>
      </div>

      {apiResponse.success === true ? (
        <EditProductForm {...apiResponse.data} />
      ) : (
        <div className="py-20 px-10 text-center text-neutral-400">
          <div className="text-xl font-bold">Product not found!</div>
          <div className="text-md mt-2 italic">
            Please check the url. There is no such product in the database.
          </div>
        </div>
      )}

      {/* <div className="mb-8">{productId}</div> */}
      {/* <div>{apiResponse.data.name}</div> */}
    </>
  );
};

export default EditProductPage;
