import Link from "next/link"
import { CheckCircle2 } from "lucide-react"

export default function RegisterSuccess() {
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
