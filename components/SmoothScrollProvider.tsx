'use client'
import { ReactNode, useEffect } from 'react'
import Lenis from '@studio-freight/lenis'


export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
useEffect(() => {
const lenis = new Lenis({ smoothWheel: true, lerp: 0.1 })
function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf) }
requestAnimationFrame(raf)
return () => { /* Lenis cleans itself up on unmount */ }
}, [])
return <>{children}</>
}