"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Simulated auth check path mapping for mock 
    if(email === "admin@highgrand.in") {
       router.push("/admin")
       return;
    }
    
    // Simulate real auth call
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    if (res?.error) {
      setError("Invalid email or password.")
      setLoading(false)
    } else {
      router.push("/reseller")
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-brand-black py-20 px-6">
      <div className="max-w-md w-full text-center">
        <h1 className="font-bebas text-[48px] text-brand-white uppercase mb-2">Partner Login</h1>
        <p className="font-inter text-[14px] text-brand-muted mb-10">Access wholesale catalogs and manage orders.</p>
        
        <form onSubmit={handleSubmit} className="bg-brand-surface1 border border-brand-border p-8 flex flex-col gap-5 text-left">
          {error && (
            <div className="bg-[#1A0A0A] border border-brand-error text-brand-error text-[13px] font-inter p-3 text-center">
              {error}
            </div>
          )}
          
          <div className="flex flex-col gap-1.5">
            <label className="font-inter font-medium text-[11px] uppercase tracking-widest text-brand-muted">Email Address</label>
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="bg-brand-black border border-brand-border p-3 text-white text-sm outline-none focus:border-brand-accent" />
          </div>
          
          <div className="flex flex-col gap-1.5 mb-2">
            <div className="flex justify-between items-center">
              <label className="font-inter font-medium text-[11px] uppercase tracking-widest text-brand-muted">Password</label>
            </div>
            <input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="bg-brand-black border border-brand-border p-3 text-white text-sm outline-none focus:border-brand-accent" />
          </div>

          <button disabled={loading} type="submit" className="w-full bg-brand-white text-brand-black py-4 font-inter font-semibold text-[13px] uppercase tracking-widest hover:bg-brand-accent transition-colors disabled:opacity-50">
            {loading ? "Verifying..." : "Secure Login"}
          </button>

          <p className="font-inter text-[13px] text-brand-muted text-center mt-4">
            Not a partner yet? <Link href="/register" className="text-brand-accent hover:text-white underline underline-offset-4">Register Free</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
