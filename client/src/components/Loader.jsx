import React from 'react';
import { motion } from 'framer-motion';


const Loader = ({ size = 'md', variant = 'spinner' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  if (variant === 'pulse') {
    return (
      <div className="flex justify-center items-center gap-2">
        <div className={`${sizeClasses[size]} bg-white/80 rounded-full animate-pulse`} style={{ animationDelay: '0s' }}></div>
        <div className={`${sizeClasses[size]} bg-white/80 rounded-full animate-pulse`} style={{ animationDelay: '0.2s' }}></div>
        <div className={`${sizeClasses[size]} bg-white/80 rounded-full animate-pulse`} style={{ animationDelay: '0.4s' }}></div>
      </div>
    );
  }

  if (variant === 'dots') {
    return (
      <div className="flex justify-center items-center gap-2">
        <div className="w-3 h-3 bg-white/80 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
        <div className="w-3 h-3 bg-white/80 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-3 h-3 bg-white/80 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
    );
  }

  if (variant === 'bars') {
    return (
      <div className="flex justify-center items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-1.5 bg-white/80 rounded-full animate-pulse"
            style={{
              height: '24px',
              animationDelay: `${i * 0.1}s`,
              animationDuration: '1s'
            }}
          ></div>
        ))}
      </div>
    );
  }

  // Default spinner
  return (
    <div className="flex justify-center items-center">
      <div
        className={`${sizeClasses[size]} border-4 border-white/20 border-t-white/80 rounded-full animate-spin`}
      />
    </div>
  );
};

export { Loader };

export const LoaderPost = ({text}) => {

  return (
    <div className="font-sans font-bold text-white [--shadow-color:rgba(255,255,255,0.8)]">
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          className="inline-block text-white"
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{
            scale: [1, 1.1, 1],
            textShadow: [
              "0 0 0 var(--shadow-color)",
              "0 0 1px var(--shadow-color)",
              "0 0 0 var(--shadow-color)",
            ],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: "loop",
            delay: i * 0.05,
            ease: "easeInOut",
            repeatDelay: 2,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </div>
  )
  
}