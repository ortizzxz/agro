// layout.tsx (Server Component)
import type { Metadata } from "next";
import DashboardWrapper from "./components/DashboardWrapper";
import "./assets/styles/globals.css";

export const metadata: Metadata = {
  title: "AgroGestion",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <DashboardWrapper>{children}</DashboardWrapper>
      </body>
    </html>
  );
}