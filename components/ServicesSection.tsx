"use client";

import { ServiceCard } from "@/components/ServiceCard";
import { Server, ShieldCheck, Headset } from "lucide-react";

export function ServicesSection() {
  const professionalServices = [
    {
      title: "Network Infrastructure",
      description: "Focus on connectivity.",
      icon: Server,
      features: [
        "Network Design & IP Addressing Schemes",
        "Router & Switch Configuration/Troubleshooting",
        "Controller-based Wireless Access Point Deployment",
        "Advanced Network Segmentation (VLANs, VRFs)",
        "Performance Optimization (QoS & Routing Protocols)",
      ],
    },
    {
      title: "Security & Data Protection",
      description: "Focus on security.",
      icon: ShieldCheck,
      features: [
        "Firewall Security Policy Implementation",
        "Endpoint Security Management (Kaspersky & Anti-Virus Updates)",
        "Disaster Recovery & Automated Data Backups",
        "Secure Wired & Wireless Environments",
      ],
    },
    {
      title: "Support & Maintenance",
      description: "Focus on reliability.",
      icon: Headset,
      features: [
        "60-Day Post-Service Warranty",
        "24/7 Support (Software & Hardware)",
        "Microsoft Software Licensing & Activation (Windows/Office)",
        "Strategic IT Consultation & Upgrades",
      ],
    },
  ];

  return (
    <section className="py-24 relative bg-corporate-slate/60" id="professional-services">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="text-corporate-cyan font-bold tracking-[0.2em] uppercase text-sm mb-4">
            Our Professional Services
          </div>
          <h2 className="font-montserrat font-bold text-4xl md:text-5xl mb-6 text-cyan-400">
            Our Professional Services
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Enterprise-grade connectivity, security, and support solutions tailored for modern businesses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {professionalServices.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}
