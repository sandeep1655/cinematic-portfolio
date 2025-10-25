import AnimatedSection from '@/components/AnimatedSection'
import ProjectCard from '@/components/ProjectCard'


export default function ProjectsPage() {
return (
<div className="space-y-8">
<AnimatedSection direction="left">
<h1 className="title-lg mb-2">Projects</h1>
<p className="text-white/80">A curated selection of my work.</p>
</AnimatedSection>


<div className="grid md:grid-cols-2 gap-6">
<AnimatedSection direction="left">
<ProjectCard
slug="weather-kafka"
title="Weather Kafka Pipeline"
excerpt="Producer/consumer microservices, schema evolution, dead-letter topic, and curated marts."
image="/weather-kafka-cover.png"
/>
</AnimatedSection>
<AnimatedSection direction="right">
<ProjectCard
slug="healthcare-data"
title="Healthcare Data Quality Platform"
excerpt="S3 medallion zones, Step Functions orchestration, Glue transforms, Great Expectations checks."
image="/healthcare-cover.png"
/>
</AnimatedSection>
</div>
</div>
)
}