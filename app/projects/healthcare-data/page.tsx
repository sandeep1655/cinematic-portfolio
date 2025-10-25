import AnimatedSection from '@/components/AnimatedSection'
import Badge from '@/components/Badge'


export const metadata = { title: 'Healthcare Data – Project Details' }


export default function HealthcareProject() {
return (
<div className="space-y-8">
<AnimatedSection direction="left">
<h1 className="title-lg mb-2">Healthcare Data Quality Platform</h1>
<div className="flex gap-2 mb-4">
<Badge>AWS</Badge><Badge>S3</Badge><Badge>Step Functions</Badge><Badge>Glue</Badge><Badge>Great Expectations</Badge>
</div>
<p className="text-white/80 max-w-3xl">
Production-grade medallion architecture: Raw → Quarantine → Curated zones in S3. Step Functions orchestrate
Lambdas and Glue jobs. Great Expectations enforces data quality. An AI agent operates on curated data to flag
anomalies and provide insight summaries.
</p>
</AnimatedSection>


<AnimatedSection direction="right" className="grid md:grid-cols-2 gap-6">
{/* eslint-disable-next-line @next/next/no-img-element */}
<img src="/healthcare-cover.png" alt="Healthcare Data" className="w-full rounded-xl border border-white/10" />
<div className="card p-5">
<h3 className="text-xl font-semibold mb-2">Highlights</h3>
<ul className="list-disc list-inside text-white/80 space-y-1">
<li>Zone promotions with automated quarantine policy.</li>
<li>Observability and error routing patterns.</li>
<li>Glue-based transforms; partitioned curated datasets.</li>
<li>AI agent on curated datasets for anomaly surfacing.</li>
</ul>
</div>
</AnimatedSection>


<AnimatedSection direction="left" className="card p-5">
<h3 className="text-xl font-semibold mb-2">Stack & Flow</h3>
<p className="text-white/80">S3 Zones → Step Functions → Lambdas/Glue → Great Expectations → Curated insight layer.</p>
<div className="mt-4 flex gap-3">
<a className="btn btn-primary" href="https://github.com/sandeep1655" target="_blank" rel="noreferrer">GitHub</a>
<a className="btn" href="/projects">Back to Projects</a>
</div>
</AnimatedSection>
</div>
)
}