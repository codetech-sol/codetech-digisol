"use client"

import Link from "next/link"

const projects = [
  {
    title: "Corporate Server Rack Cleanup",
    description:
      "A legacy server room with years of unmanaged cabling was transformed into a structured, labeled, and airflow-optimized rack.",
    beforeImage: "/images/projects/networkhubbefore.jpeg",
    afterImage: "/images/projects/networkhubafter.jpeg",
    beforeLabel: "BEFORE",
    afterLabel: "AFTER",
  },
  {
    title: "Cable Management",
    description:
      "Improved individual workstations from tangled, unsafe wiring to clean, ergonomic, and easy-to-maintain desk setups.",
    beforeImage: "/images/projects/cablingbefore.jpeg",
    afterImage: "/images/projects/cablingafter.jpeg",
    beforeLabel: "BEFORE",
    afterLabel: "AFTER",
  },
  {
    title: "Computer Hardware Maintenance",
    description:
      "Maintenance of computer hardware to ensure optimal performance and security.",
    beforeImage: "/images/projects/computer networks.jpeg",
    afterImage: "/images/projects/hardwaremaintenance.jpeg",    
    beforeLabel: "COMPUTER LAB",
    afterLabel: "CPU MAINTENANCE",
  },
  {
    title: "Camera Installation",
    description:
      "Installation of high-definition cameras for surveillance and security.",
    beforeImage: "/images/projects/camerainstall.jpeg",
    afterImage: "/images/projects/camera2.jpeg",    
    beforeLabel: "CAMERA EQUIPMENT",
    afterLabel: "OUTDOOR SURVEILLANCE",
  },
  {
    title: "LAN SETUP, INSTALLATION AND CONFIGURATION",
    description:
      "LAN setup, installation, and configuration for a secure and reliable network.",
    beforeImage: "/images/projects/lansetup.jpeg",
    afterImage: "/images/projects/switche.jpeg",    
    beforeLabel: "LAN EQUIPMENT",
    afterLabel: "LAN CONFIGURATION",
  },

]

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="container mx-auto px-4 py-12 lg:py-16">
        <div className="flex items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Projects</h1>
            <p className="mt-2 text-slate-300 max-w-2xl">
              A visual look at how we transform messy, unreliable infrastructure into clean, secure, and maintainable
              environments.
            </p>
          </div>
          <Link
            href="/"
            className="hidden sm:inline-flex rounded-md bg-corporate-cyan text-corporate-blue px-4 py-2 text-sm font-semibold hover:bg-white transition-colors shadow-[0_0_20px_rgba(0,229,255,0.3)]"
          >
            Back to Home
          </Link>
        </div>

        <div className="grid gap-10 lg:gap-12">
          {projects.map((project, index) => (
            <article
              key={`${project.title}-${index}`}
              className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 lg:p-8 shadow-lg shadow-black/40"
            >
              <header className="mb-4">
                <h2 className="text-2xl font-semibold text-white">{project.title}</h2>
                <p className="mt-2 text-sm md:text-base text-slate-300">{project.description}</p>
              </header>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="flex flex-col gap-3">
                  <span className="inline-flex w-fit items-center rounded-full bg-red-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-red-300 ring-1 ring-red-500/40">
                    
                  </span>
                  <div className="relative overflow-hidden rounded-lg border border-slate-800 bg-slate-950">
                    <img
                      src={project.beforeImage}
                      alt={project.beforeLabel}
                      className="block h-56 w-full object-cover md:h-64 lg:h-72"
                    />
                  </div>
                  <p className="text-xs text-slate-400">{project.beforeLabel}</p>
                </div>

                <div className="flex flex-col gap-3">
                  <span className="inline-flex w-fit items-center rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-300 ring-1 ring-emerald-500/40">
                    
                  </span>
                  <div className="relative overflow-hidden rounded-lg border border-slate-800 bg-slate-950">
                    <img
                      src={project.afterImage}
                      alt={project.afterLabel}
                      className="block h-56 w-full object-cover md:h-64 lg:h-72"
                    />
                  </div>
                  <p className="text-xs text-slate-400">{project.afterLabel}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex justify-center sm:hidden">
          <Link
            href="/"
            className="inline-flex rounded-md bg-corporate-cyan text-corporate-blue px-4 py-2 text-sm font-semibold hover:bg-white transition-colors shadow-[0_0_20px_rgba(0,229,255,0.3)]"
          >
            Back to Home
          </Link>
        </div>

        <div className="mt-16 border-t border-slate-800 pt-8 text-center text-slate-300 max-w-3xl mx-auto text-sm md:text-base">
          <img
            src="/images/logo.png"
            alt="CodeTech Logo"
            className="mx-auto mb-4 h-12 w-12 object-contain"
          />
          <p>
            Every project shown here reflects real-world improvements in reliability, security, and maintainability.
            From cable management and LAN configuration to CCTV installations and hardware maintenance, we design
            infrastructure that stays stable long after installation.
          </p>
        </div>
      </section>
    </main>
  )
}
