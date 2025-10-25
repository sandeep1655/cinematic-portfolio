'use client'
import { motion, useAnimation } from 'framer-motion'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'


/** Slides content in from left or right when scrolled into view */
export default function AnimatedSection({ children, direction = 'left', className = '' }: { children: React.ReactNode, direction?: 'left'|'right', className?: string }) {
const controls = useAnimation()
const { ref, inView } = useInView({ threshold: 0.18, triggerOnce: true })


useEffect(() => { if (inView) controls.start({ x: 0, opacity: 1 }) }, [inView, controls])
const initialX = direction === 'left' ? -60 : 60


return (
<motion.section ref={ref} initial={{ x: initialX, opacity: 0 }} animate={controls} transition={{ type: 'spring', stiffness: 80, damping: 16 }} className={className}>
{children}
</motion.section>
)
}