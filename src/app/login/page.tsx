import LoginForm from "@/components/AuthModule/LoginForm";
import React from "react";
import { cookies } from "next/headers";

const LoginPage = async () => {
  const cookieStore = await cookies();

  return (
    <>
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <LoginForm />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
