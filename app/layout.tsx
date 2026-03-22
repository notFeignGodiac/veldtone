import type { Metadata } from "next";
import "./globals.css";
import ClientShell from "@/components/ui/ClientShell";

export const metadata: Metadata = {
  title: "VELDTONE — African Atmospheric Field Recordings",
  description: "Premium field recordings from Southern Africa's most extraordinary landscapes.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
