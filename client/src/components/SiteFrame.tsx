"use client";
import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { useTheme } from "./ThemeProvider";

export function SiteFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { theme } = useTheme();
  if (pathname.startsWith("/showcase/")) return <>{children}</>;
  return (
    <div className="site-frame" data-theme={theme}>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
