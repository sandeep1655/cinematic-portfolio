import AnimatedSection from '@/components/AnimatedSection'


export const metadata = { title: 'Contact – Sandeep Thatikonda' }


export default function ContactPage() {
return (
<AnimatedSection direction="left" className="max-w-2xl mx-auto card p-8">
<h1 className="title-lg mb-2">Contact</h1>
<p className="text-white/80 mb-6">Let’s build something great together.</p>
<div className="space-y-3 text-white/90">
<p><span className="text-white/60">Email:</span> <a className="hover:text-primary" href="mailto:sthatikonda666@gmail.com">sthatikonda666@gmail.com</a></p>
<p><span className="text-white/60">GitHub:</span> <a className="hover:text-primary" href="https://github.com/sandeep1655" target="_blank" rel="noreferrer">github.com/sandeep1655</a></p>
<p><span className="text-white/60">Phone:</span> <a className="hover:text-primary" href="tel:+16143779873">+1 614-377-9873</a></p>
</div>
</AnimatedSection>
)
}