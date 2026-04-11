'use client'

import { useState } from 'react'
import { supabase } from '../../lib/supabase'

type Stress = 'low' | 'medium' | 'high'

interface Result {
  score: number
  recommendation: string
  hrv: number
  sleepHours: number
  stress: Stress
}

interface ScoreConfig {
  color: string
  zone: string
  tag: string
  tagClass: string
  recClass: string
}

function getScoreConfig(score: number): ScoreConfig {
  if (score >= 80) return {
    color: '#22d3ee',
    zone: 'Excellent',
    tag: 'TRAIN HARD',
    tagClass: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    recClass: 'bg-cyan-400/10 border-cyan-400/20 text-cyan-300',
  }
  if (score >= 65) return {
    color: '#10b981',
    zone: 'Good',
    tag: 'ON TRACK',
    tagClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    recClass: 'bg-emerald-400/10 border-emerald-400/20 text-emerald-300',
  }
  if (score >= 50) return {
    color: '#f59e0b',
    zone: 'Moderate',
    tag: 'EASY DAY',
    tagClass: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    recClass: 'bg-amber-400/10 border-amber-400/20 text-amber-300',
  }
  if (score >= 35) return {
    color: '#fb923c',
    zone: 'Low',
    tag: 'LIGHT ONLY',
    tagClass: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
    recClass: 'bg-orange-400/10 border-orange-400/20 text-orange-300',
  }
  return {
    color: '#f87171',
    zone: 'Poor',
    tag: 'REST DAY',
    tagClass: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
    recClass: 'bg-rose-400/10 border-rose-400/20 text-rose-300',
  }
}

function calculateReadiness(hrv: number, sleepHours: number, stress: Stress): { score: number; recommendation: string } {
  // HRV component (0–40 pts): elite ≥70 ms, average 40–60 ms, poor <30 ms
  const hrvScore = Math.min(40, Math.max(0, ((hrv - 20) / 60) * 40))

  // Sleep component (0–35 pts): optimal 7.5–9 h
  let sleepScore: number
  if (sleepHours >= 7.5 && sleepHours <= 9) {
    sleepScore = 35
  } else if (sleepHours > 9) {
    sleepScore = Math.max(20, 35 - (sleepHours - 9) * 5)
  } else if (sleepHours >= 6) {
    sleepScore = 15 + ((sleepHours - 6) / 1.5) * 20
  } else if (sleepHours >= 4) {
    sleepScore = ((sleepHours - 4) / 2) * 15
  } else {
    sleepScore = 0
  }

  // Stress component (0–25 pts)
  const stressScores: Record<Stress, number> = { low: 25, medium: 12, high: 0 }
  const stressScore = stressScores[stress]

  const score = Math.round(Math.min(100, Math.max(0, hrvScore + sleepScore + stressScore)))

  let recommendation: string
  if (score >= 80) {
    recommendation = 'Your body is primed for peak performance. Push hard today — ideal for high-intensity training, strength PRs, or your longest session of the week.'
  } else if (score >= 65) {
    recommendation = 'Good readiness. Moderate to hard training is well-suited. Stick to your plan and hit your targets, but skip all-out max efforts.'
  } else if (score >= 50) {
    recommendation = 'Moderate readiness. Keep intensity aerobic and controlled. Save heavy lifting or intervals for when your score climbs back above 65.'
  } else if (score >= 35) {
    recommendation = 'Recovery is lagging. Light activity only — a walk, mobility work, or gentle stretching. Skip anything that raises your heart rate significantly.'
  } else {
    recommendation = 'Rest day strongly recommended. Your body needs recovery. Focus on sleep, nutrition, and hydration. Training today would likely set you back.'
  }

  return { score, recommendation }
}

function ScoreGauge({ score, color }: { score: number; color: string }) {
  const r = 80
  const arcLen = Math.PI * r // ≈ 251.33
  const progress = (score / 100) * arcLen

  return (
    <div className="relative w-[200px]">
      <svg width="200" height="108" viewBox="0 0 200 108">
        {/* Track */}
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke="#1e293b"
          strokeWidth="14"
          strokeLinecap="round"
        />
        {/* Progress */}
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke={color}
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={`${progress} ${arcLen}`}
          style={{ transition: 'stroke-dasharray 0.8s cubic-bezier(.4,0,.2,1), stroke 0.4s ease' }}
        />
      </svg>
      {/* Score text inside the arc */}
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-2">
        <span className="text-5xl font-bold text-white tabular-nums leading-none">
          {score}
        </span>
        <span className="text-[10px] text-slate-500 uppercase tracking-[0.2em] mt-1.5">out of 100</span>
      </div>
    </div>
  )
}

