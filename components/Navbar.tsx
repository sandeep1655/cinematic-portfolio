'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'


export default function Navbar() {
return (
<motion.header
initial={{ y: -24, opacity: 0 }}
animate={{ y: 0, opacity: 1 }}
transition={{ duration: 0.6 }}
className="sticky top-0 z-40 backdrop-blur bg-black/40 border-b border-white/10"
>
<div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
<Link href="/" className="font-semibold tracking-wider text-white">
<span className="text-primary">◼</span> Sandeep Thatikonda
</Link>
<nav className="flex items-center gap-6 text-sm">
<Link href="/" className="hover:text-primary">Home</Link>
<Link href="/projects" className="hover:text-primary">Projects</Link>
<Link href="/contact" className="hover:text-primary">Contact</Link>
</nav>
</div>
</motion.header>
)
}