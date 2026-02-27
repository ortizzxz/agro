import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "./components/NavSextion";
export const metadata: Metadata = {
  title: "AgroGestion",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-10">{children}</main>
        </div>
      </body>
    </html>
  );
}