export default function ReadinessForm() {
  const [hrv, setHrv] = useState('')
  const [sleepHours, setSleepHours] = useState('')
  const [stress, setStress] = useState<Stress>('medium')
  const [result, setResult] = useState<Result | null>(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [saveError, setSaveError] = useState('')
  const [formError, setFormError] = useState('')

  function handleCalculate() {
    setFormError('')
    const hrvVal = parseFloat(hrv)
    const sleepVal = parseFloat(sleepHours)

    if (!hrv || isNaN(hrvVal) || hrvVal < 1 || hrvVal > 300) {
      setFormError('Please enter a valid HRV value (1–300 ms).')
      return
    }
    if (!sleepHours || isNaN(sleepVal) || sleepVal < 0 || sleepVal > 24) {
      setFormError('Please enter valid sleep hours (0–24).')
      return
    }

    const { score, recommendation } = calculateReadiness(hrvVal, sleepVal, stress)
    setResult({ score, recommendation, hrv: hrvVal, sleepHours: sleepVal, stress })
    setSaved(false)
    setSaveError('')
  }

  async function handleSave() {
    if (!result) return
    setSaving(true)
    setSaveError('')

    const { error } = await supabase.from('readiness_scores').insert({
      hrv: result.hrv,
      sleep_hours: result.sleepHours,
      stress_level: result.stress,
      score: result.score,
      recommendation: result.recommendation,
    })

    setSaving(false)
    if (error) {
      setSaveError('Failed to save. Please try again.')
    } else {
      setSaved(true)
    }
  }

  const cfg = result ? getScoreConfig(result.score) : null

  return (
    <div className={result ? 'max-w-4xl mx-auto' : 'max-w-md mx-auto'}>
      <div className={`grid gap-6 ${result ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>

        {/* Input card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
          <h2 className="text-white font-bold text-xl mb-1">Enter your morning metrics</h2>
          <p className="text-slate-400 text-sm mb-7">Check your wearable app for HRV and sleep data.</p>

          <div className="space-y-6">
            {/* HRV */}
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">
                HRV <span className="text-slate-500 font-normal">(heart rate variability)</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={hrv}
                  onChange={e => setHrv(e.target.value)}
                  placeholder="65"
                  min="1"
                  max="300"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/30 transition-colors pr-14"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm font-medium pointer-events-none">ms</span>
              </div>
              <p className="text-slate-500 text-xs mt-1.5">Typical range: 20–100 ms</p>
            </div>

            {/* Sleep hours */}
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">
                Sleep duration
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={sleepHours}
                  onChange={e => setSleepHours(e.target.value)}
                  placeholder="7.5"
                  min="0"
                  max="24"
                  step="0.5"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/30 transition-colors pr-14"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm font-medium pointer-events-none">hrs</span>
              </div>
              <p className="text-slate-500 text-xs mt-1.5">Last night's total sleep</p>
            </div>

            {/* Stress level */}
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">
                Stress level
              </label>
              <div className="grid grid-cols-3 gap-3">
                {(['low', 'medium', 'high'] as Stress[]).map(level => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setStress(level)}
                    className={`py-3 rounded-xl text-sm font-semibold capitalize transition-all border ${
                      stress === level
                        ? level === 'low'
                          ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                          : level === 'medium'
                          ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                          : 'bg-rose-500/20 border-rose-500/40 text-rose-300'
                        : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200 hover:bg-slate-700'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {formError && (
            <p className="mt-4 text-rose-400 text-sm">{formError}</p>
          )}

          <button
            onClick={handleCalculate}
            className="mt-8 w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-semibold hover:opacity-90 transition-opacity"
          >
            Calculate Score
          </button>
        </div>

        {/* Results card */}
        {result && cfg && (
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 flex flex-col">
            <h2 className="text-white font-bold text-xl mb-6">Your readiness score</h2>

            {/* Gauge */}
            <div className="flex flex-col items-center mb-6">
              <ScoreGauge score={result.score} color={cfg.color} />
              <div className="mt-4 flex flex-col items-center gap-2">
                <span className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-widest border ${cfg.tagClass}`}>
                  {cfg.tag}
                </span>
                <span className="text-slate-400 text-sm">{cfg.zone} recovery</span>
              </div>
            </div>

            {/* Metrics breakdown */}
            <div className="space-y-2 mb-6">
              {[
                { icon: '💓', label: 'HRV', value: `${result.hrv} ms` },
                { icon: '🌙', label: 'Sleep', value: `${result.sleepHours} hrs` },
                { icon: '🧠', label: 'Stress', value: result.stress.charAt(0).toUpperCase() + result.stress.slice(1) },
              ].map(({ icon, label, value }) => (
                <div key={label} className="flex items-center justify-between bg-slate-800/60 rounded-lg px-3 py-2.5">
                  <span className="text-slate-400 text-sm flex items-center gap-2">
                    <span>{icon}</span> {label}
                  </span>
                  <span className="text-white font-semibold text-sm">{value}</span>
                </div>
              ))}
            </div>

            {/* Recommendation */}
            <div className={`rounded-xl border px-4 py-3 mb-6 ${cfg.recClass}`}>
              <p className="text-xs text-slate-400 uppercase tracking-wider mb-1.5">Recommendation</p>
              <p className="text-sm font-medium leading-relaxed">{result.recommendation}</p>
            </div>

            {/* Save button */}
            <div className="mt-auto">
              {saved ? (
                <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                  Result saved successfully
                </div>
              ) : (
                <>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="w-full py-3 rounded-xl bg-slate-800 border border-slate-700 text-white font-semibold text-sm hover:bg-slate-700 transition-colors disabled:opacity-50"
                  >
                    {saving ? 'Saving…' : 'Save Result'}
                  </button>
                  {saveError && <p className="mt-2 text-rose-400 text-xs">{saveError}</p>}
                </>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
