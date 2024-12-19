import PageHeader from "@/components/Common/PageHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products | Assignment | Jasper Colin",
  description: "This is a sample description for my application.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="max-w-7xl mx-auto px-4">
        <PageHeader />
        {children}
      </div>
    </>
  );
}
