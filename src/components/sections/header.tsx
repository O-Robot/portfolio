"use client";
import navItems from "@/data/nav.json";
import { getNavHref, isNavItemActive } from "@/utils/routes";
import { motion } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  // Do not set document.documentElement.style.colorScheme here.
  // The chat widget iframe owns its own theme state through postMessage.
  // Forcing browser color-scheme can create conflicting theme signals.
  const updateTheme = (dark: boolean) => {
    const html = document.documentElement;
    html.classList.remove("light", "dark");
    html.classList.add(dark ? "dark" : "light");
    localStorage.setItem("theme", dark ? "dark" : "light");
  };

  const toggleTheme = () => {
    setIsDark((prev) => {
      updateTheme(!prev);
      return !prev;
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    pathname !== "/three" && (
      <motion.nav
        aria-label="Primary"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 w-full right-0 z-50 transition-all duration-300 ${
          scrolled ? "glass-morphism" : "bg-transparent"
        }`}
      >
        <div className=" mx-auto px-6 md:px-20 lg:px-20 py-4 w-full">
          <div className="flex items-center justify-between">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className={`text-xl font-bold 
            `}
            >
              <Link href={"/"} className={`flex items-baseline`}>
                <span className="text-skill-text"> &lt;</span>
                <span className="logo-name">Ogooluwani Adewale</span>
                <span className="text-skill-text">/&gt;</span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => {
                const href = getNavHref(item.href);
                const isActive = isNavItemActive(item.href, pathname);
                return (
                  <motion.div key={item.name} whileHover={{ scale: 1.09 }}>
                    <Link
                      href={href}
                      className={`hover:text-link-active hover:font-medium transition-colors ${
                        isActive
                          ? "text-link-active font-medium"
                          : "text-link-inactive "
                      }`}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                );
              })}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="text-link-inactive hover:text-link-active"
                aria-label={
                  isDark ? "Switch to light theme" : "Switch to dark theme"
                }
              >
                {isDark ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                className="text-skill-text"
                aria-label={
                  isOpen ? "Close navigation menu" : "Open navigation menu"
                }
                aria-expanded={isOpen}
                aria-controls="mobile-navigation"
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <motion.div
              id="mobile-navigation"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden mt-4 glass-morphism rounded-lg p-4"
            >
              {navItems.map((item) => {
                const href = getNavHref(item.href);
                const isActive = isNavItemActive(item.href, pathname);
                return (
                  <Link
                    key={item.name}
                    href={href}
                    className={`block py-2 hover:text-link-active hover:font-medium  transition-colors ${
                      isActive
                        ? "text-link-active font-medium"
                        : "text-link-inactive "
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </motion.div>
          )}
        </div>
      </motion.nav>
    )
  );
}
