'use client'
import { motion, useScroll, useTransform } from 'framer-motion'


export default function ParallaxHero() {
const { scrollY } = useScroll()
const yTitle = useTransform(scrollY, [0, 400], [0, -80])
const yImage = useTransform(scrollY, [0, 400], [0, -40])
const opacity = useTransform(scrollY, [0, 300], [1, 0.5])


return (
<div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-black/60 to-black/20">
<motion.div style={{ y: yTitle, opacity }} className="p-10 sm:p-16">
<div className="flex items-center gap-3 mb-4">
<span className="badge">DATA ENGINEER</span>
<span className="badge">AI • Cloud</span>
<span className="badge">AWS</span>
</div>
<h1 className="title-xl">
Hi, I’m <span className="text-primary">Sandeep Thatikonda</span> — I build
<span className="text-primary"> scalable</span> data platforms & AI pipelines.
</h1>
<p className="mt-4 text-white/80 max-w-prose">
Real-time streaming, medallion data lakes, Snowflake/DBT, orchestration, and data quality — with
cinematic UX inspired by Apple.
</p>
</motion.div>
<motion.div style={{ y: yImage }} className="px-10 pb-10 sm:px-16 sm:pb-16">
{/* eslint-disable-next-line @next/next/no-img-element */}
<img src="/profile.jpg" alt="Sandeep profile" className="w-40 h-40 sm:w-52 sm:h-52 rounded-3xl object-cover border border-white/10 shadow-glow" />
</motion.div>
</div>
)
}