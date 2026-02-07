"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Stars() {
  const [stars, setStars] = useState<
    { id: number; x: number; y: number; size: number }[]
  >([]);

  useEffect(() => {
    // Generate 100 random stars only on the client to avoid hydration errors
    const newStars = Array.from({ length: 100 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage
      y: Math.random() * 100, // percentage
      size: Math.random() * 2 + 1, // 1px to 3px
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-black">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute bg-white rounded-full"
          style={{
            top: `${star.y}%`,
            left: `${star.x}%`,
            width: star.size,
            height: star.size,
          }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
