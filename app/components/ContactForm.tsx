'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error: insertError } = await supabase
      .from('contacts')
      .insert({ name: form.name, email: form.email, message: form.message })

    setLoading(false)

    if (insertError) {
      setError('Something went wrong. Please try again.')
      return
    }

    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mx-auto mb-5">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="2.5">
            <path d="M20 6L9 17l-5-5"/>
          </svg>
        </div>
        <h3 className="text-white font-bold text-2xl mb-3">Message sent!</h3>
        <p className="text-slate-400 max-w-sm mx-auto">
          Thanks, {form.name}. We'll get back to you at{' '}
          <span className="text-cyan-400">{form.email}</span> within 24 hours.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Alex Johnson"
            required
            className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="alex@company.com"
            required
            className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors text-sm"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Message
        </label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Tell us how we can help..."
          required
          rows={5}
          className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors text-sm resize-none"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
      >
        {loading ? 'Sending...' : 'Send Message'}
      </button>
      {error && (
        <p className="text-red-400 text-sm">{error}</p>
      )}
    </form>
  )
}
