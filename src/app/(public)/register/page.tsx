"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { CheckCircle2, ArrowRight } from "lucide-react"

export default function RegisterPage() {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)

  // Basic form values
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", password: "",
    businessName: "", businessType: "SHOP", city: "", state: "", monthlyVolume: "50-100"
  })

  // Simulated submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // A fetch to /api/auth/register would go here
    setTimeout(() => {
      setSubmitted(true)
    }, 800)
  }

  const slideVariants = {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: -40, transition: { duration: 0.25 } }
  }

  if (submitted) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-brand-black px-6">
        <div className="max-w-md w-full bg-brand-surface1 border border-brand-border p-8 text-center flex flex-col items-center">
          <CheckCircle2 size={48} className="text-brand-success mb-6" />
          <h2 className="font-bebas text-[36px] text-brand-white uppercase mb-4">Application Submitted!</h2>
          <p className="font-inter text-[15px] text-brand-muted mb-8 leading-relaxed">
            Thank you for registering. Our team will review your application and approve your wholesale access within 24 hours. We will notify you via email.
          </p>
          <Link href="/" className="bg-brand-white text-brand-black px-8 py-3.5 font-inter font-semibold text-[13px] uppercase tracking-widest hover:bg-brand-accent transition-colors w-full">
            Return to Homepage
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-brand-black py-20 px-6">
      <div className="max-w-md w-full relative">
        <div className="text-center mb-10">
          <h1 className="font-bebas text-[48px] text-brand-white uppercase">Become a Reseller</h1>
          <p className="font-inter text-[14px] text-brand-muted mt-2">Unlock factory direct wholesale pricing instantly after approval.</p>
        </div>

        {/* Form Container */}
        <div className="bg-brand-surface1 border border-brand-border p-8 relative overflow-hidden min-h-[440px]">
          {/* Progress Indicators */}
          <div className="flex gap-2 mb-8 relative z-20">
            <div className={`h-1 flex-1 transition-colors ${step >= 1 ? 'bg-brand-accent' : 'bg-brand-surface2'}`} />
            <div className={`h-1 flex-1 transition-colors ${step >= 2 ? 'bg-brand-accent' : 'bg-brand-surface2'}`} />
            <div className={`h-1 flex-1 transition-colors ${step >= 3 ? 'bg-brand-accent' : 'bg-brand-surface2'}`} />
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.form key="step1" variants={slideVariants} initial="hidden" animate="visible" exit="exit" className="flex flex-col gap-5" onSubmit={(e) => { e.preventDefault(); setStep(2) }}>
                <div className="flex flex-col gap-1.5">
                  <label className="font-inter font-medium text-[11px] uppercase tracking-widest text-brand-muted">Full Name</label>
                  <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="bg-brand-black border border-brand-border p-3 text-white text-sm outline-none focus:border-brand-accent" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-inter font-medium text-[11px] uppercase tracking-widest text-brand-muted">Email Address</label>
                  <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="bg-brand-black border border-brand-border p-3 text-white text-sm outline-none focus:border-brand-accent" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-inter font-medium text-[11px] uppercase tracking-widest text-brand-muted">Phone Number</label>
                  <input type="tel" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="bg-brand-black border border-brand-border p-3 text-white text-sm outline-none focus:border-brand-accent" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-inter font-medium text-[11px] uppercase tracking-widest text-brand-muted">Password</label>
                  <input type="password" required value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="bg-brand-black border border-brand-border p-3 text-white text-sm outline-none focus:border-brand-accent" />
                </div>
                <button type="submit" className="mt-4 flex items-center justify-center gap-2 bg-brand-white text-brand-black py-3.5 font-inter font-semibold text-[13px] uppercase tracking-widest hover:bg-brand-accent transition-colors">
                  Next Step <ArrowRight size={16} />
                </button>
              </motion.form>
            )}

            {step === 2 && (
              <motion.form key="step2" variants={slideVariants} initial="hidden" animate="visible" exit="exit" className="flex flex-col gap-5" onSubmit={(e) => { e.preventDefault(); setStep(3) }}>
                <div className="flex flex-col gap-1.5">
                  <label className="font-inter font-medium text-[11px] uppercase tracking-widest text-brand-muted">Business / Shop Name</label>
                  <input type="text" required value={formData.businessName} onChange={e => setFormData({...formData, businessName: e.target.value})} className="bg-brand-black border border-brand-border p-3 text-white text-sm outline-none focus:border-brand-accent" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-inter font-medium text-[11px] uppercase tracking-widest text-brand-muted">Business Type</label>
                  <select value={formData.businessType} onChange={e => setFormData({...formData, businessType: e.target.value})} className="bg-brand-black border border-brand-border p-3 text-white text-sm outline-none focus:border-brand-accent appearance-none">
                    <option value="SHOP">Physical Shop</option>
                    <option value="ONLINE">Online Store</option>
                    <option value="BOTH">Both</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-inter font-medium text-[11px] uppercase tracking-widest text-brand-muted">City</label>
                    <input type="text" required value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} className="bg-brand-black border border-brand-border p-3 text-white text-sm outline-none focus:border-brand-accent" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-inter font-medium text-[11px] uppercase tracking-widest text-brand-muted">State</label>
                    <input type="text" required value={formData.state} onChange={e => setFormData({...formData, state: e.target.value})} className="bg-brand-black border border-brand-border p-3 text-white text-sm outline-none focus:border-brand-accent" />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-inter font-medium text-[11px] uppercase tracking-widest text-brand-muted">Est. Monthly Volume (Pieces)</label>
                  <select value={formData.monthlyVolume} onChange={e => setFormData({...formData, monthlyVolume: e.target.value})} className="bg-brand-black border border-brand-border p-3 text-white text-sm outline-none focus:border-brand-accent appearance-none">
                    <option value="0-50">0 - 50</option>
                    <option value="50-100">50 - 100</option>
                    <option value="100-500">100 - 500</option>
                    <option value="500+">500+</option>
                  </select>
                </div>
                <div className="flex gap-4 mt-4">
                  <button type="button" onClick={() => setStep(1)} className="w-[100px] border border-brand-border text-brand-muted py-3.5 font-inter font-medium text-[13px] uppercase hover:text-white transition-colors">Back</button>
                  <button type="submit" className="flex-1 flex items-center justify-center gap-2 bg-brand-white text-brand-black py-3.5 font-inter font-semibold text-[13px] uppercase tracking-widest hover:bg-brand-accent transition-colors">
                    Review <ArrowRight size={16} />
                  </button>
                </div>
              </motion.form>
            )}

            {step === 3 && (
              <motion.form key="step3" variants={slideVariants} initial="hidden" animate="visible" exit="exit" className="flex flex-col h-full" onSubmit={handleSubmit}>
                <h3 className="font-bebas text-[24px] text-brand-white uppercase mb-6">Review Application</h3>
                
                <div className="bg-brand-black border border-brand-border p-4 mb-8">
                  <div className="grid grid-cols-2 gap-y-4 text-[13px] font-inter">
                    <div><span className="text-brand-muted block text-[10px] uppercase mb-1">Name</span><span className="text-white">{formData.name}</span></div>
                    <div><span className="text-brand-muted block text-[10px] uppercase mb-1">Email</span><span className="text-white">{formData.email}</span></div>
                    <div><span className="text-brand-muted block text-[10px] uppercase mb-1">Business</span><span className="text-white">{formData.businessName} ({formData.businessType})</span></div>
                    <div><span className="text-brand-muted block text-[10px] uppercase mb-1">Location</span><span className="text-white">{formData.city}, {formData.state}</span></div>
                  </div>
                </div>

                <div className="mt-auto flex gap-4">
                  <button type="button" onClick={() => setStep(2)} className="w-[100px] border border-brand-border text-brand-muted py-3.5 font-inter font-medium text-[13px] uppercase hover:text-white transition-colors">Back</button>
                  <button type="submit" className="flex-1 bg-brand-accent text-brand-black py-3.5 font-inter font-semibold text-[13px] uppercase tracking-widest hover:bg-brand-white transition-colors">
                    Submit Application
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
