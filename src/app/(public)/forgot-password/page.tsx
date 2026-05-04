"use client"

import { useState, useActionState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Mail, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react"
import toast from "react-hot-toast"
import { requestPasswordReset } from "./actions"

export default function ForgotPasswordPage() {
  const [state, formAction, isPending] = useActionState(requestPasswordReset, null)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (state?.error) {
      toast.error(state.error)
    }
    if (state?.success) {
      setSubmitted(true)
      toast.success("Reset link sent if account exists")
    }
  }, [state])

  return (
    <div className="min-h-screen bg-brand-black flex flex-col items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,#1A1A1A,transparent)] pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-[450px] z-10"
      >
        <div className="bg-black/40 backdrop-blur-xl border border-brand-border p-8 md:p-12 shadow-2xl">
          <div className="text-center mb-10">
            <Link href="/" className="inline-block mb-8">
              <h1 className="text-[28px] font-bold tracking-[8px] text-white uppercase">Highgrand</h1>
            </Link>
            <p className="text-[12px] text-brand-accent uppercase tracking-[4px] font-medium flex items-center justify-center gap-2">
              <ShieldCheck size={14} /> Password Recovery
            </p>
          </div>

          {submitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6"
            >
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-brand-accent/10 rounded-full flex items-center justify-center text-brand-accent border border-brand-accent/20">
                  <CheckCircle2 size={32} />
                </div>
              </div>
              <div className="space-y-2">
                <h2 className="font-bebas text-[24px] text-white uppercase">Link Dispatched</h2>
                <p className="text-[14px] text-brand-muted font-inter">
                  We've sent recovery instructions to your email. Please check your inbox and spam folder.
                </p>
              </div>
              <Link 
                href="/login" 
                className="block w-full bg-brand-white text-brand-black py-4 font-inter font-bold text-[13px] uppercase tracking-widest hover:bg-brand-accent transition-all"
              >
                Back to Login
              </Link>
            </motion.div>
          ) : (
            <form action={formAction} className="space-y-6">
              <div className="space-y-4">
                <div className="relative">
                  <label className="text-[10px] text-brand-muted uppercase tracking-widest block mb-2 font-bold">Account Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted" size={18} />
                    <input 
                      name="email"
                      type="email" 
                      required 
                      disabled={isPending}
                      className="w-full bg-brand-black/50 border border-brand-border py-4 pl-12 pr-4 text-white text-[14px] outline-none focus:border-brand-accent transition-all font-inter" 
                      placeholder="name@business.com"
                    />
                  </div>
                </div>
              </div>

              <button 
                disabled={isPending} 
                type="submit" 
                className="w-full group bg-brand-white text-brand-black py-4 font-inter font-bold text-[13px] uppercase tracking-widest hover:bg-brand-accent transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
              >
                {isPending ? "Processing..." : (
                  <>
                    Send Reset Link <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              <div className="text-center pt-4">
                <Link href="/login" className="text-[12px] text-brand-muted hover:text-white transition-colors">
                  Remember your password? <span className="text-brand-accent underline underline-offset-4 ml-1">Login here</span>
                </Link>
              </div>
            </form>
          )}
        </div>
      </motion.div>

      <div className="absolute bottom-10 left-10 hidden lg:block opacity-20">
        <p className="text-[10px] text-white tracking-[5px] uppercase vertical-text">Recovery System v2.0</p>
      </div>
    </div>
  )
}
