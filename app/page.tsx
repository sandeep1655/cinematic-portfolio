'use client';

import ParallaxHero from '@/components/ParallaxHero';
import AnimatedSection from '@/components/AnimatedSection';
import FallingText from '@/components/FallingText';
import ProjectCard from '@/components/ProjectCard';

export default function HomePage() {
  return (
    <div className="space-y-16">
      {/* HERO SECTION */}
      <ParallaxHero />

      {/* SKILLS SNAPSHOT */}
      <AnimatedSection direction="right" className="card p-6">
        <h2 className="title-lg mb-2">What I do</h2>
        <p className="text-white/80">
          • Real-time streaming (Kafka) • ELT/ETL (Python/SQL/DBT) • AWS (S3, Lambda, Step Functions, Glue)
          • Data Quality (Great Expectations) • Observability • Cost/perf optimization • AI agents on curated datasets.
        </p>

        {/* Cinematic Falling Text animation */}
        <div className="mt-10 flex justify-center">
 <FallingText
  text="Delivering advanced Data, AI, Cloud, AWS, and Snowflake solutions that transform raw data into business value."
  highlightWords={["Data", "AI", "Cloud", "AWS", "Snowflake"]}
  trigger="scroll"
  gravity={1.5}
  fontSize="2rem"
/>



        </div>
      </AnimatedSection>

      {/* PROJECTS OVERVIEW */}
      <AnimatedSection direction="left">
        <h2 className="title-lg mb-4">Featured Projects</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <ProjectCard
            slug="weather-kafka"
            title="Weather Kafka Pipeline"
            excerpt="Flask → Kafka streaming, resilient consumers, Snowflake warehousing, and BI dashboards."
            image="/weather-kafka-cover.png"
          />
          <ProjectCard
            slug="healthcare-data"
            title="Healthcare Data Quality Platform"
            excerpt="AWS Medallion (Raw→Quarantine→Curated), Step Functions + Glue, Great Expectations, AI insights."
            image="/healthcare-cover.png"
          />
        </div>
      </AnimatedSection>

      {/* CALL TO ACTION */}
      <AnimatedSection
        direction="right"
        className="card p-6 flex items-center justify-between gap-4"
      >
        <div>
          <h3 className="text-xl font-semibold">Open to roles & collaborations</h3>
          <p className="text-white/70">
            Have a data problem? Let’s solve it with craftsmanship.
          </p>
        </div>
        <a href="/contact" className="btn btn-primary">
          Contact Me
        </a>
      </AnimatedSection>
    </div>
  );
}
