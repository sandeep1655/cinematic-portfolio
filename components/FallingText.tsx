'use client';

import { useRef, useState, useEffect } from 'react';
import Matter from 'matter-js';
import './FallingText.css';

interface FallingTextProps {
  className?: string;
  text?: string;
  highlightWords?: string[];
  highlightClass?: string;
  trigger?: 'auto' | 'scroll' | 'hover' | 'click';
  backgroundColor?: string;
  wireframes?: boolean;
  gravity?: number;
  fontSize?: string;
}

const FallingText: React.FC<FallingTextProps> = ({
  className = '',
  text = '',
  highlightWords = [],
  highlightClass = 'highlighted',
  trigger = 'auto',
  backgroundColor = 'transparent',
  wireframes = false,
  gravity = 0.7, // ✅ tuned for smoother, non-jerky fall
  fontSize = '1.5rem',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [effectStarted, setEffectStarted] = useState(false);

  // ✅ Highlight words
  useEffect(() => {
    if (!textRef.current) return;
    const words = text.split(' ');
    const newHTML = words
      .map((word) => {
        const isHighlighted = highlightWords.some((hw) =>
          word.toLowerCase().includes(hw.toLowerCase())
        );
        return `<span class="word ${isHighlighted ? highlightClass : ''}">${word}</span>`;
      })
      .join(' ');
    textRef.current.innerHTML = newHTML;
  }, [text, highlightWords, highlightClass]);

  // ✅ Trigger control
  useEffect(() => {
    if (trigger === 'auto') {
      setEffectStarted(true);
      return;
    }
    if (trigger === 'scroll' && containerRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setEffectStarted(true);
            observer.disconnect();
          }
        },
        { threshold: 0.2 }
      );
      observer.observe(containerRef.current);
      return () => observer.disconnect();
    }
  }, [trigger]);

  // ✅ Physics setup
  useEffect(() => {
    if (!effectStarted) return;

    const timeout = setTimeout(() => {
      const { Engine, Render, World, Bodies, Runner, Body } = Matter;

      const containerRect = containerRef.current!.getBoundingClientRect();
      const width = containerRect.width;
      const height = containerRect.height;
      if (width <= 0 || height <= 0) return;

      const engine = Engine.create();
      engine.world.gravity.y = gravity;

      const render = Render.create({
        element: canvasContainerRef.current!,
        engine,
        options: {
          width,
          height,
          background: backgroundColor,
          wireframes,
        },
      });

      // ✅ Boundaries inside the box
      const wallThickness = 20;
      const walls = [
        Bodies.rectangle(width / 2, height - wallThickness / 2, width, wallThickness, {
          isStatic: true,
          restitution: 0.9,
        }),
        Bodies.rectangle(wallThickness / 2, height / 2, wallThickness, height, {
          isStatic: true,
        }),
        Bodies.rectangle(width - wallThickness / 2, height / 2, wallThickness, height, {
          isStatic: true,
        }),
        Bodies.rectangle(width / 2, wallThickness / 2, width, wallThickness, {
          isStatic: true,
        }),
      ];

      // ✅ Create each word as a physics body
      const wordSpans = textRef.current!.querySelectorAll('.word');
      const wordBodies = Array.from(wordSpans).map((elem, i) => {
        const el = elem as HTMLElement;
        const textWidth = el.offsetWidth || 60;
        const textHeight = el.offsetHeight || 30;

        // Spawn mid-screen for guaranteed visibility
        const x = (width / (wordSpans.length + 1)) * (i + 1);
        const y = height / 3 + Math.random() * 40;

        const body = Bodies.rectangle(x, y, textWidth, textHeight, {
          render: { fillStyle: 'transparent' },
          restitution: 0.9,
          frictionAir: 0.015,
          friction: 0.2,
        });

        Body.setVelocity(body, {
          x: (Math.random() - 0.5) * 3,
          y: (Math.random() - 0.5) * 2,
        });
        Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.08);
        return { elem: el, body };
      });

      // ✅ Add all physics objects
      World.add(engine.world, [...walls, ...wordBodies.map((wb) => wb.body)]);

      const runner = Runner.create();
      Runner.run(runner, engine);
      Render.run(render);

      // ✅ Animate DOM sync
      const update = () => {
        wordBodies.forEach(({ body, elem }) => {
          const { x, y } = body.position;
          const angle = body.angle;
          elem.style.position = 'absolute';
          elem.style.left = `${x}px`;
          elem.style.top = `${y}px`;
          elem.style.transform = `translate(-50%, -50%) rotate(${angle}rad)`;
        });
        requestAnimationFrame(update);
      };
      update();

      // ✅ Cleanup
      return () => {
        Render.stop(render);
        Runner.stop(runner);
        if (render.canvas && canvasContainerRef.current) {
          canvasContainerRef.current.removeChild(render.canvas);
        }
        World.clear(engine.world, false);
        Engine.clear(engine);
      };
    }, 200); // slight delay so DOM spans render

    return () => clearTimeout(timeout);
  }, [effectStarted, gravity, wireframes, backgroundColor]);

  const handleTrigger = () => {
    if (!effectStarted && (trigger === 'click' || trigger === 'hover')) setEffectStarted(true);
  };

  return (
    <div
      ref={containerRef}
      className={`falling-text-container ${className}`}
      onClick={trigger === 'click' ? handleTrigger : undefined}
      onMouseEnter={trigger === 'hover' ? handleTrigger : undefined}
    >
      <div
        ref={textRef}
        className="falling-text-target"
        style={{ fontSize, lineHeight: 1.4 }}
      />
      <div ref={canvasContainerRef} className="falling-text-canvas" />
    </div>
  );
};

export default FallingText;
