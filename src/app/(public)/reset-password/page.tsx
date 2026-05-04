"use client"

import { useState, useActionState, useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Lock, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react"
import toast from "react-hot-toast"
import { resetPassword } from "./actions"

export default function ResetPasswordPage() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  
  const [state, formAction, isPending] = useActionState(resetPassword, null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (state?.error) {
      toast.error(state.error)
    }
    if (state?.success) {
      setSuccess(true)
      toast.success("Password updated successfully")
    }
  }, [state])

  if (!token) {
    return (
      <div className="min-h-screen bg-brand-black flex items-center justify-center p-4">
        <div className="bg-brand-surface1 border border-brand-border p-8 text-center max-w-md w-full">
          <h2 className="font-bebas text-[32px] text-white mb-4">Invalid Link</h2>
          <p className="text-brand-muted mb-8 font-inter">The password reset link is invalid or missing a token.</p>
          <Link href="/forgot-password" title="Request new link" className="text-brand-accent hover:text-white transition-colors uppercase tracking-widest font-bold text-[13px]">Request New Link</Link>
        </div>
      </div>
    )
  }

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
              <ShieldCheck size={14} /> Security Update
            </p>
          </div>

          {success ? (
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
                <h2 className="font-bebas text-[24px] text-white uppercase">Password Updated</h2>
                <p className="text-[14px] text-brand-muted font-inter">
                  Your password has been reset successfully. You can now log in with your new credentials.
                </p>
              </div>
              <Link 
                href="/login" 
                className="block w-full bg-brand-white text-brand-black py-4 font-inter font-bold text-[13px] uppercase tracking-widest hover:bg-brand-accent transition-all"
              >
                Go to Login
              </Link>
            </motion.div>
          ) : (
            <form action={formAction} className="space-y-6">
              <input type="hidden" name="token" value={token} />
              
              <div className="space-y-4">
                <div className="relative">
                  <label className="text-[10px] text-brand-muted uppercase tracking-widest block mb-2 font-bold">New Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted" size={18} />
                    <input 
                      name="password"
                      type="password" 
                      required 
                      disabled={isPending}
                      className="w-full bg-brand-black/50 border border-brand-border py-4 pl-12 pr-4 text-white text-[14px] outline-none focus:border-brand-accent transition-all font-inter" 
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="text-[10px] text-brand-muted uppercase tracking-widest block mb-2 font-bold">Confirm New Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted" size={18} />
                    <input 
                      name="confirmPassword"
                      type="password" 
                      required 
                      disabled={isPending}
                      className="w-full bg-brand-black/50 border border-brand-border py-4 pl-12 pr-4 text-white text-[14px] outline-none focus:border-brand-accent transition-all font-inter" 
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              </div>

              <button 
                disabled={isPending} 
                type="submit" 
                className="w-full group bg-brand-white text-brand-black py-4 font-inter font-bold text-[13px] uppercase tracking-widest hover:bg-brand-accent transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
              >
                {isPending ? "Updating Password..." : (
                  <>
                    Update Password <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </motion.div>

      <div className="absolute bottom-10 left-10 hidden lg:block opacity-20">
        <p className="text-[10px] text-white tracking-[5px] uppercase vertical-text">Security Protocol v2.0</p>
      </div>
    </div>
  )
}
