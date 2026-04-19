"use client"

import { Mail, Phone, MapPin, MessageCircle } from "lucide-react"

export default function ContactPage() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210"
  
  return (
    <div className="bg-brand-black min-h-screen pt-32 pb-24">
      <div className="default-container">
        <h1 className="font-bebas text-[72px] text-brand-white uppercase leading-none tracking-tight mb-4">CONTACT US</h1>
        <p className="font-inter text-[15px] text-brand-muted max-w-[500px] mb-16">
          Have a question about bulk sizing, shipping, or need a custom manufacturing quote? Reach out to our team.
        </p>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* Left Details */}
          <div className="flex-1 flex flex-col gap-10">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-brand-surface1 border border-brand-border flex items-center justify-center text-brand-accent flex-shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="font-inter font-semibold text-[13px] text-brand-white uppercase tracking-widest mb-2">Factory Location</h4>
                <p className="font-inter text-[14px] text-brand-muted leading-relaxed">
                  Highgrand Manufacturing<br/>
                  Phase 1, Okhla Industrial Area<br/>
                  New Delhi, 110020, India
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-brand-surface1 border border-brand-border flex items-center justify-center text-brand-accent flex-shrink-0">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="font-inter font-semibold text-[13px] text-brand-white uppercase tracking-widest mb-2">Call Us</h4>
                <p className="font-inter text-[14px] text-brand-muted leading-relaxed">
                  +91 98765 43210<br/>
                  <span className="text-[12px]">MON-SAT (10 AM - 7 PM)</span>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-brand-surface1 border border-brand-border flex items-center justify-center text-brand-accent flex-shrink-0">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="font-inter font-semibold text-[13px] text-brand-white uppercase tracking-widest mb-2">Email</h4>
                <p className="font-inter text-[14px] text-brand-muted leading-relaxed">
                  wholesale@highgrand.in<br/>
                  <span className="text-[12px]">We respond within 24 hours</span>
                </p>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="flex-1 bg-brand-surface1 border border-brand-border p-8">
            <h3 className="font-bebas text-[32px] text-brand-white uppercase mb-6">Send a Message</h3>
            <form className="flex flex-col gap-5" onSubmit={e => { e.preventDefault(); alert("Message sent!") }}>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-inter font-medium text-[11px] uppercase tracking-widest text-brand-muted">Name</label>
                  <input type="text" required className="bg-brand-black border border-brand-border p-3 text-white text-sm outline-none focus:border-brand-accent" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-inter font-medium text-[11px] uppercase tracking-widest text-brand-muted">Phone</label>
                  <input type="tel" required className="bg-brand-black border border-brand-border p-3 text-white text-sm outline-none focus:border-brand-accent" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-inter font-medium text-[11px] uppercase tracking-widest text-brand-muted">Message</label>
                <textarea rows={4} required className="bg-brand-black border border-brand-border p-3 text-white text-sm outline-none focus:border-brand-accent resize-none"></textarea>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mt-2">
                <button type="submit" className="flex-1 bg-brand-white text-brand-black py-4 font-inter text-[13px] font-semibold uppercase tracking-widest hover:bg-brand-accent transition-colors">
                  Send Message
                </button>
                <a 
                  href={`https://wa.me/${whatsappNumber}`} 
                  target="_blank"
                  className="flex-1 flex items-center justify-center gap-2 bg-brand-whatsapp text-brand-white py-4 font-inter text-[13px] font-semibold uppercase tracking-widest hover:bg-brand-success transition-colors"
                >
                  <MessageCircle size={18} /> WhatsApp
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
