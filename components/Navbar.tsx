"use client"

import { Button } from "@/components/ui/button"
import React, { useState, useEffect } from "react"
import Link from "next/link"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  const handleHomeClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    window.scrollTo({ top: 0, behavior: "smooth" })
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

          <Link href="/#contact">
            <Button className="bg-cyan-400 text-slate-950 hover:bg-cyan-300 font-semibold">
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}