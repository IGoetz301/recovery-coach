import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About',
}

const values = [
  {
    title: 'Performance is personal',
    description:
      'Generic training plans fail because every body is different. Recovery is contextual — your age, stress levels, sleep debt, and life load all change what "ready" means for you today.',
    icon: '🎯',
  },
  {
    title: 'Rest is training',
    description:
      'We built RECOVR on a single insight: adaptation doesn\'t happen in the gym, it happens in recovery. Protecting your rest is just as important as maximizing your effort.',
    icon: '⚡',
  },
  {
    title: 'Data without overwhelm',
    description:
      'Wearables generate thousands of data points. We distill them into one number and one recommendation so you can act without analysis paralysis.',
    icon: '📊',
  },
]

const team = [
  {
    name: 'Jordan Rivera',
    role: 'Co-founder & CEO',
    bio: 'Former D1 athlete turned software engineer. Built RECOVR after burning out chasing PRs while managing a demanding tech career.',
    initials: 'JR',
    gradient: 'from-cyan-500 to-blue-600',
    photo: '/photo2.jpg',
  },
  {
    name: 'Maya Chen',
    role: 'Co-founder & CTO',
    bio: 'PhD in exercise physiology, 8 years in sports science research. Passionate about translating lab-grade metrics into everyday coaching.',
    initials: 'MC',
    gradient: 'from-violet-500 to-purple-600',
  },
  {
    name: 'Sam Torres',
    role: 'Head of Design',
    bio: 'Product designer from the health tech world. Believes the best tools disappear — you just feel the results.',
    initials: 'ST',
    gradient: 'from-emerald-500 to-teal-600',
  },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-[500px] h-[400px] bg-violet-500/5 rounded-full blur-3xl"/>
        </div>
        <div className="max-w-3xl mx-auto text-center relative">
          <p className="text-violet-400 text-sm font-semibold uppercase tracking-widest mb-4">Our story</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
            Built by athletes who learned{' '}
            <span className="gradient-text">the hard way</span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            RECOVR was born from a simple frustration: we had access to incredible wearable technology,
            but no intelligent way to interpret it. We were data-rich and insight-poor — and we were
            burning out because of it.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 px-4 bg-slate-900/40">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-4">Our mission</p>
              <h2 className="text-3xl font-bold text-white mb-5">
                Help every athlete make smarter decisions about training and rest
              </h2>
              <p className="text-slate-400 leading-relaxed mb-4">
                We believe that training intelligence shouldn't be reserved for professional athletes with
                full-time coaching staff. Young professionals training alongside demanding careers deserve
                the same quality of guidance.
              </p>
              <p className="text-slate-400 leading-relaxed">
                RECOVR democratizes sports science. We take the metrics your wearable already collects,
                layer in your personal context, and give you an honest daily answer: push hard, take it easy,
                or rest.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '2024', label: 'Founded' },
                { value: '2,400+', label: 'Athletes' },
                { value: '3', label: 'Team members' },
                { value: '1', label: 'Mission' },
              ].map(({ value, label }) => (
                <div key={label} className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-center">
                  <div className="text-3xl font-bold text-white mb-1">{value}</div>
                  <div className="text-slate-500 text-sm">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-emerald-400 text-sm font-semibold uppercase tracking-widest mb-3">What we believe</p>
            <h2 className="text-3xl font-bold text-white">The principles behind RECOVR</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map(({ title, description, icon }) => (
              <div key={title} className="bg-slate-900 border border-slate-800 rounded-2xl p-7">
                <div className="text-3xl mb-5">{icon}</div>
                <h3 className="text-white font-bold text-lg mb-3">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video section */}
      <section className="py-16 px-4 bg-slate-900/40">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-4">Watch our story</p>
          <h2 className="text-3xl font-bold text-white mb-8">See why we built RECOVR</h2>
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-slate-700 shadow-xl shadow-black/40">
            <iframe
              src="https://www.youtube.com/embed/ybx8nM8qeRE"
              title="RECOVR founder story"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-3">The team</p>
            <h2 className="text-3xl font-bold text-white mb-4">Who's behind RECOVR</h2>
            <p className="text-slate-400 max-w-lg mx-auto">
              A small team obsessed with performance, recovery science, and making elite coaching accessible.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {team.map(({ name, role, bio, initials, gradient, photo }) => (
              <div key={name} className="bg-slate-900 border border-slate-800 rounded-2xl p-7 text-center">
                {photo ? (
                  <div className="relative w-24 h-24 rounded-full overflow-hidden mx-auto mb-5 border-2 border-slate-700">
                    <Image src={photo} alt={name} fill className="object-cover" />
                  </div>
                ) : (
                  <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center mx-auto mb-5`}>
                    <span className="text-white font-bold text-xl">{initials}</span>
                  </div>
                )}
                <h3 className="text-white font-bold text-lg mb-1">{name}</h3>
                <p className="text-cyan-400 text-sm font-medium mb-4">{role}</p>
                <p className="text-slate-400 text-sm leading-relaxed">{bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-slate-900/40">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to train with intelligence?</h2>
          <p className="text-slate-400 mb-8">
            Join thousands of athletes already making smarter decisions every morning.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/how-it-works"
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-semibold hover:opacity-90 transition-opacity"
            >
              See how it works
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 rounded-xl bg-slate-800 text-white font-semibold border border-slate-700 hover:bg-slate-700 transition-colors"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
