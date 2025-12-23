import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Laptop, Eye, Server, Headset } from "lucide-react"

const services = [
  {
    icon: Laptop,
    title: "Responsive Web Dev",
    description: "Beautiful, sustainable websites optimized for all devices.",
  },
  {
    icon: Eye,
    title: "CCTV & Surveillance",
    description: "HD Cameras, Night Vision, and Mobile App Monitoring.",
  },
  {
    icon: Server,
    title: "Infrastructure",
    description: "Network installation and complete system management.",
  },
  {
    icon: Headset,
    title: "24/7 Support",
    description: "Round-the-clock professional assistance and training.",
  },
]

export function ServicesGrid() {
  return (
    <section id="services" className="py-24 bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Services</h2>
          <p className="text-xl text-slate-400">Comprehensive solutions for modern businesses</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card
              key={index}
              className="bg-slate-900 border-slate-800 hover:border-cyan-400/50 transition-all duration-300 group cursor-pointer"
            >
              <CardHeader>
                <div className="w-14 h-14 rounded-lg bg-slate-800 flex items-center justify-center mb-4 group-hover:bg-cyan-400/20 transition-colors">
                  <service.icon className="w-7 h-7 text-cyan-400" />
                </div>
                <CardTitle className="text-white text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-400 text-base">{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
