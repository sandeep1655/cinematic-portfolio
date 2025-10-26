'use client';

import { useRef, useState, useEffect } from 'react';
import Matter from 'matter-js';
import './FallingText.css';

interface FallingTextProps {
  className?: string;
  text?: string;
  highlightWords?: string[];
  highlightClass?: string;
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
  backgroundColor = 'transparent',
  wireframes = false,
  gravity = 0.7,
  fontSize = '1.5rem',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [engine, setEngine] = useState<Matter.Engine | null>(null);
  const [mouseConstraint, setMouseConstraint] = useState<Matter.MouseConstraint | null>(null);

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

  // ✅ Physics setup
  useEffect(() => {
    const { Engine, Render, World, Bodies, Runner, Body } = Matter;
    const container = containerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const width = containerRect.width;
    const height = containerRect.height;

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

    // ✅ Thicker, safer walls outside the viewport
    const wallThickness = 80;
    const walls = [
      Bodies.rectangle(width / 2, height + wallThickness / 2, width * 2, wallThickness, {
        isStatic: true,
        restitution: 0.8,
      }), // floor
      Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height * 2, {
        isStatic: true,
        restitution: 0.8,
      }), // left wall
      Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height * 2, {
        isStatic: true,
        restitution: 0.8,
      }), // right wall
      Bodies.rectangle(width / 2, -wallThickness / 2, width * 2, wallThickness, {
        isStatic: true,
        restitution: 0.8,
      }), // top
    ];

    const wordSpans = textRef.current!.querySelectorAll('.word');
    const wordBodies = Array.from(wordSpans).map((elem, i) => {
      const el = elem as HTMLElement;
      const textWidth = el.offsetWidth || 60;
      const textHeight = el.offsetHeight || 30;
      const x = (width / (wordSpans.length + 1)) * (i + 1);
      const y = height / 3 + Math.random() * 40;

      const body = Bodies.rectangle(x, y, textWidth, textHeight, {
        render: { fillStyle: 'transparent' },
        restitution: 0.9,
        frictionAir: 0.02,
        friction: 0.2,
      });

      Body.setVelocity(body, { x: (Math.random() - 0.5) * 3, y: (Math.random() - 0.5) * 2 });
      Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.08);
      return { elem: el, body, textWidth, textHeight };
    });

    World.add(engine.world, [...walls, ...wordBodies.map((wb) => wb.body)]);

    const runner = Runner.create();
    Runner.run(runner, engine);
    Render.run(render);

    // ✅ Clamp to container bounds
    const update = () => {
      wordBodies.forEach(({ body, elem, textWidth, textHeight }) => {
        const { x, y } = body.position;
        const angle = body.angle;

        // Clamp positions so they stay visible in viewport
        const clampedX = Math.max(textWidth / 2, Math.min(width - textWidth / 2, x));
        const clampedY = Math.max(textHeight / 2, Math.min(height - textHeight / 2, y));

        // If body exceeds bounds, teleport slightly back inside
        if (x !== clampedX || y !== clampedY) {
          Matter.Body.setPosition(body, { x: clampedX, y: clampedY });
          Matter.Body.setVelocity(body, { x: 0, y: 0 });
        }

        elem.style.position = 'absolute';
        elem.style.left = `${clampedX}px`;
        elem.style.top = `${clampedY}px`;
        elem.style.transform = `translate(-50%, -50%) rotate(${angle}rad)`;
      });
      requestAnimationFrame(update);
    };
    update();

    setEngine(engine);

    return () => {
      Render.stop(render);
      Runner.stop(runner);
      if (render.canvas && canvasContainerRef.current) {
        canvasContainerRef.current.removeChild(render.canvas);
      }
      World.clear(engine.world, false);
      Engine.clear(engine);
    };
  }, [backgroundColor, wireframes, gravity]);

  // ✅ Mouse + Touch interaction
  useEffect(() => {
    if (!engine) return;
    const { Mouse, MouseConstraint, World } = Matter;
    const mouse = Mouse.create(containerRef.current!);

    const mConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: 0.3, render: { visible: false } },
    });

    const addConstraint = () => {
      if (!mouseConstraint) {
        World.add(engine.world, mConstraint);
        setMouseConstraint(mConstraint);
      }
    };
    const removeConstraint = () => {
      if (mouseConstraint) {
        (mouseConstraint.constraint.bodyB as any) = null;
        (mouseConstraint.mouse as any).button = -1;
        World.remove(engine.world, mConstraint);
        setMouseConstraint(null);
      }
    };

    const handleTouchStart = addConstraint;
    const handleTouchEnd = removeConstraint;
    const handleScroll = removeConstraint;

    const container = containerRef.current;
    container?.addEventListener('mouseenter', addConstraint);
    container?.addEventListener('mouseleave', removeConstraint);
    container?.addEventListener('touchstart', handleTouchStart);
    container?.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('scroll', handleScroll);

    return () => {
      container?.removeEventListener('mouseenter', addConstraint);
      container?.removeEventListener('mouseleave', removeConstraint);
      container?.removeEventListener('touchstart', handleTouchStart);
      container?.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('scroll', handleScroll);
      if (mouseConstraint) World.remove(engine.world, mConstraint);
    };
  }, [engine, mouseConstraint]);

  return (
    <div ref={containerRef} className={`falling-text-container ${className}`}>
      <div ref={textRef} className="falling-text-target" style={{ fontSize, lineHeight: 1.4 }} />
      <div ref={canvasContainerRef} className="falling-text-canvas" />
    </div>
  );
};

export default FallingText;
