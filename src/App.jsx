import { useState } from 'react'

const services = [
  { id: 'hospitality', title: 'Hospitality', desc: 'Concierge, guest relations, and VIP handling', icon: '🏨' },
  { id: 'catering', title: 'Catering', desc: 'Custom menus, live counters, and premium bar', icon: '🍽️' },
  { id: 'decoration', title: 'Decoration', desc: 'Themes, florals, lighting, and stage design', icon: '🌸' },
  { id: 'fireworks', title: 'Fireworks', desc: 'Licensed pyrotechnics and special effects', icon: '🎆' },
  { id: 'dj', title: 'DJ & Entertainment', desc: 'Top DJs, live bands, and sound systems', icon: '🎧' },
]

function App() {
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus(null)

    const form = new FormData(e.currentTarget)
    const payload = Object.fromEntries(form.entries())

    try {
      const base = import.meta.env.VITE_BACKEND_URL || ''
      const res = await fetch(`${base}/api/inquiry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Failed')
      setStatus({ type: 'success', message: 'Thank you! We will reach out shortly.' })
      e.currentTarget.reset()
    } catch (err) {
      setStatus({ type: 'error', message: err.message || 'Something went wrong.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-indigo-50">
      <header className="sticky top-0 z-30 backdrop-blur bg-white/70 border-b">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold tracking-tight">Spark Events</div>
          <nav className="hidden md:flex gap-6 text-sm text-gray-700">
            <a href="#services" className="hover:text-indigo-600">Services</a>
            <a href="#work" className="hover:text-indigo-600">Our Work</a>
            <a href="#contact" className="hover:text-indigo-600">Contact</a>
          </nav>
          <a href="#contact" className="ml-auto md:ml-0 inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md shadow hover:bg-indigo-700 transition">Get a Quote</a>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-fuchsia-500 to-rose-500 opacity-10" />
          <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 items-center gap-10">
            <div>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900">
                Full-service events that wow your guests
              </h1>
              <p className="mt-4 text-lg text-gray-600">
                Hospitality, catering, decor, fireworks, DJs, and everything in between — tailored end-to-end.
              </p>
              <div className="mt-8 flex gap-4">
                <a href="#services" className="px-5 py-3 rounded-md bg-gray-900 text-white hover:bg-gray-800">Explore Services</a>
                <a href="#contact" className="px-5 py-3 rounded-md border border-gray-300 hover:border-gray-400">Get a Quote</a>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-indigo-100 to-rose-100 shadow-inner" />
              <div className="absolute -bottom-6 -left-6 w-40 h-40 rounded-full bg-rose-200 blur-2xl opacity-60" />
              <div className="absolute -top-8 -right-8 w-48 h-48 rounded-full bg-indigo-200 blur-2xl opacity-60" />
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="max-w-6xl mx-auto px-6 py-20">
          <h2 className="text-3xl md:text-4xl font-bold">What we do</h2>
          <p className="mt-3 text-gray-600">Pick a single service or let us orchestrate your entire event.</p>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <div key={s.id} className="group rounded-xl border bg-white/70 backdrop-blur p-6 hover:shadow-lg transition">
                <div className="text-3xl">{s.icon}</div>
                <h3 className="mt-3 text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-gray-600">{s.desc}</p>
                <a href="#contact" className="mt-4 inline-block text-indigo-600 group-hover:translate-x-0.5 transition">Get a quote →</a>
              </div>
            ))}
          </div>
        </section>

        {/* Showcase */}
        <section id="work" className="bg-white/60 border-y">
          <div className="max-w-6xl mx-auto px-6 py-20">
            <h2 className="text-3xl md:text-4xl font-bold">Recent highlights</h2>
            <div className="mt-10 grid md:grid-cols-3 gap-6">
              {[1,2,3].map((i) => (
                <div key={i} className="rounded-xl overflow-hidden border bg-white">
                  <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200" />
                  <div className="p-5">
                    <h3 className="font-semibold">Wedding Gala {i}</h3>
                    <p className="text-gray-600 text-sm mt-1">Catering, decor, and fireworks for 400+ guests.</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="max-w-6xl mx-auto px-6 py-20">
          <h2 className="text-3xl md:text-4xl font-bold">Tell us about your event</h2>
          <p className="mt-3 text-gray-600">Share a few details and we’ll get back within 24 hours.</p>

          <form onSubmit={handleSubmit} className="mt-8 grid md:grid-cols-2 gap-6">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Name</label>
              <input name="name" required className="h-11 px-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-500/40" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Email</label>
              <input type="email" name="email" required className="h-11 px-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-500/40" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Phone</label>
              <input name="phone" className="h-11 px-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-500/40" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Service</label>
              <select name="service" className="h-11 px-3 rounded-md border bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40">
                <option value="">Select a service</option>
                {services.map(s => (
                  <option key={s.id} value={s.title}>{s.title}</option>
                ))}
              </select>
            </div>
            <div className="grid gap-2 md:col-span-2">
              <label className="text-sm font-medium">Message</label>
              <textarea name="message" rows="4" className="px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-500/40" placeholder="Event date, venue, guest count, theme, budget..." />
            </div>
            <div className="grid gap-2 md:grid-cols-2">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Preferred Date</label>
                <input name="event_date" type="date" className="h-11 px-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-500/40" />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Estimated Budget</label>
                <input name="budget" placeholder="$5k - $10k" className="h-11 px-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-500/40" />
              </div>
            </div>

            <div className="md:col-span-2 flex items-center gap-4">
              <button disabled={loading} className="inline-flex items-center gap-2 px-5 h-11 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-60">
                {loading ? 'Sending...' : 'Send Inquiry'}
              </button>
              {status && (
                <span className={status.type === 'success' ? 'text-emerald-600' : 'text-rose-600'}>{status.message}</span>
              )}
            </div>
          </form>
        </section>
      </main>

      <footer className="border-t bg-white/70">
        <div className="max-w-6xl mx-auto px-6 py-10 text-sm text-gray-600 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>© {new Date().getFullYear()} Spark Events. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-900">Instagram</a>
            <a href="#" className="hover:text-gray-900">Facebook</a>
            <a href="#" className="hover:text-gray-900">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
