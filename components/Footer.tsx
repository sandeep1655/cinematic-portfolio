export default function Footer() {
return (
<footer className="border-t border-white/10 bg-black/40">
<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-sm text-white/70 flex flex-col sm:flex-row gap-2 items-center justify-between">
<p>© {new Date().getFullYear()} Sandeep Thatikonda</p>
<p className="text-white/50">Built with Next.js • Tailwind • Framer Motion • Lenis</p>
</div>
</footer>
)
}