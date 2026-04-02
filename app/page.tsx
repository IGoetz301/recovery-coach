import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import EmailForm from './components/EmailForm'

export const metadata: Metadata = {
  title: 'RECOVR — AI Recovery & Readiness Coach',
}

const features = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 6v6l4 2"/>
      </svg>
    ),
    title: 'Daily Readiness Score',
    description:
      'A single 0–100 score synthesized each morning from your sleep quality, HRV, resting heart rate, and self-reported mood.',
    accent: 'cyan',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
    title: 'Adaptive Training Plans',
    description:
      'Workouts that automatically scale up or down based on your readiness — so you never waste a high-energy day on junk volume.',
    accent: 'violet',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
        <line x1="12" y1="9" x2="12" y2="13"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    ),
    title: 'Burnout Flagging',
    description:
      'Pattern detection that spots overtraining before it becomes injury. Get a 7-day warning when your metrics are trending dangerous.',
    accent: 'amber',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <path d="M3 9h18M9 21V9"/>
      </svg>
    ),
    title: 'Weekly Performance Report',
    description:
      'A beautifully formatted summary of your week: load vs. recovery balance, trend highlights, and next-week recommendations.',
    accent: 'emerald',
  },
]

const accentMap: Record<string, { bg: string; border: string; icon: string }> = {
  cyan:    { bg: 'bg-cyan-500/10',    border: 'border-cyan-500/20',    icon: 'text-cyan-400' },
  violet:  { bg: 'bg-violet-500/10',  border: 'border-violet-500/20',  icon: 'text-violet-400' },
  amber:   { bg: 'bg-amber-500/10',   border: 'border-amber-500/20',   icon: 'text-amber-400' },
  emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', icon: 'text-emerald-400' },
}

const inputs = [
  {
    step: '01',
    title: 'Wearable Data',
    description: 'Sync from Garmin, Apple Watch, Whoop, or Oura. We pull HRV, sleep stages, resting HR, and SpO₂.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="5" y="2" width="14" height="20" rx="2"/>
        <path d="M12 18h.01M8 6h8"/>
      </svg>
    ),
  },
  {
    step: '02',
    title: 'Training Log',
    description: 'Connect your Strava, Garmin, or log manually. We factor in load, intensity, and workout type.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M18 20V10M12 20V4M6 20v-6"/>
      </svg>
    ),
  },
  {
    step: '03',
    title: 'Daily Check-In',
    description: 'A 30-second morning survey. Rate your mood, energy, soreness, and stress. Takes less time than your alarm.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 11l3 3L22 4"/>
        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
      </svg>
    ),
  },
]

