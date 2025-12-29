"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { ServiceCard } from "@/components/ServiceCard";
import { ServicesSection } from "@/components/ServicesSection";

import {
  Shield, Lock, CheckCircle, Globe, Camera, Cpu, Headphones,
  ArrowRight, Phone, Mail, MapPin, Send
} from "lucide-react";

export default function Home() {
  const services = [
    {
      title: "Web & Software",
      description: "Responsive, Fast, and Secure. We build high-performance applications.",
      icon: Globe,
      features: ["Cross-Device Compatibility", "Secure Code Audits", "Performance Optimization"]
    },
    {
      title: "CCTV & Security",
      description: "Exclusive CCTV promotions featuring high-definition surveillance with remote mobile app access.",
      icon: Camera,
      features: ["Night Vision Tech", "Motion Detection", "Cloud Storage Options"]
    },
    {
      title: "IT Infrastructure",
      description: "Robust network installation and systems management focusing on maximum uptime and system integrity.",
      icon: Cpu,
      features: [
        "Network configuration",
        "Hardware maintenance",
        "System backups",
        "Network design and IP addressing schemes",
        "Configuration and troubleshooting of routers and switches",
        "Deployment and management of controller-based wireless access points",
        "Implementation of firewall security policies",
        "VLANs, VRFs, routing protocols, QoS",
        "Secure network segmentation for scalable wired and wireless environments"
      ]
    },
    {
      title: "Support & Training",
      description: "24/7 Professional support to ensure your digital and physical infrastructure never stops working.",
      icon: Headphones,
      features: ["Remote Assistance", "Staff Training", "On-site Maintenance"]
    }
  ];

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState(""); // Bot trap
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("idle");
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: fullName,
          email,
          service,
          message,
          honeypot,
        }),
      });

      if (!response.ok) {
        let errorText = "Failed to send message. Please try again.";

        try {
          const data = await response.json();
          if (data && typeof data.error === "string") {
            errorText = data.error;
          }
        } catch {
          // ignore JSON parsing error and use default message
        }

        setStatus("error");
        setErrorMessage(errorText);
        return;
      }

      setStatus("success");
      setFullName("");
      setEmail("");
      setService("");
      setMessage("");
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden cyber-grid pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-corporate-dark/50 via-corporate-dark to-corporate-dark" />

        {/* Animated Background Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-corporate-cyan/10 rounded-full blur-[120px] animate-pulse" />

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* --- STATIC GLOWING BADGE START --- */}
            {/* Removed animate-ping. Enhanced shadow and border for static glow. */}
            <div className="inline-flex items-center gap-2 bg-corporate-blue/80 border border-cyan-400 px-6 py-2.5 rounded-full text-cyan-400 text-lg font-bold backdrop-blur-md shadow-[0_0_25px_rgba(34,211,238,0.6)] mb-8">
              <span>CODETECH DIGITAL SOLUTIONS</span>
            </div>
            {/* --- STATIC GLOWING BADGE END --- */}

            <h1 className="font-montserrat font-extrabold text-5xl md:text-7xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-corporate-cyan to-white tracking-tight leading-tight">
              Securing Your Digital <br />& Physical World
            </h1>

            <p className="text-xl md:text-2xl text-slate-400 mb-10 max-w-3xl mx-auto leading-relaxed">
              From responsive web development to high-definition CCTV systems—we build and protect your infrastructure with surgical precision.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
              <Link
                href="/#contact"
                className="bg-corporate-cyan text-corporate-blue px-8 py-4 rounded-xl font-bold text-lg hover:bg-white transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(0,229,255,0.4)] flex items-center gap-2"
              >
                Secure Your Consultation Now
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="#services"
                className="border border-white/20 hover:border-corporate-cyan/50 px-8 py-4 rounded-xl font-bold text-lg transition-all backdrop-blur-sm text-white"
              >
                View Our Services
              </a>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
              <div className="flex items-center gap-3">
                <Lock className="w-6 h-6 text-corporate-cyan" />
                <span className="font-bold text-sm uppercase tracking-widest text-white">SSL Secured</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-corporate-cyan" />
                <span className="font-bold text-sm uppercase tracking-widest text-white">24/7 Monitoring</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-corporate-cyan" />
                <span className="font-bold text-sm uppercase tracking-widest text-white">Experienced Experts</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-24 relative overflow-hidden bg-corporate-dark text-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div
              className="lg:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-corporate-cyan font-bold tracking-[0.2em] uppercase text-sm mb-4">The Security Promise</div>
              <h2 className="font-montserrat font-bold text-4xl md:text-5xl mb-8 text-cyan-400">
                Safety Is Not <br />An Afterthought
              </h2>
              <div className="space-y-6 text-slate-400 text-lg leading-relaxed">
                <p>
                  At <span className="text-white font-semibold">CodeTech Digital Solutions</span>, we create easy-to-use, beautiful, and sustainable digital solutions with a security-first approach.
                </p>
                <p>
                  Our mission is to bridge the gap between high-level IT maintenance and physical security hardware. Whether it's "Computer Systems Management" or "Networking Consultation," our technical rigor ensures your data and premises remain secured.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-8 mt-12">
                <div className="border-l-2 border-corporate-cyan pl-6">
                  <div className="text-3xl font-bold text-white mb-1">100%</div>
                  <div className="text-sm text-slate-500 uppercase tracking-wider">Secure Delivery</div>
                </div>
                <div className="border-l-2 border-corporate-cyan pl-6">
                  <div className="text-3xl font-bold text-white mb-1">24/7</div>
                  <div className="text-sm text-slate-500 uppercase tracking-wider">Expert Support</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="lg:w-1/2 relative"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="aspect-square glass-morphism rounded-3xl p-8 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-corporate-cyan/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center justify-center h-full">
                  <div className="relative">
                    <Shield className="w-48 h-48 text-corporate-cyan/20 absolute -top-12 -left-12 rotate-12" />
                    <Cpu className="w-64 h-64 text-corporate-cyan animate-pulse" />
                    <Lock className="w-24 h-24 text-white absolute bottom-0 right-0" />
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 border border-corporate-cyan/30 rounded-full" />
              <div className="absolute -bottom-8 -left-8 w-40 h-40 border border-corporate-cyan/10 rounded-full" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 relative bg-corporate-dark">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-corporate-cyan font-bold tracking-[0.2em] uppercase text-sm mb-4">Our Expertise</div>
            <h2 className="font-montserrat font-bold text-4xl md:text-5xl mb-6 text-cyan-400">Innovative Services. Securely Delivered.</h2>
            <div className="w-24 h-1 bg-corporate-cyan mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, idx) => (
              <ServiceCard key={idx} {...service} />
            ))}
          </div>
        </div>
      </section>

      <ServicesSection />

      {/* Security Guarantee Section */}
      <section id="guarantee" className="py-24 relative overflow-hidden bg-corporate-slate">
        <div className="container mx-auto px-6">
          <div className="glass-morphism rounded-[3rem] p-12 md:p-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-corporate-cyan/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <div className="flex flex-col lg:flex-row items-center gap-12 relative z-10">
              <div className="lg:w-2/3">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-corporate-cyan rounded-full flex items-center justify-center">
                    <Shield className="w-6 h-6 text-corporate-blue" />
                  </div>
                  <h3 className="text-corporate-cyan font-bold uppercase tracking-widest text-sm">The CodeTech Standard</h3>
                </div>
                <h2 className="font-montserrat font-bold text-4xl md:text-5xl mb-8 text-cyan-400">The CodeTech</h2>
                <p className="text-xl text-slate-300 leading-relaxed max-w-2xl">
                  "We don't just deliver quality; we embody it. Our web solutions come with built-in data protection, and our hardware installations are configured to quality standards."
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                  {[
                    "Timely Service Delivery",
                    "Regular System Audits",
                    "Redundant System Backups",
                    "Consistent Up-time"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-white">
                      <CheckCircle className="w-5 h-5 text-corporate-cyan" />
                      <span className="font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:w-1/3 flex justify-center">
                <motion.div
                  className="relative"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <div className="w-64 h-64 border-2 border-dashed border-corporate-cyan/30 rounded-full flex items-center justify-center">
                    <div className="w-48 h-48 border border-corporate-cyan/50 rounded-full flex items-center justify-center">
                      <img src="/images/logo.png" alt="CodeTech Logo" className="w-24 h-24" />
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-24 relative bg-corporate-dark text-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <div className="text-corporate-cyan font-bold tracking-[0.2em] uppercase text-sm mb-4">Case Studies</div>
              <h2 className="font-montserrat font-bold text-4xl md:text-5xl text-cyan-400">Secure Project Showcase</h2>
            </div>
            <Link
              href="/projects"
              className="text-corporate-cyan font-bold flex items-center gap-2 hover:translate-x-2 transition-transform"
            >
              Explore All Projects <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Enterprise Network Setup",
                category: "Infrastructure",
                image: "/images/projects/lansetup.jpeg",
                stats: "99.9% Uptime"
              },
              {
                title: "Commercial CCTV Installation",
                category: "Physical Security",
                image: "/images/projects/camerainstall.jpeg",
                stats: "4K HD Coverage"
              },
              {
                title: "Website Development & Design",
                category: "Web Development",
                image: "/images/webdev.jpeg",
                stats: "Fraud Prevention"
              }
            ].map((project, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="group relative overflow-hidden rounded-2xl aspect-[4/5] bg-corporate-slate"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700 opacity-50"
                  style={{ backgroundImage: `url(${project.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-corporate-dark via-corporate-dark/20 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                  <div className="text-corporate-cyan text-xs font-bold uppercase tracking-widest mb-2">{project.category}</div>
                  <h3 className="text-2xl font-bold mb-4 text-cyan-400">{project.title}</h3>
                  <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-sm font-medium text-slate-400">{project.stats}</span>
                    <div className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center group-hover:bg-corporate-cyan group-hover:text-corporate-blue transition-all">
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features & CTA Section */}
      <section className="py-24 relative overflow-hidden bg-corporate-dark text-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
            {[
              { icon: Lock, title: "Data Privacy First", desc: "Clientele-Privacy is highly valuable" },
              { icon: Camera, title: "Night Vision", desc: "Crystal clear 24/7 vision" },
              { icon: CheckCircle, title: "24h Support", desc: "Always here when needed" },
              { icon: Globe, title: "Remote Access", desc: "Monitor from anywhere" }
            ].map((feature, i) => (
              <div key={i} className="text-center group">
                <div className="w-16 h-16 bg-corporate-slate rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-corporate-cyan transition-all border border-white/5">
                  <feature.icon className="w-8 h-8 text-corporate-cyan group-hover:text-corporate-blue transition-colors" />
                </div>
                <h4 className="font-bold mb-2 text-cyan-400">{feature.title}</h4>
                <p className="text-sm text-slate-500">{feature.desc}</p>
              </div>
            ))}
          </div>

          <div className="glass-morphism rounded-3xl p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-corporate-cyan/5 -z-10" />
            <h2 className="font-montserrat font-bold text-3xl md:text-5xl mb-8 text-cyan-400">Partner with a Team That<br />Prioritizes Your Safety</h2>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 relative bg-corporate-dark text-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="lg:w-1/2">
              <div className="text-corporate-cyan font-bold tracking-[0.2em] uppercase text-sm mb-4">Get In Touch</div>
              <h2 className="font-montserrat font-bold text-4xl md:text-5xl mb-8 text-cyan-400">Secure Communication Channel</h2>
              <p className="text-slate-400 text-lg mb-12 leading-relaxed">
                Have a project? Reach out through our channel. Our experts are standing by to deliver your interests.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 glass-morphism rounded-xl flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-corporate-cyan" />
                  </div>
                  <div>
                    <div className="font-bold mb-1 text-cyan-400">Direct Lines</div>
                    <div className="text-slate-400">+260 977 339452</div>
                    <div className="text-slate-400">+260 772 302337</div>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 glass-morphism rounded-xl flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-corporate-cyan" />
                  </div>
                  <div>
                    <div className="font-bold mb-1 text-cyan-400">Secure Email</div>
                    <div className="text-slate-400">codetechdigitalsolutions@gmail.com</div>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 glass-morphism rounded-xl flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-corporate-cyan" />
                  </div>
                  <div>
                    <div className="font-bold mb-1 text-cyan-400">HQ Location</div>
                    <div className="text-slate-400">Lusaka, Zambia</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2">
              <div className="glass-morphism p-8 md:p-12 rounded-3xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4">
                  <div className="flex items-center gap-2 text-[10px] font-mono text-corporate-cyan/50 tracking-tighter">
                    <Lock className="w-3 h-3" />
                    Reach Out...
                  </div>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Full Name</label>
                      <input
                        type="text"
                        className="w-full bg-corporate-blue/20 border border-white/20 rounded-xl px-4 py-3 focus:border-corporate-cyan outline-none transition-colors text-white placeholder:text-slate-500"
                        placeholder="Your full name"
                        value={fullName}
                        onChange={(event) => setFullName(event.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Email Address</label>
                      <input
                        type="email"
                        className="w-full bg-corporate-blue/20 border border-white/20 rounded-xl px-4 py-3 focus:border-corporate-cyan outline-none transition-colors text-white placeholder:text-slate-500"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Service Required</label>
                    <select
                      className="w-full bg-corporate-blue/20 border border-white/20 rounded-xl px-4 py-3 focus:border-corporate-cyan outline-none transition-colors appearance-none text-white"
                      value={service}
                      onChange={(event) => setService(event.target.value)}
                    >
                      <option className="bg-corporate-dark text-white" value="">
                        Select a service
                      </option>
                      <option className="bg-corporate-dark text-white" value="Web Development">
                        Web Development
                      </option>
                      <option className="bg-corporate-dark text-white" value="CCTV Installation">
                        CCTV Installation
                      </option>
                      <option className="bg-corporate-dark text-white" value="IT Management">
                        IT Management
                      </option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Message</label>
                    <textarea
                      rows={4}
                      className="w-full bg-corporate-blue/20 border border-white/20 rounded-xl px-4 py-3 focus:border-corporate-cyan outline-none transition-colors text-white placeholder:text-slate-500"
                      placeholder="How can we help birth your ideas for you?"
                      value={message}
                      onChange={(event) => setMessage(event.target.value)}
                      required
                    ></textarea>
                  </div>
                  {/* Honeypot field - hidden from real users */}
                  <input
                    type="text"
                    name="honeypot"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    style={{ display: 'none' }}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                  />
                  <button
                    type="submit"
                    className="w-full bg-corporate-cyan text-corporate-blue font-bold py-4 rounded-xl hover:bg-white transition-all shadow-[0_0_30px_rgba(0,229,255,0.2)] flex items-center justify-center gap-2"
                    disabled={isSubmitting}
                  >
                    <Send className="w-5 h-5" />
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                  {status === "success" && (
                    <p className="text-sm text-emerald-400 text-center">
                      Message sent successfully. We will get back to you shortly.
                    </p>
                  )}
                  {status === "error" && errorMessage && (
                    <p className="text-sm text-red-400 text-center">
                      {errorMessage}
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 bg-corporate-dark">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="bg-corporate-cyan p-1.5 rounded-lg">
                <img src="/images/logo.svg" alt="CodeTech Logo" className="w-5 h-5" />
              </div>
              <span className="font-montserrat font-bold text-lg tracking-tight">
                <span className="text-white">CODETECH</span><span className="text-corporate-cyan">SOLUTIONS</span>
              </span>
            </div>

            {/*<div className="flex gap-8">
              <Facebook className="w-5 h-5 text-slate-500 hover:text-corporate-cyan cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 text-slate-500 hover:text-corporate-cyan cursor-pointer transition-colors" />
              <Linkedin className="w-5 h-5 text-slate-500 hover:text-corporate-cyan cursor-pointer transition-colors" />
            </div>
            */}

            <div className="text-slate-500 text-sm">
              © 2025 CodeTech Digital Solutions. All Rights Reserved.
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}