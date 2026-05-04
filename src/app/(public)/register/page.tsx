"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { CheckCircle2, ArrowRight, Loader2, Building2, Mail, Phone, MapPin, BarChart3, ShieldCheck, Zap, Factory, Truck } from "lucide-react"
import toast from "react-hot-toast"
import Image from "next/image"

export default function RegisterPage() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    businessName: "",
    businessType: "SHOP",
    city: "",
    state: "",
    monthlyVolume: "50-100"
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (loading) return
    setLoading(true)
    setError("")
    const loadingToast = toast.loading("Submitting your application...")

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Registration failed")
        toast.error(data.error || "Registration failed", { id: loadingToast })
        setLoading(false)
        return
      }

      toast.success("Application submitted successfully", { id: loadingToast })
      window.location.href = "/register/success"
    } catch (err) {
      setError("An unexpected error occurred.")
      toast.error("An unexpected error occurred.", { id: loadingToast })
      setLoading(false)
    }
  }

  const benefits = [
    { icon: <Zap size={18} />, title: "Live Wholesale Pricing", desc: "Unlock exclusive factory rates instantly upon approval." },
    { icon: <Truck size={18} />, title: "Zero MOQ Policy", desc: "Order exactly what you need. No bulk pressure." },
    { icon: <Factory size={18} />, title: "Delhi Factory Direct", desc: "Skip middleman margins. Direct from our manufacturing floor." },
    { icon: <ShieldCheck size={18} />, title: "Verified Partnership", desc: "GST verified invoices and professional B2B support." }
  ]

  return (
    <div className="min-h-screen bg-brand-black flex flex-col lg:flex-row overflow-hidden pt-16 lg:pt-0">
      {/* Left Side: Persuasive Branding (Hidden on mobile) */}
      <div className="lg:w-1/2 relative hidden lg:flex flex-col justify-center p-20 xl:p-32 overflow-hidden border-r border-brand-border/30">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=2000&auto=format&fit=crop" 
            alt="Apparel Manufacturing" 
            fill 
            className="object-cover opacity-20 grayscale scale-110" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/90 to-transparent" />
        </div>

        <div className="relative z-10 space-y-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link href="/" className="inline-block mb-12">
              <h1 className="text-[32px] font-bold tracking-[10px] text-white uppercase">Highgrand</h1>
            </Link>
            <h2 className="font-bebas text-[70px] xl:text-[90px] leading-[0.85] text-brand-white uppercase mb-6">
              Scale Your Brand <br/><span className="text-brand-accent">With Precision</span>
            </h2>
            <p className="font-inter text-brand-muted text-[18px] max-w-[500px] leading-relaxed">
              Join 650+ registered boutiques and online brands across India who trust Highgrand for premium heavyweight blanks.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="grid grid-cols-1 xl:grid-cols-2 gap-8"
          >
            {benefits.map((benefit, i) => (
              <div key={i} className="flex gap-4 group">
                <div className="w-10 h-10 shrink-0 bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent group-hover:bg-brand-accent group-hover:text-black transition-all">
                  {benefit.icon}
                </div>
                <div>
                  <h4 className="font-bebas text-[20px] text-brand-white uppercase mb-1">{benefit.title}</h4>
                  <p className="text-[13px] text-brand-muted leading-snug">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>

          <div className="pt-12 border-t border-brand-border/30">
            <p className="text-[11px] text-brand-muted uppercase tracking-[4px] mb-4 font-bold">Reseller Trust Badge</p>
            <div className="flex gap-8 opacity-40 grayscale contrast-125">
               <div className="font-bebas text-[24px]">GST VERIFIED</div>
               <div className="font-bebas text-[24px]">ISO 9001:2015</div>
               <div className="font-bebas text-[24px]">12 YRS EXP</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Multi-Step Form */}
      <div className="lg:w-1/2 min-h-screen flex flex-col justify-center items-center p-6 md:p-12 lg:p-20 relative">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_70%_20%,#1A1A1A,transparent)] pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-[550px] z-10"
        >
          {/* Mobile Header (Hidden on LG) */}
          <div className="lg:hidden text-center mb-10">
            <h1 className="text-[24px] font-bold tracking-[8px] text-white uppercase mb-4">Highgrand</h1>
            <h2 className="font-bebas text-[40px] text-white leading-none uppercase">Reseller Application</h2>
          </div>

          <div className="bg-black/40 backdrop-blur-xl border border-brand-border p-8 md:p-12 shadow-2xl relative">
            <div className="flex items-center justify-between mb-12 relative">
              <div className="absolute top-1/2 left-0 w-full h-[1px] bg-brand-border -translate-y-1/2 z-0" />
              <div className={`relative z-10 w-10 h-10 flex items-center justify-center font-bebas text-[20px] transition-all duration-500 ${step >= 1 ? 'bg-brand-accent text-black border-brand-accent' : 'bg-brand-black text-brand-muted border-brand-border'} border-2`}>01</div>
              <div className={`relative z-10 w-10 h-10 flex items-center justify-center font-bebas text-[20px] transition-all duration-500 ${step >= 2 ? 'bg-brand-accent text-black border-brand-accent' : 'bg-brand-black text-brand-muted border-brand-border'} border-2`}>02</div>
              <div className={`relative z-10 w-10 h-10 flex items-center justify-center font-bebas text-[20px] transition-all duration-500 ${step === 2 ? 'opacity-40' : 'opacity-0'} border-2 border-brand-border bg-brand-black`}>✓</div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <AnimatePresence mode="wait">
                {step === 1 ? (
                  <motion.div 
                    key="step1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-6"
                  >
                    <div className="text-center md:text-left mb-8">
                      <h3 className="font-bebas text-[28px] text-white uppercase mb-2">Personal Credentials</h3>
                      <p className="text-[13px] text-brand-muted font-inter">Enter the primary contact person's details for this account.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] text-brand-muted uppercase tracking-widest font-bold block mb-1">Full Name</label>
                        <div className="relative">
                           <input 
                            required 
                            type="text" 
                            value={formData.name} 
                            onChange={e => setFormData({...formData, name: e.target.value})} 
                            className="w-full bg-brand-black/50 border border-brand-border p-4 text-white text-[14px] outline-none focus:border-brand-accent transition-all font-inter" 
                            placeholder="John Doe" 
                           />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] text-brand-muted uppercase tracking-widest font-bold block mb-1">Business Email</label>
                        <input 
                          required 
                          type="email" 
                          value={formData.email} 
                          onChange={e => setFormData({...formData, email: e.target.value})} 
                          className="w-full bg-brand-black/50 border border-brand-border p-4 text-white text-[14px] outline-none focus:border-brand-accent transition-all font-inter" 
                          placeholder="john@brand.com" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] text-brand-muted uppercase tracking-widest font-bold block mb-1">Mobile Number</label>
                        <input 
                          required 
                          type="tel" 
                          value={formData.phone} 
                          onChange={e => setFormData({...formData, phone: e.target.value})} 
                          className="w-full bg-brand-black/50 border border-brand-border p-4 text-white text-[14px] outline-none focus:border-brand-accent transition-all font-inter" 
                          placeholder="+91 00000 00000" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] text-brand-muted uppercase tracking-widest font-bold block mb-1">Portal Password</label>
                        <input 
                          required 
                          type="password" 
                          value={formData.password} 
                          onChange={e => setFormData({...formData, password: e.target.value})} 
                          className="w-full bg-brand-black/50 border border-brand-border p-4 text-white text-[14px] outline-none focus:border-brand-accent transition-all font-inter" 
                          placeholder="••••••••" 
                        />
                      </div>
                    </div>

                    <button 
                      type="button" 
                      onClick={() => setStep(2)} 
                      className="w-full group bg-brand-white text-brand-black py-5 font-inter font-bold text-[13px] uppercase tracking-widest hover:bg-brand-accent transition-all flex items-center justify-center gap-2 mt-8"
                    >
                      Continue to Business Info <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="step2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-6"
                  >
                    <div className="text-center md:text-left mb-8">
                      <h3 className="font-bebas text-[28px] text-white uppercase mb-2">Business Profile</h3>
                      <p className="text-[13px] text-brand-muted font-inter">Tell us about your brand or store for verification.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2 col-span-2">
                        <label className="text-[10px] text-brand-muted uppercase tracking-widest font-bold block mb-1">Company / Brand Name</label>
                        <input 
                          required 
                          type="text" 
                          value={formData.businessName} 
                          onChange={e => setFormData({...formData, businessName: e.target.value})} 
                          className="w-full bg-brand-black/50 border border-brand-border p-4 text-white text-[14px] outline-none focus:border-brand-accent transition-all font-inter" 
                          placeholder="My Streetwear Brand" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] text-brand-muted uppercase tracking-widest font-bold block mb-1">Business Nature</label>
                        <select 
                          value={formData.businessType} 
                          onChange={e => setFormData({...formData, businessType: e.target.value})} 
                          className="w-full bg-brand-black/50 border border-brand-border p-4 text-white text-[14px] outline-none focus:border-brand-accent transition-all appearance-none font-inter"
                        >
                          <option value="SHOP" className="bg-brand-black">Physical Retail</option>
                          <option value="ONLINE" className="bg-brand-black">Online / E-commerce</option>
                          <option value="BOTH" className="bg-brand-black">Omnichannel</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] text-brand-muted uppercase tracking-widest font-bold block mb-1">Est. Monthly Volume</label>
                        <select 
                          value={formData.monthlyVolume} 
                          onChange={e => setFormData({...formData, monthlyVolume: e.target.value})} 
                          className="w-full bg-brand-black/50 border border-brand-border p-4 text-white text-[14px] outline-none focus:border-brand-accent transition-all appearance-none font-inter"
                        >
                          <option value="50-100" className="bg-brand-black">50 - 100 Pcs</option>
                          <option value="100-500" className="bg-brand-black">100 - 500 Pcs</option>
                          <option value="500+" className="bg-brand-black">500+ Pcs</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] text-brand-muted uppercase tracking-widest font-bold block mb-1">City</label>
                        <input 
                          required 
                          type="text" 
                          value={formData.city} 
                          onChange={e => setFormData({...formData, city: e.target.value})} 
                          className="w-full bg-brand-black/50 border border-brand-border p-4 text-white text-[14px] outline-none focus:border-brand-accent transition-all font-inter" 
                          placeholder="New Delhi" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] text-brand-muted uppercase tracking-widest font-bold block mb-1">State / Region</label>
                        <input 
                          required 
                          type="text" 
                          value={formData.state} 
                          onChange={e => setFormData({...formData, state: e.target.value})} 
                          className="w-full bg-brand-black/50 border border-brand-border p-4 text-white text-[14px] outline-none focus:border-brand-accent transition-all font-inter" 
                          placeholder="Delhi" 
                        />
                      </div>
                    </div>
                    
                    {error && <div className="text-red-500 text-[12px] bg-red-500/10 p-4 border border-red-500/20 text-center">{error}</div>}

                    <div className="flex gap-4 pt-6">
                      <button 
                        type="button" 
                        onClick={() => setStep(1)} 
                        className="flex-1 border border-brand-border text-brand-muted py-5 font-inter font-bold text-[13px] uppercase tracking-widest hover:text-white hover:border-white transition-all"
                      >
                        Back
                      </button>
                      <button 
                        disabled={loading} 
                        type="submit" 
                        className="flex-[2] bg-brand-white text-brand-black py-5 font-inter font-bold text-[13px] uppercase tracking-widest hover:bg-brand-accent transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        {loading ? <Loader2 className="animate-spin" size={18} /> : "Complete Application"}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>

          <div className="text-center mt-12">
            <p className="text-[12px] text-brand-muted">
              Already a partner? <Link href="/login" className="text-white hover:text-brand-accent ml-1 transition-colors underline underline-offset-4">Sign in to your portal</Link>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Decorative vertical text */}
      <div className="absolute right-10 bottom-10 hidden xl:block opacity-10">
        <p className="text-[10px] text-white tracking-[10px] uppercase vertical-text">B2B Registration v3.4</p>
      </div>
    </div>
  )
}