const tiers = [
  {
    name: 'Free',
    price: '$0',
    period: '',
    description: 'Get started with the basics. No credit card needed.',
    features: [
      'Daily readiness score',
      'Manual check-in',
      'Basic weekly summary',
      '7-day history',
    ],
    cta: 'Start Free',
    href: '/contact',
    highlight: false,
  },
  {
    name: 'Basic',
    price: '$9.99',
    period: '/mo',
    description: 'Everything you need to train smarter, consistently.',
    features: [
      'Everything in Free',
      'Wearable sync (1 device)',
      'Adaptive training suggestions',
      '90-day history & trends',
      'Burnout early warning',
    ],
    cta: 'Start Basic',
    href: '/contact',
    highlight: false,
  },
  {
    name: 'Pro',
    price: '$19.99',
    period: '/mo',
    description: 'For serious athletes who demand peak performance.',
    features: [
      'Everything in Basic',
      'Unlimited device sync',
      'Full adaptive training plan',
      'Weekly AI coach report',
      'Priority support',
      'Unlimited history',
    ],
    cta: 'Go Pro',
    href: '/contact',
    highlight: true,
  },
]

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-4 py-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl"/>
          <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-violet-500/5 rounded-full blur-3xl"/>
        </div>

        <div className="relative max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-cyan-500/10 text-cyan-400 rounded-full px-4 py-1.5 text-sm font-medium mb-7 border border-cyan-500/20">
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"/>
              Now in early access — join 2,400+ athletes
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
              Train Smarter.{' '}
              <br className="hidden sm:block"/>
              <span className="gradient-text">Recover Better.</span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed">
              RECOVR turns your wearable data, workout logs, and 30-second check-ins into a
              daily readiness score and AI-powered training recommendation — so you always
              know exactly how hard to push.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/how-it-works"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-semibold text-base hover:opacity-90 transition-opacity"
              >
                See how it works
                <svg className="ml-2" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
              <Link
                href="#pricing"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-slate-800 text-white font-semibold text-base border border-slate-700 hover:bg-slate-700 transition-colors"
              >
                View pricing
              </Link>
            </div>

            <div className="mt-14 flex flex-wrap items-center justify-center lg:justify-start gap-8 sm:gap-12">
              {[
                { value: '2,400+', label: 'Active users' },
                { value: '91%', label: 'Avg readiness accuracy' },
                { value: '4.8★', label: 'User rating' },
              ].map(({ value, label }) => (
                <div key={label} className="text-center">
                  <div className="text-2xl font-bold text-white">{value}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Photo */}
          <div className="relative hidden lg:block h-[580px] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl shadow-black/50">
            <Image
              src="/photo2.jpg"
              alt="RECOVR founder"
              fill
              priority
              className="object-cover"
              style={{ objectPosition: 'top center' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent"/>
          </div>
        </div>
      </section>

      {/* 3 inputs */}
      <section className="py-20 px-4 bg-slate-900/40">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-3">How the score is built</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Three inputs. One powerful score.</h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Most apps track one thing. RECOVR combines the three dimensions that actually matter.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {inputs.map(({ step, title, description, icon }) => (
              <div
                key={step}
                className="relative bg-slate-900 border border-slate-800 rounded-2xl p-7 hover:border-slate-700 transition-colors group"
              >
                <div className="absolute top-5 right-5 text-slate-700 text-xs font-mono font-bold">{step}</div>
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-5 group-hover:bg-cyan-500/15 transition-colors">
                  {icon}
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-violet-400 text-sm font-semibold uppercase tracking-widest mb-3">What you get</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Everything your body needs to know</h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              From burnout prevention to peak performance windows — RECOVR has you covered.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map(({ icon, title, description, accent }) => {
              const a = accentMap[accent]
              return (
                <div
                  key={title}
                  className={`rounded-2xl border p-7 ${a.bg} ${a.border}`}
                >
                  <div className={`w-11 h-11 rounded-xl bg-slate-900/60 flex items-center justify-center mb-5 ${a.icon}`}>
                    {icon}
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4 bg-slate-900/40">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-3">Pricing</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Simple, transparent pricing</h2>
            <p className="text-slate-400">Start free. Upgrade when you're ready to go deeper.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tiers.map(({ name, price, period, description, features: fs, cta, href, highlight }) => (
              <div
                key={name}
                className={`relative rounded-2xl p-7 flex flex-col ${
                  highlight
                    ? 'bg-gradient-to-b from-slate-800 to-slate-900 border-2 border-cyan-500/50 shadow-lg shadow-cyan-500/10'
                    : 'bg-slate-900 border border-slate-800'
                }`}
              >
                {highlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">
                      MOST POPULAR
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-white font-bold text-lg mb-1">{name}</h3>
                  <div className="flex items-end gap-1 mb-2">
                    <span className="text-4xl font-bold text-white">{price}</span>
                    {period && <span className="text-slate-400 text-sm mb-1">{period}</span>}
                  </div>
                  <p className="text-slate-400 text-sm">{description}</p>
                </div>

                <ul className="space-y-2.5 flex-1 mb-7">
                  {fs.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <svg className="text-cyan-400 mt-0.5 shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M20 6L9 17l-5-5"/>
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href={href}
                  className={`w-full py-3 rounded-xl text-center font-semibold text-sm transition-all block ${
                    highlight
                      ? 'bg-gradient-to-r from-cyan-500 to-violet-600 text-white hover:opacity-90'
                      : 'bg-slate-800 text-white border border-slate-700 hover:bg-slate-700'
                  }`}
                >
                  {cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Email capture */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700 p-8 sm:p-10 text-center">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-violet-600 flex items-center justify-center mx-auto mb-6">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
              </svg>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Get early access</h2>
            <p className="text-slate-400 mb-8 max-w-md mx-auto">
              Join the waitlist. Be the first to know when we open beta spots and get 3 months of Pro free.
            </p>
            <EmailForm />
            <p className="text-slate-600 text-xs mt-4">No spam, ever. Unsubscribe in one click.</p>
          </div>
        </div>
      </section>
    </>
  )
}
