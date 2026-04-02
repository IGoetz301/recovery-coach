'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function EmailForm() {
  const [form, setForm] = useState({ name: '', email: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error: insertError } = await supabase
      .from('subscribers')
      .insert({ name: form.name, email: form.email })

    setLoading(false)

    if (insertError) {
      setError('Something went wrong. Please try again.')
      return
    }

    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mx-auto mb-4">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="2.5">
            <path d="M20 6L9 17l-5-5"/>
          </svg>
        </div>
        <h3 className="text-white font-semibold text-xl mb-2">You're on the list!</h3>
        <p className="text-slate-400 text-sm">
          Welcome, {form.name}. We'll reach out to {form.email} when early access opens.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Your name"
        required
        className="flex-1 px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors text-sm"
      />
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Your email"
        required
        className="flex-1 px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors text-sm"
      />
      <button
        type="submit"
        disabled={loading}
        className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-60 whitespace-nowrap"
      >
        {loading ? 'Joining...' : 'Get Early Access'}
      </button>
      {error && (
        <p className="text-red-400 text-xs mt-2 sm:col-span-full">{error}</p>
      )}
    </form>
  )
}
