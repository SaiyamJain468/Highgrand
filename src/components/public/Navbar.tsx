"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"

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

  const mobileMenuVariants = {
    hidden: { opacity: 0, y: "-100%" },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
    exit: { opacity: 0, y: "-100%", transition: { duration: 0.25 } }
  }

  return (
    <>
      <nav
        className={`fixed top-8 left-0 right-0 z-40 transition-all duration-300 h-16 flex items-center ${
          scrolled || !isHome
            ? "bg-brand-black/95 backdrop-blur-md border-b border-brand-border"
            : "bg-transparent border-transparent"
        }`} // top-8 accommodates the announcement bar height (rough estimate 32px) which we should probably position better, actually let's stick navbar to top if announcement bar unfixes. Wait, AnnouncementBar is fixed? No it's relative. So navbar should be sticky or fixed below it. Let's make navbar fixed at top-0 and announcement bar inside flow? Better: layout handles this. Assuming layout has them both. Let's just fix it top-0 for mobile overlay to work cleanly, but we'll adjust the padding.
        style={{ top: scrolled ? 0 : 32 }} // Quick hack: 32px is the height of announcement bar. On scroll it could stick to 0. 
      >
        <div className="wide w-full flex justify-between items-center">
          <Link href="/" className="font-bebas text-[26px] text-brand-white">
            HIGHGRAND
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
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
          <div className="hidden md:flex items-center gap-4">
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
            className="md:hidden text-brand-white p-2"
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 bg-brand-black flex flex-col justify-center items-center"
          >
            <button
              className="absolute top-6 right-6 text-brand-white p-2"
              onClick={() => setMenuOpen(false)}
            >
              <X size={32} />
            </button>
            <div className="flex flex-col items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="font-bebas text-[32px] text-brand-white"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="w-12 h-[1px] bg-brand-border my-4"></div>
              <Link
                href="/login"
                className="font-inter text-sm uppercase tracking-widest text-brand-accent mb-4"
                onClick={() => setMenuOpen(false)}
              >
                Login to Account
              </Link>
              <Link
                href="/register"
                className="py-3 px-8 bg-brand-white text-brand-black text-[13px] uppercase tracking-widest font-medium"
                onClick={() => setMenuOpen(false)}
              >
                Become a Reseller
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
