import Link from 'next/link'


export default function ProjectCard({ slug, title, excerpt, image }: { slug: string, title: string, excerpt: string, image: string }) {
return (
<Link href={`/projects/${slug}`} className="group card overflow-hidden block tilt">
<div className="aspect-video w-full bg-black/50">
{/* eslint-disable-next-line @next/next/no-img-element */}
<img src={image} alt={title} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition" />
</div>
<div className="p-5">
<h3 className="text-lg font-semibold mb-1 group-hover:text-primary transition">{title}</h3>
<p className="text-white/70 text-sm">{excerpt}</p>
<div className="mt-4">
<span className="btn btn-primary text-sm">View details →</span>
</div>
</div>
</Link>
)
}