import { Lock } from "lucide-react"

export function FeatureSection() {
  return (
    <section id="security" className="py-24 bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-cyan-400/20 border-2 border-cyan-400 mb-4">
            <Lock className="w-10 h-10 text-cyan-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white text-balance">Safety is Not an Afterthought.</h2>
          <p className="text-lg md:text-xl text-slate-300 leading-relaxed text-pretty">
            We don't just install systems; we fortify them. Our solutions come with built-in data protection and
            industry-standard configuration.
          </p>
        </div>
      </div>
    </section>
  )
}
