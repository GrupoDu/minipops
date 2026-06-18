import "../globals.scss";
import "@/lib/ag-charts-modules"; // Register AG Charts modules once
import Sidebar from "@/components/sidebar";
import React, { Suspense } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Sidebar />
      <main>
        <Suspense fallback={<div>Carregando...</div>}>
          {children}
        </Suspense>
      </main>
    </>
  );
}
