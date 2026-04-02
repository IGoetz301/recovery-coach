'use client'

import { useState } from 'react'

type ScenarioKey = 'optimal' | 'moderate' | 'stressed'

const scenarios: Record<ScenarioKey, {
  label: string
  score: number
  color: string
  strokeColor: string
  hrv: string
  sleep: string
  stress: string
  rhr: string
  recommendation: string
  recColor: string
  recBg: string
  tag: string
  tagColor: string
}> = {
  optimal: {
    label: 'Optimal',
    score: 91,
    color: '#22d3ee',
    strokeColor: '#22d3ee',
    hrv: '68 ms',
    sleep: '7h 42m',
    stress: 'Low',
    rhr: '52 bpm',
    recommendation: 'High-intensity training. Your body is primed — push hard today.',
    recColor: 'text-cyan-400',
    recBg: 'bg-cyan-400/10 border-cyan-400/20',
    tag: 'TRAIN HARD',
    tagColor: 'bg-cyan-500/20 text-cyan-300',
  },
  moderate: {
    label: 'Moderate',
    score: 63,
    color: '#f59e0b',
    strokeColor: '#f59e0b',
    hrv: '44 ms',
    sleep: '6h 15m',
    stress: 'Medium',
    rhr: '61 bpm',
    recommendation: 'Moderate aerobic work only. Save heavy lifting for tomorrow.',
    recColor: 'text-amber-400',
    recBg: 'bg-amber-400/10 border-amber-400/20',
    tag: 'EASY DAY',
    tagColor: 'bg-amber-500/20 text-amber-300',
  },
  stressed: {
    label: 'High Stress',
    score: 28,
    color: '#f87171',
    strokeColor: '#f87171',
    hrv: '22 ms',
    sleep: '4h 50m',
    stress: 'High',
    rhr: '74 bpm',
    recommendation: 'Rest day recommended. A walk and stretching only — protect your long-term progress.',
    recColor: 'text-red-400',
    recBg: 'bg-red-400/10 border-red-400/20',
    tag: 'REST DAY',
    tagColor: 'bg-red-500/20 text-red-300',
  },
}

function ScoreRing({ score, color }: { score: number; color: string }) {
  const radius = 54
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference

  return (
    <div className="relative w-36 h-36 flex items-center justify-center">
      <svg width="144" height="144" viewBox="0 0 144 144" className="-rotate-90">
        <circle
          cx="72" cy="72" r={radius}
          fill="none" stroke="#1e293b" strokeWidth="10"
        />
        <circle
          cx="72" cy="72" r={radius}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.6s ease, stroke 0.4s ease' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-bold text-white" style={{ transition: 'color 0.3s' }}>
          {score}
        </span>
        <span className="text-xs text-slate-400 uppercase tracking-widest">Score</span>
      </div>
    </div>
  )
}

export default function ReadinessDemo() {
  const [active, setActive] = useState<ScenarioKey>('optimal')
  const s = scenarios[active]

  const metrics = [
    { label: 'HRV', value: s.hrv, icon: '💓' },
    { label: 'Sleep', value: s.sleep, icon: '🌙' },
    { label: 'Stress', value: s.stress, icon: '🧠' },
    { label: 'Resting HR', value: s.rhr, icon: '❤️' },
  ]

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-700 overflow-hidden max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 bg-slate-800/60 border-b border-slate-700">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/70"/>
          <div className="w-3 h-3 rounded-full bg-yellow-500/70"/>
          <div className="w-3 h-3 rounded-full bg-green-500/70"/>
        </div>
        <span className="text-slate-400 text-xs font-mono">recovr — daily readiness</span>
        <div/>
      </div>

      {/* Scenario toggles */}
      <div className="flex gap-2 px-5 pt-5">
        {(Object.keys(scenarios) as ScenarioKey[]).map((key) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${
              active === key
                ? 'bg-slate-700 text-white'
                : 'bg-slate-800/50 text-slate-500 hover:text-slate-300'
            }`}
          >
            {scenarios[key].label}
          </button>
        ))}
      </div>

      {/* Main content */}
      <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Score ring */}
        <div className="flex flex-col items-center justify-center gap-3">
          <ScoreRing score={s.score} color={s.color} />
          <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wider ${s.tagColor}`}>
            {s.tag}
          </span>
          <p className="text-slate-500 text-xs text-center">Today's readiness score</p>
        </div>

        {/* Metrics */}
        <div className="space-y-3">
          {metrics.map(({ label, value, icon }) => (
            <div
              key={label}
              className="flex items-center justify-between bg-slate-800/60 rounded-lg px-3 py-2.5"
            >
              <span className="text-slate-400 text-sm flex items-center gap-2">
                <span>{icon}</span> {label}
              </span>
              <span className="text-white font-semibold text-sm">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendation */}
      <div className={`mx-5 mb-5 rounded-xl border px-4 py-3 ${s.recBg}`}>
        <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">AI Recommendation</p>
        <p className={`text-sm font-medium ${s.recColor}`}>{s.recommendation}</p>
      </div>
    </div>
  )
}
