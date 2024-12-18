"use client";

import { deleteCookie } from "@/utils/cookieActions";
import { useRouter } from "next/navigation";
import React from "react";

const PageHeader = () => {
  const router = useRouter();

  const handleLogout = () => {
    deleteCookie("auth");
    router.push("/login");
  };

  return (
    <>
      <div className="px-4 py-8 flex justify-between items-center">
        <div className="font-bold">JC</div>
        <div
          className="cursor-pointer text-neutral-500 hover:text-black"
          onClick={handleLogout}
        >
          Logout
        </div>
      </div>
    </>
  );
};

export default PageHeader;
