"use client";
import Link from "next/link";
import { BrandLogo } from "./BrandLogo";
import { ShoppingBag, Menu, X, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { ThemeControl, useTheme } from "./ThemeProvider";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setOpen } from "@/store/cartSlice";
export function Header() {
  const { theme } = useTheme();
  const pathname = usePathname();
  const links = [
    ["Home", "/"],
    ["Projects", "/projects"],
    ["Showcase", "/showcase"],
    ["About", "/about"],
  ];
  const showCart = pathname.startsWith("/services") || pathname === "/checkout";
  const [menu, setMenu] = useState(false);
  const dispatch = useAppDispatch();
  const count = useAppSelector((s) =>
    s.cart.items.reduce((n, i) => n + i.quantity, 0),
  );
  return (
    <header className="header">
      <div className="container header-inner">
        <Link href="/" className="header-brand" aria-label="KUMARTHAPA home">
          <span className="desktop-wordmark">
            <BrandLogo theme={theme === "white" ? "light" : "dark"} />
          </span>
          <span className="mobile-brand">
            <BrandLogo compact />
          </span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              aria-current={
                pathname === href ||
                (href !== "/" && pathname.startsWith(href + "/"))
                  ? "page"
                  : undefined
              }
            >
              {label}
            </Link>
          ))}
          <Link href="/contact" className="nav-contact">
            Let’s talk <ArrowUpRight size={15} />
          </Link>
        </nav>
        <div className="header-actions">
          <ThemeControl />
          {showCart && (
            <button
              className="cart-toggle"
              onClick={() => dispatch(setOpen(true))}
              aria-label={`Open cart, ${count} items`}
            >
              <ShoppingBag size={19} />
              <span>Cart</span>
              <span className="badge" aria-live="polite">
                {count}
              </span>
            </button>
          )}
          <button
            className="mobile-toggle icon-button"
            aria-label={menu ? "Close menu" : "Open menu"}
            aria-expanded={menu}
            aria-controls="mobile-menu"
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {menu && (
        <nav
          id="mobile-menu"
          className="mobile-nav"
          aria-label="Mobile navigation"
        >
          {[
            ...links,
            ["Services", "/services"],
            ["Let’s talk", "/contact"],
          ].map(([label, href]) => (
            <Link key={href} href={href} onClick={() => setMenu(false)}>
              {label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
