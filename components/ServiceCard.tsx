import { Card } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"

interface ServiceCardProps {
  title: string
  description: string
  icon: LucideIcon
  features: string[]
}

export function ServiceCard({ title, description, icon: Icon, features }: ServiceCardProps) {
  return (
    <Card className="bg-slate-900 border-slate-800 p-6 hover:bg-slate-800 shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-lg bg-cyan-400/20 flex items-center justify-center flex-shrink-0">
          <Icon className="w-6 h-6 text-cyan-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-white font-semibold mb-2">{title}</h3>
          <p className="text-slate-400 mb-4">{description}</p>
          <ul className="space-y-1">
            {features.map((feature, index) => (
              <li key={index} className="text-slate-300 text-sm flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  )
}