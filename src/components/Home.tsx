import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowDown } from 'lucide-react';

export default function Home({ setActiveSection }: { setActiveSection: (id: string) => void }) {
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

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);

    let animationFrameId: number;
    let startTime = Date.now();

    const drawBettaFish = (ctx: CanvasRenderingContext2D, x: number, y: number, angle: number, scale: number, time: number, z: number, alpha: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.scale(scale, scale);
      ctx.globalAlpha = alpha;

      if (z < 0) {
        ctx.filter = `blur(${Math.min(6, Math.abs(z) / 15)}px)`;
      }

      // Iridescent gradient
      const grad = ctx.createLinearGradient(-40, -20, 30, 20);
      grad.addColorStop(0, '#00f0ff'); // Teal
      grad.addColorStop(0.5, '#ff007f'); // Pink
      grad.addColorStop(1, '#ffd700'); // Gold

      // Caudal Fin (Tail) - Large and flowing
      ctx.beginPath();
      ctx.moveTo(-20, 0);
      ctx.quadraticCurveTo(-40, -40 + Math.sin(time * 5) * 20, -70, -20);
      ctx.quadraticCurveTo(-80, 0, -70, 20);
      ctx.quadraticCurveTo(-40, 40 + Math.sin(time * 5 + 1) * 20, -20, 0);
      ctx.fillStyle = grad;
      ctx.globalAlpha = alpha * 0.8;
      ctx.fill();

      // Dorsal Fin (Top)
      ctx.beginPath();
      ctx.moveTo(-10, -5);
      ctx.quadraticCurveTo(-20, -30 + Math.sin(time * 6) * 15, -40, -20);
      ctx.lineTo(-15, -2);
      ctx.fill();

      // Anal Fin (Bottom)
      ctx.beginPath();
      ctx.moveTo(-10, 5);
      ctx.quadraticCurveTo(-20, 30 + Math.sin(time * 6 + 2) * 15, -40, 20);
      ctx.lineTo(-15, 2);
      ctx.fill();
      
      // Pectoral Fin (Side)
      ctx.beginPath();
      ctx.moveTo(0, 5);
      ctx.quadraticCurveTo(-10, 20 + Math.sin(time * 10) * 10, -20, 15);
      ctx.lineTo(-5, 5);
      ctx.fill();

      // Body
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.ellipse(0, 0, 25, 8, 0, 0, Math.PI * 2);
      const bodyGrad = ctx.createLinearGradient(-25, 0, 25, 0);
      bodyGrad.addColorStop(0, '#ff007f');
      bodyGrad.addColorStop(1, '#00f0ff');
      ctx.fillStyle = bodyGrad;
      ctx.fill();

      // Eye
      ctx.beginPath();
      ctx.arc(15, -2, 2, 0, Math.PI * 2);
      ctx.fillStyle = '#fff';
      ctx.fill();

      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const time = (Date.now() - startTime) * 0.001;

      // Typography Settings
      const fontSize = Math.min(width * 0.08, 120);
      ctx.font = `800 ${fontSize}px Montserrat, sans-serif`;
      ctx.textBaseline = 'middle';
      
      const text1 = "FASHION SH";
      const textO = "O";
      const text2 = "P";
      
      const w1 = ctx.measureText(text1).width;
      const wO = ctx.measureText(textO).width;
      const w2 = ctx.measureText(text2).width;
      const totalWidth = w1 + wO + w2;
      
      const startX = width / 2 - totalWidth / 2;
      const textY = height / 2 - 50; // Shifted up slightly
      
      const x_O = startX + w1 + wO / 2;
      const y_O = textY;
      const r_O = wO * 0.45;

      // Fish Path Math (3D Figure-8)
      const speed = 0.6;
      const t = time * speed;
      const x_left = startX - fontSize;
      const x_right = startX + totalWidth + fontSize;
      
      const isRightLobe = Math.sin(t) > 0;
      const radiusX = isRightLobe ? (x_right - x_O) : (x_O - x_left);
      
      const fishX = x_O + radiusX * Math.sin(t);
      const fishY = y_O - (fontSize * 0.6) * Math.sin(t) * Math.cos(t);
      const fishZ = 120 * Math.sin(2 * t);
      
      // Calculate angle
      const next_t = t + 0.05;
      const next_isRightLobe = Math.sin(next_t) > 0;
      const next_radiusX = next_isRightLobe ? (x_right - x_O) : (x_O - x_left);
      const next_x = x_O + next_radiusX * Math.sin(next_t);
      const next_y = y_O - (fontSize * 0.6) * Math.sin(next_t) * Math.cos(next_t);
      const fishAngle = Math.atan2(next_y - fishY, next_x - fishX);

      const fishScale = 1.5 + fishZ / 300;
      
      // Portal fade (disappear into the 'O')
      const distToCenter = Math.hypot(fishX - x_O, fishY - y_O);
      const portalFade = Math.min(1, Math.max(0, (distToCenter - 20) / 60));

      // 1. Draw Fish (Behind)
      if (fishZ < 0) {
        drawBettaFish(ctx, fishX, fishY, fishAngle, fishScale, time, fishZ, portalFade);
      }

      // 2. Draw Text (Liquid Glass Texture)
      const textGrad = ctx.createLinearGradient(0, textY - fontSize/2, 0, textY + fontSize/2);
      textGrad.addColorStop(0, '#ffffff');
      textGrad.addColorStop(1, 'rgba(165, 243, 252, 0.8)'); // Cyan-100
      
      ctx.fillStyle = textGrad;
      ctx.shadowColor = 'rgba(0, 240, 255, 0.6)';
      ctx.shadowBlur = 20;
      
      ctx.fillText(text1, startX, textY);
      ctx.fillText(text2, startX + w1 + wO, textY);
      
      // 3. Draw 'O' Portal
      ctx.beginPath();
      ctx.arc(x_O, y_O, r_O, 0, Math.PI * 2);
      ctx.lineWidth = fontSize * 0.15;
      ctx.strokeStyle = textGrad;
      ctx.stroke();
      
      // Inner mist of the portal
      const mistGrad = ctx.createRadialGradient(x_O, y_O, 0, x_O, y_O, r_O);
      mistGrad.addColorStop(0, 'rgba(0, 11, 30, 0.95)');
      mistGrad.addColorStop(1, 'rgba(0, 11, 30, 0)');
      ctx.fillStyle = mistGrad;
      ctx.shadowBlur = 0; // Reset shadow for mist
      ctx.fill();

      // 4. Draw Fish (Front)
      if (fishZ >= 0) {
        drawBettaFish(ctx, fishX, fishY, fishAngle, fishScale, time, fishZ, portalFade);
        
        // Liquid Glass Ripple Effect
        if (portalFade > 0.1) {
          ctx.save();
          ctx.globalCompositeOperation = 'color-dodge';
          const rippleGrad = ctx.createRadialGradient(fishX, fishY, 0, fishX, fishY, 150 * fishScale);
          rippleGrad.addColorStop(0, `rgba(0, 240, 255, ${0.5 * portalFade})`);
          rippleGrad.addColorStop(0.5, `rgba(255, 255, 255, ${0.2 * portalFade})`);
          rippleGrad.addColorStop(1, 'rgba(0, 240, 255, 0)');
          ctx.fillStyle = rippleGrad;
          ctx.beginPath();
          ctx.arc(fishX, fishY, 150 * fishScale, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    // Ensure fonts are loaded before rendering if possible, otherwise just start
    if (document.fonts) {
      document.fonts.ready.then(() => render());
    } else {
      render();
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div id="home" className="min-h-screen flex flex-col items-center justify-center relative z-10 px-4 text-center overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
      />
      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
        className="relative z-10 mt-[40vh] flex flex-col items-center"
      >
        <p className="text-xl md:text-2xl font-light text-cyan-50 mb-12 max-w-2xl mx-auto leading-relaxed drop-shadow-[0_0_10px_rgba(0,240,255,0.3)]">
          A high-end, immersive digital experience. Discover premium aquascaping and rare tropical marine life.
        </p>

        <motion.button
          onClick={() => {
            setActiveSection('gallery');
            document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative group px-10 py-5 bg-[#39ff14]/10 backdrop-blur-md border border-[#39ff14]/50 rounded-full text-lg font-semibold text-[#39ff14] overflow-hidden transition-all hover:bg-[#39ff14]/20 hover:border-[#39ff14] hover:shadow-[0_0_40px_rgba(57,255,20,0.6)]"
        >
          <span className="relative z-10 flex items-center gap-3">
            Explore Collection <ArrowDown className="w-5 h-5 animate-bounce" />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-[#39ff14]/0 via-[#39ff14]/20 to-[#39ff14]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
        </motion.button>
      </motion.div>
    </div>
  );
}
