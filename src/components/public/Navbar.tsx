"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"
import MobileMenu from "./MobileMenu"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  const isHome = pathname === "/"

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { name: "Products", href: "/products" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <>
      <nav
        className={`fixed left-0 right-0 z-[60] transition-all duration-500 flex items-center ${
          scrolled || !isHome
            ? "h-16 bg-brand-black/95 backdrop-blur-md border-b border-brand-border translate-y-0 shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
            : "h-20 bg-transparent border-transparent translate-y-0"
        }`}
        style={{ top: isHome ? (scrolled ? 0 : 32) : 0 }}
      >
        <div className="wide w-full flex justify-between items-center px-6 md:px-12">
          <Link href="/" className="font-bebas text-[24px] md:text-[28px] text-brand-white relative z-50 tracking-tight hover:text-brand-accent transition-colors">
            HIGH<span className="text-brand-accent">GRAND</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 relative z-50">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="font-inter font-medium text-[12px] uppercase tracking-[0.1em] text-brand-white hover:text-brand-accent transition-colors duration-150"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Right */}
          <div className="hidden md:flex items-center gap-4 relative z-50">
            <Link
              href="/register"
              className="py-2 px-4 border border-brand-white text-brand-white text-[11px] uppercase tracking-[0.12em] font-medium hover:bg-brand-white hover:text-brand-black transition-colors"
            >
              Become a Reseller
            </Link>
            <div className="w-[1px] h-4 bg-brand-border"></div>
            <Link
              href="/login"
              className="font-inter font-medium text-[12px] uppercase tracking-[0.1em] text-brand-white hover:text-brand-accent transition-colors"
            >
              Login
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-brand-white p-2 relative z-50"
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      <MobileMenu 
        isOpen={menuOpen} 
        onClose={() => setMenuOpen(false)} 
        links={navLinks} 
      />
    </>
  )
}
