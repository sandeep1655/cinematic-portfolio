'use client';

import { useRef, useState, useEffect } from 'react';
import Matter from 'matter-js';
import './FallingText.css';

// ✅ Strongly typed props for TypeScript
interface FallingTextProps {
  className?: string;
  text?: string;
  highlightWords?: string[];
  highlightClass?: string;
  trigger?: 'auto' | 'scroll' | 'hover' | 'click';
  backgroundColor?: string;
  wireframes?: boolean;
  gravity?: number;
  mouseConstraintStiffness?: number;
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
  gravity = 1.1,
  mouseConstraintStiffness = 0.3,
  fontSize = '1rem',
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

  // ✅ Trigger behavior
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

  // ✅ Matter.js animation
  useEffect(() => {
    if (!effectStarted) return;

    const { Engine, Render, World, Bodies, Runner, Mouse, MouseConstraint, Body } = Matter;

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

    // ✅ Walls (inside the container)
    const wallThickness = 20;
    const walls = [
      Bodies.rectangle(width / 2, height - wallThickness / 2, width, wallThickness, {
        isStatic: true,
        restitution: 0.8,
        friction: 0.3,
      }),
      Bodies.rectangle(wallThickness / 2, height / 2, wallThickness, height, {
        isStatic: true,
        restitution: 0.8,
        friction: 0.3,
      }),
      Bodies.rectangle(width - wallThickness / 2, height / 2, wallThickness, height, {
        isStatic: true,
        restitution: 0.8,
        friction: 0.3,
      }),
      Bodies.rectangle(width / 2, wallThickness / 2, width, wallThickness, {
        isStatic: true,
        restitution: 0.8,
        friction: 0.3,
      }),
    ];

    // ✅ Convert NodeList safely
    const wordSpans = textRef.current!.querySelectorAll('.word');
    const wordBodies = Array.from(wordSpans).map((elem) => {
      const el = elem as HTMLElement;
      const rect = el.getBoundingClientRect();
      const x = rect.left - containerRect.left + rect.width / 2;
      const y = rect.top - containerRect.top + rect.height / 2;

      const body = Bodies.rectangle(x, y, rect.width, rect.height, {
        render: { fillStyle: 'transparent' },
        restitution: 0.8,
        frictionAir: 0.02,
        friction: 0.3,
      });

      Body.setVelocity(body, {
        x: (Math.random() - 0.5) * 5,
        y: Math.random() * -3,
      });
      Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.1);
      return { elem: el, body };
    });

    // ✅ Mouse interactivity
    const mouse = Mouse.create(containerRef.current!);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: mouseConstraintStiffness, render: { visible: false } },
    });
    render.mouse = mouse;

    // ✅ Add to world
    World.add(engine.world, [...walls, mouseConstraint, ...wordBodies.map((wb) => wb.body)]);

    const runner = Runner.create();
    Runner.run(runner, engine);
    Render.run(render);

    // ✅ Update loop
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
  }, [effectStarted, gravity, wireframes, backgroundColor, mouseConstraintStiffness]);

  // ✅ Manual trigger
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
