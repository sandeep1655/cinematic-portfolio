import AnimatedSection from '@/components/AnimatedSection'
import Badge from '@/components/Badge'


export const metadata = { title: 'Weather Kafka – Project Details' }


export default function WeatherKafkaProject() {
return (
<div className="space-y-8">
<AnimatedSection direction="left">
<h1 className="title-lg mb-2">Weather Kafka Pipeline</h1>
<div className="flex gap-2 mb-4">
<Badge>Kafka</Badge><Badge>Flask</Badge><Badge>Docker</Badge><Badge>Snowflake</Badge><Badge>Power BI</Badge>
</div>
<p className="text-white/80 max-w-3xl">
An end-to-end streaming pipeline that ingests live weather from a Flask producer into Kafka topics. Consumers
validate, enrich, and upsert into Snowflake. BI dashboards provide near real-time insight.
</p>
</AnimatedSection>


<AnimatedSection direction="right" className="grid md:grid-cols-2 gap-6">
{/* eslint-disable-next-line @next/next/no-img-element */}
<img src="/weather-kafka-cover.png" alt="Weather Kafka" className="w-full rounded-xl border border-white/10" />
<div className="card p-5">
<h3 className="text-xl font-semibold mb-2">Highlights</h3>
<ul className="list-disc list-inside text-white/80 space-y-1">
<li>Idempotent consumers with retries and dead-letter topics.</li>
<li>Schema evolution strategy, partitioning for scale.</li>
<li>Dockerized local dev via Compose; CI on push to main.</li>
<li>Snowflake staging → curated dimensional models.</li>
<li>Structured logs, metrics hooks for observability.</li>
</ul>
</div>
</AnimatedSection>


<AnimatedSection direction="left" className="card p-5">
<h3 className="text-xl font-semibold mb-2">Stack & Flow</h3>
<p className="text-white/80">Flask (producer) → Kafka → Python consumers → Snowflake → Power BI dashboards.</p>
<div className="mt-4 flex gap-3">
<a className="btn btn-primary" href="https://github.com/sandeep1655" target="_blank" rel="noreferrer">GitHub</a>
<a className="btn" href="/projects">Back to Projects</a>
</div>
</AnimatedSection>
</div>
)
}