"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [redirecting, setRedirecting] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (loading || redirecting) return
    setLoading(true)
    setError("")

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    if (res?.error) {
      setError("The email or password you entered is incorrect.")
      setLoading(false)
    } else {
      setRedirecting(true)
      // Small delay for smooth transition
      setTimeout(async () => {
        const sessionRes = await fetch("/api/auth/session")
        const sessionData = await sessionRes.json()
        
        if (sessionData?.user?.role === "ADMIN") {
          router.push("/admin")
        } else {
          router.push("/reseller")
        }
      }, 500)
    }
  }

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-brand-black py-20 px-6 relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-1/4 -left-20 w-64 h-64 bg-brand-accent/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-white/5 rounded-full blur-[150px]" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full relative z-10"
      >
        <div className="text-center mb-10">
          <motion.div 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-brand-surface1 border border-brand-border rounded-full mb-6"
          >
            <ShieldCheck size={32} className="text-brand-accent" />
          </motion.div>
          <h1 className="font-bebas text-[56px] text-brand-white uppercase leading-tight mb-2 tracking-tight">Partner Login</h1>
          <p className="font-inter text-[14px] text-brand-muted uppercase tracking-[0.2em] font-medium">Highgrand Executive Access</p>
        </div>
        
        <div className="bg-brand-surface1/40 backdrop-blur-xl border border-brand-border p-8 md:p-10 shadow-2xl relative">
          {redirecting ? (
            <div className="py-12 text-center">
              <div className="w-12 h-12 border-2 border-brand-accent border-t-transparent rounded-full animate-spin mx-auto mb-6" />
              <p className="font-bebas text-[24px] text-brand-white uppercase">Authenticating...</p>
              <p className="font-inter text-[13px] text-brand-muted mt-2">Preparing your secure dashboard</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="bg-[#1A0A0A] border border-brand-error text-brand-error text-[12px] font-inter p-3 font-medium uppercase tracking-wider"
                >
                  {error}
                </motion.div>
              )}
              
              <div className="flex flex-col gap-2">
                <label className="font-inter font-bold text-[10px] uppercase tracking-widest text-brand-muted ml-1">Work Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-disabled" size={16} />
                  <input 
                    type="email" 
                    required 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    className="w-full bg-brand-black/50 border border-brand-border py-4 pl-12 pr-4 text-white text-[14px] outline-none focus:border-brand-accent transition-all font-inter" 
                    placeholder="name@business.com"
                  />
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="font-inter font-bold text-[10px] uppercase tracking-widest text-brand-muted">Password</label>
                  <Link href="#" className="text-[10px] uppercase tracking-widest text-brand-muted hover:text-brand-accent">Forgot?</Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-disabled" size={16} />
                  <input 
                    type="password" 
                    required 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    className="w-full bg-brand-black/50 border border-brand-border py-4 pl-12 pr-4 text-white text-[14px] outline-none focus:border-brand-accent transition-all font-inter" 
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button 
                disabled={loading} 
                type="submit" 
                className="w-full group bg-brand-white text-brand-black py-4 font-inter font-bold text-[13px] uppercase tracking-widest hover:bg-brand-accent transition-all flex items-center justify-center gap-2 mt-2"
              >
                {loading ? "Verifying Credentials..." : (
                  <>
                    Secure Access <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              <div className="mt-6 pt-6 border-t border-brand-border/30 text-center">
                <p className="font-inter text-[12px] text-brand-muted uppercase tracking-widest">
                  Not a partner? <Link href="/register" className="text-brand-accent hover:text-white font-bold ml-1 transition-colors">Join the loop</Link>
                </p>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  )
}
