import type { Metadata } from 'next'
import ContactForm from '../components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
}

const contactDetails = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    label: 'Email',
    value: 'hello@recovr.app',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    label: 'Location',
    value: 'San Francisco, CA',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    label: 'Response time',
    value: 'Within 24 hours',
  },
]

const faqs = [
  {
    q: 'Which wearables do you support?',
    a: 'We support Garmin, Apple Watch via Apple Health, Whoop, and Oura Ring. More integrations are coming.',
  },
  {
    q: 'How accurate is the readiness score?',
    a: 'In our beta cohort, 91% of users reported the score matched their felt experience within ±10 points after a 2-week calibration period.',
  },
  {
    q: 'Can I use RECOVR without a wearable?',
    a: 'Yes — the Free tier works purely on manual check-ins and training log data. Wearable sync unlocks deeper metrics.',
  },
  {
    q: 'Is there a free trial for Pro?',
    a: 'Early access waitlist members get 3 months of Pro free. Otherwise, all plans have a 14-day free trial.',
  },
]

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-cyan-500/5 rounded-full blur-3xl"/>
        </div>
        <div className="max-w-2xl mx-auto text-center relative">
          <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-4">Get in touch</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5 leading-tight">
            We'd love to{' '}
            <span className="gradient-text">hear from you</span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            Questions about pricing, integrations, or your training? Send us a message
            and we'll get back to you within 24 hours.
          </p>
        </div>
      </section>

      {/* Form + details */}
      <section className="py-8 pb-20 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Contact form */}
          <div className="lg:col-span-3 bg-slate-900 border border-slate-800 rounded-2xl p-8">
            <h2 className="text-white font-bold text-xl mb-6">Send a message</h2>
            <ContactForm />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact details */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-white font-bold text-base mb-5">Contact details</h3>
              <ul className="space-y-4">
                {contactDetails.map(({ icon, label, value }) => (
                  <li key={label} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                      {icon}
                    </div>
                    <div>
                      <p className="text-slate-500 text-xs">{label}</p>
                      <p className="text-white text-sm font-medium">{value}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-white font-bold text-base mb-4">Follow along</h3>
              <p className="text-slate-400 text-sm mb-4">
                We share training tips, product updates, and recovery science on social.
              </p>
              <div className="flex gap-3">
                {['Twitter / X', 'Instagram', 'LinkedIn'].map((s) => (
                  <a
                    key={s}
                    href="#"
                    className="flex-1 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-400 hover:text-white text-xs text-center transition-colors hover:bg-slate-700"
                  >
                    {s.split(' ')[0]}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-slate-900/40">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-violet-400 text-sm font-semibold uppercase tracking-widest mb-3">FAQ</p>
            <h2 className="text-3xl font-bold text-white mb-4">Common questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map(({ q, a }) => (
              <div key={q} className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <h3 className="text-white font-semibold mb-2">{q}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
