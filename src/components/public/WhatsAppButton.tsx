"use client"

import { MessageCircle } from "lucide-react"

export default function WhatsAppButton() {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210"
  const message = encodeURIComponent("Hi, I'm interested in partnering with Highgrand.")

  return (
    <a 
      href={`https://wa.me/${number}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-brand-whatsapp text-white rounded-full shadow-[0_4px_24px_rgba(37,211,102,0.25)] hover:scale-110 transition-transform duration-300"
    >
      <MessageCircle size={28} />
      <span className="absolute inset-0 rounded-full border-2 border-brand-whatsapp animate-pulse-ring before:content-['']"></span>
    </a>
  )
}
