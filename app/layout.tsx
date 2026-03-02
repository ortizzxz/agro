// layout.tsx (Server Component)
import type { Metadata } from "next";
import "./globals.css";
import DashboardWrapper from "./components/DashboardWrapper";

export const metadata: Metadata = {
  title: "AgroGestion",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <DashboardWrapper>{children}</DashboardWrapper>
      </body>
    </html>
  );
}