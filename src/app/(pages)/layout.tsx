import "../globals.scss";
import "@/lib/ag-charts-modules"; // Register AG Charts modules once
import Sidebar from "@/components/sidebar";
import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Sidebar />
      <main>{children}</main>
    </>
  );
}
