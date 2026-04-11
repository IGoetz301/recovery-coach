import type { Metadata } from 'next'
import Link from 'next/link'
import ReadinessForm from '../components/ReadinessForm'

export const metadata: Metadata = {
  title: 'Readiness Score',
  description: 'Calculate your daily readiness score based on HRV, sleep, and stress. Get a personalized training recommendation in seconds.',
}

const signals = [
  {
    icon: '💓',
    label: 'HRV',
    weight: '40 pts',
    color: { border: 'border-cyan-500/20', badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' },
    desc: 'Heart rate variability is the gold standard for nervous system recovery. Higher HRV signals your body is primed to adapt to training stress.',
  },
  {
    icon: '🌙',
    label: 'Sleep',
    weight: '35 pts',
    color: { border: 'border-violet-500/20', badge: 'bg-violet-500/10 text-violet-400 border-violet-500/20' },
    desc: 'Sleep quality and duration directly drive hormonal recovery, muscle repair, and cognitive performance — the big three for training adaptation.',
  },
  {
    icon: '🧠',
    label: 'Stress',
    weight: '25 pts',
    color: { border: 'border-emerald-500/20', badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
    desc: 'Psychological stress competes directly with physical recovery. Elevated cortisol from life stress blunts the same pathways as training recovery.',
  },
]

export default function ReadinessPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-cyan-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-emerald-500/5 rounded-full blur-3xl" />
        </div>
        <div className="max-w-3xl mx-auto text-center relative">
          <p className="text-emerald-400 text-sm font-semibold uppercase tracking-widest mb-4">Readiness Calculator</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
            Know your{' '}
            <span className="gradient-text">readiness score</span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed max-w-xl mx-auto">
            Enter your morning metrics and get an instant 0–100 readiness score with a personalized training recommendation.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="pb-24 px-4">
        <ReadinessForm />
      </section>

      {/* How it's calculated */}
      <section className="py-20 px-4 bg-slate-900/40">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-violet-400 text-sm font-semibold uppercase tracking-widest mb-3">The algorithm</p>
            <h2 className="text-3xl font-bold text-white mb-4">How your score is calculated</h2>
            <p className="text-slate-400 max-w-lg mx-auto">
              Three evidence-based signals used by professional athletes and sports scientists — weighted by their relative impact on recovery.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {signals.map(({ icon, label, weight, color, desc }) => (
              <div key={label} className={`bg-slate-900 border ${color.border} rounded-2xl p-6`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{icon}</span>
                    <span className="text-white font-bold">{label}</span>
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full border ${color.badge}`}>
                    {weight}
                  </span>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          {/* Score zones */}
          <div className="mt-10 bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-white font-bold mb-4">Score zones</h3>
            <div className="space-y-2.5">
              {[
                { range: '80–100', label: 'Excellent', action: 'Train hard', color: 'text-cyan-400', dot: 'bg-cyan-400' },
                { range: '65–79', label: 'Good', action: 'On track', color: 'text-emerald-400', dot: 'bg-emerald-400' },
                { range: '50–64', label: 'Moderate', action: 'Easy day', color: 'text-amber-400', dot: 'bg-amber-400' },
                { range: '35–49', label: 'Low', action: 'Light only', color: 'text-orange-400', dot: 'bg-orange-400' },
                { range: '0–34', label: 'Poor', action: 'Rest day', color: 'text-rose-400', dot: 'bg-rose-400' },
              ].map(({ range, label, action, color, dot }) => (
                <div key={range} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className={`w-2 h-2 rounded-full ${dot}`} />
                    <span className={`text-sm font-semibold ${color}`}>{label}</span>
                    <span className="text-slate-500 text-sm">{range}</span>
                  </div>
                  <span className="text-slate-400 text-sm">{action}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Want automatic daily scores?</h2>
          <p className="text-slate-400 mb-8">
            Connect your wearable and RECOVR calculates your readiness score automatically every morning — no manual entry needed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-semibold hover:opacity-90 transition-opacity"
            >
              Get started free
            </Link>
            <Link
              href="/how-it-works"
              className="px-8 py-4 rounded-xl bg-slate-800 text-white font-semibold border border-slate-700 hover:bg-slate-700 transition-colors"
            >
              See how it works
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
