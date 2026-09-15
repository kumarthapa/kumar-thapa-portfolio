import type { Metadata } from "next";
import { Providers } from "@/components/Providers";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import "./globals.css";
export const metadata: Metadata = {
  title: "KUMARTHAPA — Digital services, thoughtfully built",
  description:
    "Design, development, and cloud services for your next ambitious project.",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div id="page-shell">
            <a className="skip-link" href="#main">
              Skip to content
            </a>
            <Header />
            {children}
            <Footer />
          </div>
          <CartDrawer />
        </Providers>
      </body>
    </html>
  );
}
