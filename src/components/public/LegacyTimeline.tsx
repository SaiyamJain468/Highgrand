"use client"

import { useRef } from "react"
import { motion, useScroll, useSpring, useTransform, useInView } from "framer-motion"
import TextReveal from "./TextReveal"

const milestones = [
  { 
    date: "OCT 2013", 
    title: "The First Stitch", 
    desc: " humble beginnings in a single-room workshop in Gandhi Nagar with basic manual machines and a vision for quality." 
  },
  { 
    date: "JUNE 2014", 
    title: "The Yarn Quest", 
    desc: "Traveled across textile hubs to find specialized yarn that wouldn't break under industrial tension. Authenticity started here." 
  },
  { 
    date: "MAR 2015", 
    title: "First Export Sample", 
    desc: "A milestone that turned into a masterclass. Failed international standards, which forced us to obsess over precision." 
  },
  { 
    date: "NOV 2016", 
    title: "The Shrinkage Crisis", 
    desc: "A 500-unit batch failed post-wash. A crushing financial loss that led to our trademark pre-shrinking process." 
  },
  { 
    date: "FEB 2017", 
    title: "GSM Obsession", 
    desc: "Developing a custom knit. We spent 11 months chasing the perfect 220 GSM heavyweight 'hand-feel' that defines us today." 
  },
  { 
    date: "AUG 2018", 
    title: "The 'Deep Black' Formula", 
    desc: "Mastered a reactive dyeing process. Our black garments stay pitch black after 50+ washes. No fading, no compromise." 
  },
  { 
    date: "MAY 2019", 
    title: "In-House QC Lab", 
    desc: "Stopped outsourcing quality. Every inch of fabric is now inspected by hand under specialized industrial lighting." 
  },
  { 
    date: "OCT 2020", 
    title: "The Supply Chain Wall", 
    desc: "Global shipping collapsed. We stayed alive by knitting and dyeing locally in Delhi, supporting Indian craft." 
  },
  { 
    date: "MAR 2021", 
    title: "Boxy Fit Revolution", 
    desc: "Redefined the Indian 'Oversized' silhouette. Perfected the drop-shoulder ratio that independent brands now crave." 
  },
  { 
    date: "JULY 2022", 
    title: "Industrial Scale", 
    desc: "Integrated automatic cutting machinery to scale from hundreds to tens of thousands of units without losing precision." 
  },
  { 
    date: "NOV 2023", 
    title: "The Standard Lab", 
    desc: "Highgrand becomes the benchmark for 'Export Quality' blanks in North India, powering 650+ premium streetwear labels." 
  },
  { 
    date: "PRESENT", 
    title: "The Secret Engine", 
    desc: "Powering the next generation of Indian fashion. 100% In-House. 10 Years of Grit. Zero Shortcuts." 
  }
]

export default function LegacyTimeline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  })

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <div ref={containerRef} className="relative py-24 md:py-40">
      {/* The Master Thread Spine */}
      <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-brand-border/20 md:-translate-x-1/2">
        <motion.div 
          style={{ scaleY, originY: 0 }}
          className="absolute inset-0 bg-brand-accent shadow-[0_0_20px_rgba(200,169,110,0.8)]"
        />
      </div>

      <div className="default-container relative">
        <div className="flex flex-col gap-24 md:gap-40">
          {milestones.map((item, i) => (
            <TimelineItem key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </div>
  )
}

function TimelineItem({ item, index }: { item: typeof milestones[0], index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-10% 0px -20% 0px" })
  const isEven = index % 2 === 0

  return (
    <div ref={ref} className="relative flex flex-col md:flex-row items-start md:items-center justify-between">
      {/* Year/Month Indicator (The Star Node) */}
      <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-brand-black border-2 border-brand-accent md:-translate-x-1/2 z-10">
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 2.5, opacity: 0.15 } : {}}
          className="absolute inset-0 bg-brand-accent rounded-full blur-md"
        />
        <motion.div 
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
          className="w-full h-full bg-brand-accent rounded-full"
        />
      </div>

      {/* Content wrapper */}
      <div className={`w-full md:w-[45%] pl-16 md:pl-0 ${isEven ? 'md:pr-12 md:text-right' : 'md:ml-auto md:pl-12'}`}>
        <motion.div
          initial={{ opacity: 0, x: isEven ? -40 : 40, filter: "blur(10px)" }}
          animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <span className="font-bebas text-[28px] md:text-[36px] text-brand-accent leading-none block mb-2">{item.date}</span>
          <h3 className="font-bebas text-[32px] md:text-[48px] text-brand-white uppercase leading-none mb-6">{item.title}</h3>
          <p className="font-inter text-[14px] md:text-[16px] text-brand-muted leading-relaxed">
            {item.desc}
          </p>
        </motion.div>
      </div>
      
      {/* Mobile-only spacer line */}
      <div className="md:hidden h-24" />
    </div>
  )
}
