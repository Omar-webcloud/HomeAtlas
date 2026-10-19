"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] sm:w-[90%] max-w-3xl transition-all duration-300 ${isMenuOpen
          ? "bg-background text-foreground rounded-2xl shadow-2xl border border-border"
          : isScrolled
            ? "bg-background/85 backdrop-blur-md rounded-full shadow-lg border border-border/50"
            : "bg-transparent"
        }`}
    >
      <div className="flex items-center justify-between transition-all duration-300 px-3 pl-5 py-2.5 sm:px-2 sm:pl-5 sm:py-2">
        {/* Logo */}
        <Link
          href="#"
          className={`text-lg font-medium tracking-tight transition-colors duration-300 ${isMenuOpen || isScrolled ? "text-foreground" : "text-white"
            }`}
        >
          HOMEATLAS
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-10 md:flex">
          <Link
            href="#products"
            className={`text-sm transition-colors ${isScrolled ? "text-muted-foreground hover:text-foreground" : "text-white/70 hover:text-white"}`}
          >
            Residences
          </Link>
          <Link
            href="#technology"
            className={`text-sm transition-colors ${isScrolled ? "text-muted-foreground hover:text-foreground" : "text-white/70 hover:text-white"}`}
          >
            Architecture
          </Link>
          <Link
            href="#gallery"
            className={`text-sm transition-colors ${isScrolled ? "text-muted-foreground hover:text-foreground" : "text-white/70 hover:text-white"}`}
          >
            Gallery
          </Link>
          <Link
            href="#accessories"
            className={`text-sm transition-colors ${isScrolled ? "text-muted-foreground hover:text-foreground" : "text-white/70 hover:text-white"}`}
          >
            Portfolio
          </Link>
        </nav>

        {/* CTA */}
        <div className="hidden items-center gap-6 md:flex">
          <Link
            href="#reserve"
            className={`px-4 py-2 text-sm font-medium transition-all rounded-full ${isScrolled ? "bg-foreground text-background hover:opacity-80" : "bg-white text-foreground hover:bg-white/90"}`}
          >
            Schedule Viewing
          </Link>
        </div>

        {/* Mobile Menu Button with 44px minimum touch target & 2-bar toggle */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`flex h-11 w-11 items-center justify-center rounded-full transition-colors md:hidden ${
            isMenuOpen || isScrolled ? "text-foreground hover:bg-muted" : "text-white hover:bg-white/10"
          }`}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          <div className="relative flex flex-col items-center justify-center w-5 h-5 gap-1.5" aria-hidden="true">
            <span
              className={`block h-[1.75px] w-5 rounded-full transition-all duration-300 origin-center ${
                isMenuOpen
                  ? "translate-y-[3.875px] rotate-45"
                  : ""
              } ${isMenuOpen || isScrolled ? "bg-foreground" : "bg-white"}`}
            />
            <span
              className={`block h-[1.75px] w-5 rounded-full transition-all duration-300 origin-center ${
                isMenuOpen
                  ? "-translate-y-[3.875px] -rotate-45"
                  : ""
              } ${isMenuOpen || isScrolled ? "bg-foreground" : "bg-white"}`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-border bg-background px-6 py-8 md:hidden rounded-b-2xl">
          <nav className="flex flex-col gap-6">
            <Link
              href="#products"
              className="text-lg text-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              Residences
            </Link>
            <Link
              href="#technology"
              className="text-lg text-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              Architecture
            </Link>
            <Link
              href="#gallery"
              className="text-lg text-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              Gallery
            </Link>
            <Link
              href="#accessories"
              className="text-lg text-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              Portfolio
            </Link>
            <Link
              href="#reserve"
              className="mt-4 bg-foreground px-5 py-3 text-center text-sm font-medium text-background rounded-full"
              onClick={() => setIsMenuOpen(false)}
            >
              Schedule Viewing
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
