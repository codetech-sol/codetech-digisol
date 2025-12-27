"use client"

import { Button } from "@/components/ui/button"
import React, { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleHomeClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    window.scrollTo({ top: 0, behavior: "smooth" })
    setIsMobileMenuOpen(false)
  }

  const handleCloseMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-corporate-blue/95 backdrop-blur-lg border-b border-slate-800" : "bg-corporate-blue"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/images/logo.svg" alt="CodeTech Logo" className="w-8 h-8" />
            <span className="text-2xl font-bold text-white">CodeTech</span>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#home"
              onClick={handleHomeClick}
              className="text-slate-300 hover:text-cyan-400 transition-colors"
            >
              Home
            </a>
            <a href="#services" className="text-slate-300 hover:text-cyan-400 transition-colors">
              Services
            </a>
            <a href="/projects" className="text-slate-300 hover:text-cyan-400 transition-colors">
              Projects
            </a>
            <a href="#about" className="text-slate-300 hover:text-cyan-400 transition-colors">
              About
            </a>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Link href="/#contact">
              <Button className="bg-cyan-400 text-slate-950 hover:bg-cyan-300 font-semibold">
                Contact Us
              </Button>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded-md border border-white/10 px-3 py-2 text-slate-100 hover:bg-white/10 transition-colors"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 rounded-xl border border-slate-800 bg-corporate-dark/95 backdrop-blur-lg px-4 py-6 shadow-lg">
            <nav className="flex flex-col gap-4 text-slate-100">
              <a
                href="#home"
                onClick={handleHomeClick}
                className="py-1 text-base hover:text-cyan-400 transition-colors"
              >
                Home
              </a>
              <a
                href="#services"
                onClick={handleCloseMobileMenu}
                className="py-1 text-base hover:text-cyan-400 transition-colors"
              >
                Services
              </a>
              <a
                href="/projects"
                onClick={handleCloseMobileMenu}
                className="py-1 text-base hover:text-cyan-400 transition-colors"
              >
                Projects
              </a>
              <a
                href="#about"
                onClick={handleCloseMobileMenu}
                className="py-1 text-base hover:text-cyan-400 transition-colors"
              >
                About
              </a>
              <Link
                href="/#contact"
                onClick={handleCloseMobileMenu}
                className="mt-2 inline-flex items-center justify-center rounded-md bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-300 transition-colors"
              >
                Contact Us
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}