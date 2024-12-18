"use client";

import { Button } from "@/components/ui/button";
import { Pencil, Plus, Trash2 } from "lucide-react";

import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { IProduct } from "@/interfaces/productInterfaces";
import Link from "next/link";
import request from "@/utils/ApiRequest2";
import { toast } from "sonner";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";

const RowActions = ({ name, productId }: IProduct) => {
  const router = useRouter();
  const handleDelete = async () => {
    const apiResponse = await request("/products/" + productId, "DELETE");

    if (apiResponse.success) {
      toast.success(apiResponse.message);
      //   revalidatePath("/products");
      router.push("/products");
    } else {
      toast.error(apiResponse.message);
    }
  };

  return (
    <>
      <AlertDialog>
        <div
          className="flex items-center gap-2 justify-end"
          key={String(productId)}
        >
          <Link href={`/products/${productId}`}>
            <Button className="px-2 py-1" variant="outline">
              <Pencil className="h-2 w-2" />
            </Button>
          </Link>
          <AlertDialogTrigger asChild>
            <Button className="px-2 py-1 hover:text-rose-400" variant="outline">
              <Trash2 className="h-2 w-2" />
            </Button>
          </AlertDialogTrigger>
        </div>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete "{name}"?
            </AlertDialogTitle>
            <AlertDialogDescription className="py-4">
              This action cannot be undone. This will permanently delete this
              product and it will be removed from the servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default RowActions;
