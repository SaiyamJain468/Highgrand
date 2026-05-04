"use client"
 
import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react"
import toast from "react-hot-toast"
 
export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [redirecting, setRedirecting] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (loading || redirecting) return
    setLoading(true)
    setError("")
    const loadingToast = toast.loading("Verifying credentials...")

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false
    })

    if (res?.error) {
      const errorMsg = "The email or password you entered is incorrect."
      setError(errorMsg)
      toast.error(errorMsg, { id: loadingToast })
      setLoading(false)
    } else {
      toast.success("Login successful", { id: loadingToast })
      setRedirecting(true)
      
      // Redirect based on role
      const sessionResponse = await fetch('/api/auth/session')
      const session = await sessionResponse.json()
      
      setTimeout(async () => {
        if (session?.user?.role === "ADMIN") {
          router.push("/admin/products")
        } else {
          router.push("/")
        }
        router.refresh()
      }, 500)
    }
  }

  return (
    <div className="min-h-screen bg-brand-black flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background elements */}
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
              <ShieldCheck size={14} /> Portal Access
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <label className="text-[10px] text-brand-muted uppercase tracking-widest block mb-2 font-bold">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted" size={18} />
                  <input 
                    type="email" 
                    required 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    disabled={loading || redirecting}
                    className="w-full bg-brand-black/50 border border-brand-border py-4 pl-12 pr-4 text-white text-[14px] outline-none focus:border-brand-accent transition-all font-inter" 
                    placeholder="name@business.com"
                  />
                </div>
              </div>

              <div className="relative">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-[10px] text-brand-muted uppercase tracking-widest block font-bold">Password</label>
                  <Link href="/forgot-password" title="Forgot password?" className="text-[10px] text-brand-accent hover:text-white uppercase tracking-widest font-bold transition-colors">Forgot?</Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted" size={18} />
                  <input 
                    type="password" 
                    required 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    disabled={loading || redirecting}
                    className="w-full bg-brand-black/50 border border-brand-border py-4 pl-12 pr-4 text-white text-[14px] outline-none focus:border-brand-accent transition-all font-inter" 
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            {error && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-500 text-[12px] text-center bg-red-500/10 py-2 border border-red-500/20"
              >
                {error}
              </motion.p>
            )}

            <button 
              disabled={loading || redirecting} 
              type="submit" 
              className="w-full group bg-brand-white text-brand-black py-4 font-inter font-bold text-[13px] uppercase tracking-widest hover:bg-brand-accent transition-all flex items-center justify-center gap-2 mt-2"
            >
              {loading || redirecting ? "Authenticating..." : (
                <>
                  Secure Access <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            <div className="text-center pt-4 flex flex-col gap-4">
              <p className="text-[12px] text-brand-muted">
                Authorized access only. For support, contact 
                <a href="mailto:info@highgrand.in" className="text-white hover:text-brand-accent ml-1 transition-colors underline underline-offset-4">info@highgrand.in</a>.
              </p>
              
              <div className="pt-4 border-t border-brand-border/30">
                <p className="text-[12px] text-brand-muted">
                  New reseller? <Link href="/register" title="Apply for wholesale" className="text-brand-accent hover:text-white transition-colors underline underline-offset-4 ml-1">Apply for Access</Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </motion.div>

      {/* Industrial aesthetic details */}
      <div className="absolute bottom-10 left-10 hidden lg:block opacity-20">
        <p className="text-[10px] text-white tracking-[5px] uppercase vertical-text">Internal System v2.0</p>
      </div>
    </div>
  )
}
