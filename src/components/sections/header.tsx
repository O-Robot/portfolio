"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Moon, Sun, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import navItems from "@/data/nav.json";

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme") === "dark";
    setIsDark(saved);
    updateTheme(saved);
  }, []);

  const updateTheme = (dark: boolean) => {
    const html = document.documentElement;
    if (dark) html.setAttribute("class", "dark");
    else html.setAttribute("class", "light");
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
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  console.log(pathname, "path");
  return (
    pathname !== "/" && (
      <motion.nav
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
                const isActive = pathname
                  ?.toLowerCase()
                  .includes(item.href.toLowerCase());
                return (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    whileHover={{ scale: 1.09 }}
                    className={`hover:text-link-active hover:font-medium transition-colors ${
                      isActive
                        ? "text-link-active font-medium"
                        : "text-link-inactive "
                    }`}
                  >
                    {item.name}
                  </motion.a>
                );
              })}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="text-link-inactive hover:text-link-active"
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
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden mt-4 glass-morphism rounded-lg p-4"
            >
              {navItems.map((item) => {
                const isActive = pathname
                  ?.toLowerCase()
                  .includes(item.href.toLowerCase());
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`block py-2 hover:text-link-active hover:font-medium  transition-colors ${
                      isActive
                        ? "text-link-active font-medium"
                        : "text-link-inactive "
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </a>
                );
              })}
            </motion.div>
          )}
        </div>
      </motion.nav>
    )
  );
}
