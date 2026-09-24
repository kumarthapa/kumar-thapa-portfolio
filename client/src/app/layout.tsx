import type { Metadata } from "next";
import { Providers } from "@/components/Providers";
import { SiteFrame } from "@/components/SiteFrame";
import { ThemeProvider } from "@/components/ThemeProvider";
import { CartDrawer } from "@/components/CartDrawer";
import "./globals.css";
import "./portfolio.css";
import "./showcase.css";
import "./themes.css";
export const metadata: Metadata = {
  title: "Kumar Thapa — Design, development & business solutions",
  description:
    "Thoughtful websites, useful software, and connected business solutions. Explore software projects and original industry website demos by Kumar Thapa.",
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
          <ThemeProvider>
            <div id="page-shell">
              <a className="skip-link" href="#main">
                Skip to content
              </a>
              <SiteFrame>{children}</SiteFrame>
            </div>
            <CartDrawer />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
