import type { Metadata } from 'next'
import Link from 'next/link'
import ReadinessDemo from '../components/ReadinessDemo'

export const metadata: Metadata = {
  title: 'How It Works',
}

const steps = [
  {
    number: '01',
    title: 'Connect your data sources',
    description:
      'Link your wearable (Garmin, Apple Watch, Whoop, or Oura) and your training log (Strava, Garmin Connect, or manual entry). Setup takes under 5 minutes.',
    detail: 'Supported: Garmin, Apple Health, Whoop, Oura, Strava, TrainingPeaks',
    color: 'cyan',
  },
  {
    number: '02',
    title: 'Do your 30-second morning check-in',
    description:
      'Each morning, RECOVR sends you a quick push notification. Rate your energy, mood, soreness, and stress on a simple 1–5 scale. That\'s it.',
    detail: 'Average check-in time: 28 seconds',
    color: 'violet',
  },
  {
    number: '03',
    title: 'Get your readiness score',
    description:
      'Our AI synthesizes your HRV trend, sleep quality, training load, and check-in data into a single 0–100 readiness score with a clear action.',
    detail: 'Score refreshes daily at 6 AM in your local timezone',
    color: 'emerald',
  },
  {
    number: '04',
    title: 'Follow your adaptive training plan',
    description:
      'Your workout for today adapts to your score. High readiness? Push hard. Low score? The plan automatically scales down to protect your long-term progress.',
    detail: 'Plans update in real-time as your score changes',
    color: 'amber',
  },
  {
    number: '05',
    title: 'Track trends, prevent burnout',
    description:
      'RECOVR watches your weekly patterns. When your recovery trend is declining, you get a proactive warning before symptoms become injury or burnout.',
    detail: 'Burnout alerts fire 5–7 days before typical overtraining onset',
    color: 'rose',
  },
]

const colorMap: Record<string, { dot: string; badge: string; text: string; border: string; bg: string }> = {
  cyan:    { dot: 'bg-cyan-400',    badge: 'bg-cyan-400/10 text-cyan-400 border-cyan-400/20',    text: 'text-cyan-400',    border: 'border-cyan-500/30',    bg: 'bg-cyan-500/5' },
  violet:  { dot: 'bg-violet-400',  badge: 'bg-violet-400/10 text-violet-400 border-violet-400/20',  text: 'text-violet-400',  border: 'border-violet-500/30',  bg: 'bg-violet-500/5' },
  emerald: { dot: 'bg-emerald-400', badge: 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20', text: 'text-emerald-400', border: 'border-emerald-500/30', bg: 'bg-emerald-500/5' },
  amber:   { dot: 'bg-amber-400',   badge: 'bg-amber-400/10 text-amber-400 border-amber-400/20',   text: 'text-amber-400',   border: 'border-amber-500/30',   bg: 'bg-amber-500/5' },
  rose:    { dot: 'bg-rose-400',    badge: 'bg-rose-400/10 text-rose-400 border-rose-400/20',    text: 'text-rose-400',    border: 'border-rose-500/30',    bg: 'bg-rose-500/5' },
}

const comparisons = [
  {
    without: 'Monday: heavy lifts despite 5h sleep and HRV crash',
    with: 'Monday: light mobility session — score 34, rest flagged',
  },
  {
    without: 'Miss recovery window after hard race',
    with: 'Easy week auto-loaded after race, back to PR by week 3',
  },
  {
    without: 'Burnout hits at month 4, forced 6-week break',
    with: 'Warning fired week 2, load cut proactively, zero forced breaks',
  },
  {
    without: 'Guess whether to train through fatigue',
    with: 'Clear daily answer: train hard, easy, or rest',
  },
]

export default function HowItWorksPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/5 rounded-full blur-3xl"/>
        </div>
        <div className="max-w-3xl mx-auto text-center relative">
          <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-4">How it works</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
            From wearable data to{' '}
            <span className="gradient-text">daily clarity</span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            Five steps. Thirty seconds a day. A training partner that actually knows how you feel.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-8 px-4 pb-20">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-6">
            {steps.map(({ number, title, description, detail, color }, i) => {
              const c = colorMap[color]
              return (
                <div key={number} className="relative flex gap-6">
                  {/* Connector line */}
                  {i < steps.length - 1 && (
                    <div className="absolute left-6 top-14 w-px h-full bg-slate-800 -z-10"/>
                  )}

                  {/* Step number */}
                  <div className="shrink-0 w-12 h-12 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center">
                    <span className={`text-sm font-bold font-mono ${c.text}`}>{number}</span>
                  </div>

                  {/* Content */}
                  <div className={`flex-1 rounded-2xl border p-6 ${c.bg} ${c.border}`}>
                    <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-4">{description}</p>
                    <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full border ${c.badge}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`}/>
                      {detail}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Interactive demo */}
      <section className="py-20 px-4 bg-slate-900/40">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-violet-400 text-sm font-semibold uppercase tracking-widest mb-3">Interactive demo</p>
            <h2 className="text-3xl font-bold text-white mb-4">See your readiness dashboard</h2>
            <p className="text-slate-400 max-w-lg mx-auto">
              Toggle between scenarios to see how RECOVR responds to different recovery states.
              This is what you'd see every morning.
            </p>
          </div>
          <ReadinessDemo />
        </div>
      </section>

      {/* Before / After */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-3">The difference</p>
            <h2 className="text-3xl font-bold text-white mb-4">Life without vs. with RECOVR</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Without */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-7">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-rose-500/20 flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2.5">
                    <path d="M18 6L6 18M6 6l12 12"/>
                  </svg>
                </div>
                <h3 className="text-white font-bold">Without RECOVR</h3>
              </div>
              <ul className="space-y-4">
                {comparisons.map(({ without }) => (
                  <li key={without} className="flex items-start gap-3 text-sm text-slate-400">
                    <span className="w-5 h-5 rounded-full bg-rose-500/20 border border-rose-500/30 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400"/>
                    </span>
                    {without}
                  </li>
                ))}
              </ul>
            </div>

            {/* With */}
            <div className="bg-slate-900 border border-cyan-500/30 rounded-2xl p-7 glow-cyan">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="2.5">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                </div>
                <h3 className="text-white font-bold">With RECOVR</h3>
              </div>
              <ul className="space-y-4">
                {comparisons.map(({ with: w }) => (
                  <li key={w} className="flex items-start gap-3 text-sm text-slate-300">
                    <span className="w-5 h-5 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"/>
                    </span>
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-slate-900/40">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to know your readiness?</h2>
          <p className="text-slate-400 mb-8">
            Start free and see your first readiness score within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-semibold hover:opacity-90 transition-opacity"
            >
              Get started free
            </Link>
            <Link
              href="/#pricing"
              className="px-8 py-4 rounded-xl bg-slate-800 text-white font-semibold border border-slate-700 hover:bg-slate-700 transition-colors"
            >
              View pricing
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
