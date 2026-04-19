"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useInView } from "framer-motion"

const Counter = ({ to, suffix = "", duration = 1.8 }: { to: number, suffix?: string, duration?: number }) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return

    let start = 0
    const end = parseInt(to.toString().substring(0, 3))
    const incrementTime = (duration / end) * 1000

    const timer = setInterval(() => {
      start += 1
      setCount(start)
      if (start === end) clearInterval(timer)
    }, incrementTime)

    return () => clearInterval(timer)
  }, [inView, to, duration])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

export default function StatsStrip() {
  const stats = [
    { value: 650, suffix: "+", label: "Active Resellers" },
    { value: 120, suffix: "+", label: "Cities Reached" },
    { value: 25, suffix: "+", label: "Current Styles" },
    { value: 12, suffix: "yrs", label: "Manufacturing" },
  ]

  return (
    <div className="bg-brand-surface1 border-y border-brand-border py-12">
      <div className="default-container grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 divide-x-0 md:divide-x divide-brand-border">
        {stats.map((stat, i) => (
          <div key={i} className="flex flex-col items-center justify-center text-center px-4">
            <h3 className="font-bebas text-[48px] md:text-[64px] text-brand-cream leading-none tracking-tight">
              <Counter to={stat.value} suffix={stat.suffix} />
            </h3>
            <p className="font-inter font-normal text-[14px] text-brand-muted mt-1 tracking-[0.05em]">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
