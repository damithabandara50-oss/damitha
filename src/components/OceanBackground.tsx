import React, { useEffect, useRef } from 'react';

class Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.radius = 0;
    this.maxRadius = 100 + Math.random() * 50;
    this.alpha = 0.5;
  }

  update() {
    this.radius += 2;
    this.alpha -= 0.01;
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.alpha <= 0) return;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(0, 240, 255, ${this.alpha * 0.5})`;
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}

class Boid {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  maxSpeed: number;
  maxForce: number;
  layer: 'bg' | 'mid' | 'fg';

  constructor(x: number, y: number, layer: 'bg' | 'mid' | 'fg') {
    this.x = x;
    this.y = y;
    this.layer = layer;
    
    if (layer === 'bg') {
      this.radius = 15 + Math.random() * 10;
      this.color = 'rgba(0, 50, 100, 0.3)';
      this.maxSpeed = 0.2;
      this.maxForce = 0.005;
    } else if (layer === 'mid') {
      this.radius = 4 + Math.random() * 2;
      this.color = 'rgba(0, 200, 255, 0.6)';
      this.maxSpeed = 0.8;
      this.maxForce = 0.02;
    } else {
      this.radius = 8 + Math.random() * 4;
      this.color = `hsl(${Math.random() * 60 + 10}, 100%, 60%)`; // Orange/Yellow
      this.maxSpeed = 1.2;
      this.maxForce = 0.05;
    }
    
    const angle = Math.random() * Math.PI * 2;
    this.vx = Math.cos(angle) * this.maxSpeed;
    this.vy = Math.sin(angle) * this.maxSpeed;
  }

  update(boids: Boid[], mouseX: number, mouseY: number, width: number, height: number) {
    // Basic flocking (separation, alignment, cohesion)
    let sepX = 0, sepY = 0, sepCount = 0;
    let aliX = 0, aliY = 0, aliCount = 0;
    let cohX = 0, cohY = 0, cohCount = 0;
    
    const perceptionRadius = this.layer === 'bg' ? 100 : 50;
    
    for (const other of boids) {
      if (other === this || other.layer !== this.layer) continue;
      
      const dx = this.x - other.x;
      const dy = this.y - other.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist > 0 && dist < perceptionRadius) {
        // Separation
        if (dist < perceptionRadius / 2) {
          sepX += dx / dist;
          sepY += dy / dist;
          sepCount++;
        }
        // Alignment
        aliX += other.vx;
        aliY += other.vy;
        aliCount++;
        // Cohesion
        cohX += other.x;
        cohY += other.y;
        cohCount++;
      }
    }
    
    let ax = 0, ay = 0;
    
    if (sepCount > 0) {
      sepX /= sepCount; sepY /= sepCount;
      const len = Math.sqrt(sepX * sepX + sepY * sepY);
      if (len > 0) {
        sepX = (sepX / len) * this.maxSpeed - this.vx;
        sepY = (sepY / len) * this.maxSpeed - this.vy;
        ax += sepX * 1.5; ay += sepY * 1.5;
      }
    }
    if (aliCount > 0) {
      aliX /= aliCount; aliY /= aliCount;
      const len = Math.sqrt(aliX * aliX + aliY * aliY);
      if (len > 0) {
        aliX = (aliX / len) * this.maxSpeed - this.vx;
        aliY = (aliY / len) * this.maxSpeed - this.vy;
        ax += aliX * 1.0; ay += aliY * 1.0;
      }
    }
    if (cohCount > 0) {
      cohX /= cohCount; cohY /= cohCount;
      const dx = cohX - this.x; const dy = cohY - this.y;
      const len = Math.sqrt(dx * dx + dy * dy);
      if (len > 0) {
        cohX = (dx / len) * this.maxSpeed - this.vx;
        cohY = (dy / len) * this.maxSpeed - this.vy;
        ax += cohX * 1.0; ay += cohY * 1.0;
      }
    }
    
    // Mouse avoidance (scatter)
    const mdx = this.x - mouseX;
    const mdy = this.y - mouseY;
    const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
    if (mDist < 150) {
      const force = (150 - mDist) / 150;
      ax += (mdx / mDist) * force * this.maxSpeed * 2;
      ay += (mdy / mDist) * force * this.maxSpeed * 2;
    }
    
    // Limit acceleration
    const aLen = Math.sqrt(ax * ax + ay * ay);
    if (aLen > this.maxForce) {
      ax = (ax / aLen) * this.maxForce;
      ay = (ay / aLen) * this.maxForce;
    }
    
    this.vx += ax;
    this.vy += ay;
    
    // Limit speed
    const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
    if (speed > this.maxSpeed) {
      this.vx = (this.vx / speed) * this.maxSpeed;
      this.vy = (this.vy / speed) * this.maxSpeed;
    }
    
    this.x += this.vx;
    this.y += this.vy;
    
    // Wrap around
    if (this.x < -50) this.x = width + 50;
    if (this.x > width + 50) this.x = -50;
    if (this.y < -50) this.y = height + 50;
    if (this.y > height + 50) this.y = -50;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(Math.atan2(this.vy, this.vx));
    
    ctx.fillStyle = this.color;
    ctx.beginPath();
    if (this.layer === 'bg') {
      // Whale shape
      ctx.ellipse(0, 0, this.radius * 2, this.radius, 0, 0, Math.PI * 2);
      ctx.moveTo(-this.radius * 2, 0);
      ctx.lineTo(-this.radius * 3, -this.radius);
      ctx.lineTo(-this.radius * 3, this.radius);
      ctx.fill();
    } else {
      // Fish shape
      ctx.moveTo(this.radius, 0);
      ctx.lineTo(-this.radius, this.radius / 2);
      ctx.lineTo(-this.radius, -this.radius / 2);
      ctx.fill();
      // Tail
      ctx.beginPath();
      ctx.moveTo(-this.radius, 0);
      ctx.lineTo(-this.radius * 1.5, this.radius / 2);
      ctx.lineTo(-this.radius * 1.5, -this.radius / 2);
      ctx.fill();
    }
    
    ctx.restore();
  }
}

class Bubble {
  x: number;
  y: number;
  radius: number;
  speed: number;
  wobble: number;
  wobbleSpeed: number;

  constructor(width: number, height: number) {
    this.x = Math.random() * width;
    this.y = height + Math.random() * 100;
    this.radius = Math.random() * 3 + 1;
    this.speed = Math.random() * 1 + 0.5;
    this.wobble = Math.random() * Math.PI * 2;
    this.wobbleSpeed = Math.random() * 0.05 + 0.02;
  }

  update(height: number) {
    this.y -= this.speed;
    this.wobble += this.wobbleSpeed;
    this.x += Math.sin(this.wobble) * 0.5;
    
    if (this.y < -10) {
      this.y = height + 10;
      this.radius = Math.random() * 3 + 1;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.stroke();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.fill();
  }
}

export default function OceanBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const boids: Boid[] = [];
    const bubbles: Bubble[] = [];
    let ripples: Ripple[] = [];
    
    // Init boids
    for (let i = 0; i < 5; i++) boids.push(new Boid(Math.random() * width, Math.random() * height, 'bg'));
    for (let i = 0; i < 60; i++) boids.push(new Boid(Math.random() * width, Math.random() * height, 'mid'));
    for (let i = 0; i < 15; i++) boids.push(new Boid(Math.random() * width, Math.random() * height, 'fg'));
    
    // Init bubbles
    for (let i = 0; i < 40; i++) bubbles.push(new Bubble(width, height));

    let mouseX = -1000;
    let mouseY = -1000;
    let lastRippleTime = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      const now = Date.now();
      if (now - lastRippleTime > 100) {
        ripples.push(new Ripple(mouseX, mouseY));
        lastRippleTime = now;
      }
    };
    
    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Draw God Rays
      ctx.save();
      ctx.globalCompositeOperation = 'overlay';
      const gradient = ctx.createLinearGradient(width / 2, 0, width / 2, height);
      gradient.addColorStop(0, 'rgba(0, 240, 255, 0.1)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      
      const time = Date.now() * 0.0005;
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.moveTo(width * 0.2 + i * (width * 0.15) + Math.sin(time + i) * 50, -50);
        ctx.lineTo(width * 0.3 + i * (width * 0.15) + Math.sin(time + i + 1) * 50, -50);
        ctx.lineTo(width * 0.5 + i * (width * 0.1) + Math.sin(time * 0.5 + i) * 100, height + 50);
        ctx.lineTo(width * 0.1 + i * (width * 0.1) + Math.sin(time * 0.5 + i + 1) * 100, height + 50);
        ctx.fill();
      }
      ctx.restore();

      // Update and draw entities
      boids.forEach(boid => {
        boid.update(boids, mouseX, mouseY, width, height);
        boid.draw(ctx);
      });
      
      bubbles.forEach(bubble => {
        bubble.update(height);
        bubble.draw(ctx);
      });
      
      ripples.forEach(ripple => {
        ripple.update();
        ripple.draw(ctx);
      });
      
      ripples = ripples.filter(r => r.alpha > 0);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
}
