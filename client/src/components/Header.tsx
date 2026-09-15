"use client";
import Link from "next/link";
import { BrandLogo } from "./BrandLogo";
import { ShoppingBag, Menu, X, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setOpen } from "@/store/cartSlice";
export function Header() {
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
            <BrandLogo />
          </span>
          <span className="mobile-brand">
            <BrandLogo compact />
          </span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          <Link href="/#services">Our services</Link>
          <Link href="/#approach">Our approach</Link>
          <Link href="/contact">
            Let’s talk <ArrowUpRight size={15} />
          </Link>
        </nav>
        <div className="header-actions">
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
            ["Services", "/#services"],
            ["Our approach", "/#approach"],
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
