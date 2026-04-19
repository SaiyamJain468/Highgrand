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

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [menuOpen])

  const mobileMenuVariants = {
    hidden: { opacity: 0, y: "-100%" },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: "-100%", transition: { duration: 0.4 } }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40, rotateX: 20 },
    visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.6 } }
  }

  return (
    <>
      <nav
        className={`fixed left-0 right-0 z-40 transition-all duration-300 h-16 flex items-center ${
          scrolled || !isHome
            ? "bg-brand-black/95 backdrop-blur-md border-b border-brand-border"
            : "bg-transparent border-transparent"
        }`}
        style={{ top: scrolled ? 0 : 32 }}
      >
        <div className="wide w-full flex justify-between items-center">
          <Link href="/" className="font-bebas text-[26px] text-brand-white relative z-50">
            HIGHGRAND
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
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Cinematic Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-40 bg-[#070707] flex flex-col pt-32 px-8 pb-12 overflow-y-auto w-full h-[100dvh]"
          >
            {/* Background Texture Element */}
            <div className="absolute top-0 right-0 w-[80vw] h-[80vw] bg-brand-border/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-6 w-full"
            >
              <div className="flex flex-col gap-8 w-full mt-8">
                {navLinks.map((link, i) => (
                  <motion.div key={link.name} variants={itemVariants} className="overflow-hidden w-full">
                    <Link
                      href={link.href}
                      className="font-bebas text-[14vw] sm:text-[64px] text-brand-white leading-[0.85] uppercase tracking-tight block hover:text-brand-accent transition-colors"
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <motion.div variants={itemVariants} className="w-full h-[1px] bg-brand-accentSurface my-6"></motion.div>

              <motion.div variants={itemVariants} className="flex flex-col gap-6 w-full">
                <div>
                  <p className="font-inter text-[11px] font-semibold text-brand-muted uppercase tracking-widest mb-3">Reseller Portal</p>
                  <Link
                    href="/login"
                    className="font-bebas text-[32px] text-brand-white hover:text-brand-accent transition-colors inline-block"
                    onClick={() => setMenuOpen(false)}
                  >
                    LOGIN TO ACCOUNT
                  </Link>
                </div>
                
                <div>
                  <p className="font-inter text-[11px] font-semibold text-brand-muted uppercase tracking-widest mb-3">New Partner</p>
                  <Link
                    href="/register"
                    className="py-4 px-8 bg-brand-white text-brand-black text-[13px] uppercase tracking-[0.15em] font-bold block text-center shadow-[0_0_40px_rgba(255,255,255,0.1)] active:scale-[0.98] transition-all"
                    onClick={() => setMenuOpen(false)}
                  >
                    Become a Reseller
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
