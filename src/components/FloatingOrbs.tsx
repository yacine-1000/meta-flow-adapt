import { motion } from "framer-motion";

export const FloatingOrbs = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
    {[
      { size: 120, x: "10%", y: "20%", delay: 0, duration: 8 },
      { size: 80, x: "75%", y: "35%", delay: 1.5, duration: 10 },
      { size: 60, x: "25%", y: "65%", delay: 3, duration: 7 },
      { size: 100, x: "80%", y: "75%", delay: 2, duration: 9 },
      { size: 50, x: "50%", y: "15%", delay: 4, duration: 11 },
    ].map((orb, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full"
        style={{
          width: orb.size,
          height: orb.size,
          left: orb.x,
          top: orb.y,
          background: `radial-gradient(circle, rgba(149, 255, 195, 0.06) 0%, rgba(149, 255, 195, 0) 70%)`,
        }}
        animate={{
          y: [-10, 15, -10],
          x: [-8, 8, -8],
          scale: [1, 1.15, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: orb.duration,
          repeat: Infinity,
          delay: orb.delay,
          ease: "easeInOut",
        }}
      />
    ))}
  </div>
);
