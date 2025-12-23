import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section id="home" className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background with network mesh effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgb(6 182 212) 1px, transparent 0)`,
              backgroundSize: "50px 50px",
            }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold text-white text-balance">
            Securing Your Digital & Physical World.
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 text-pretty">
            From responsive web development to high-definition CCTV systems—we build and protect your infrastructure.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="bg-cyan-400 text-slate-950 hover:bg-cyan-300 font-semibold text-lg px-8">
              Get Started
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="text-white border-2 border-slate-700 hover:bg-slate-800 hover:text-cyan-400 text-lg px-8"
            >
              View Projects
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />
    </section>
  )
}
