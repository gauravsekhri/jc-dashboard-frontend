import PageHeader from "@/components/Common/PageHeader";

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
