import React from 'react'

export const GridPattern = ({children}) => {
  return (
    <div className="min-h-screen w-full bg-black relative overflow-hidden">
      {/* Grid pattern */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff10 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff10 1px, transparent 1px)
          `,
          backgroundSize: "30px 30px, 30px 30px",
        }}
      />
      
      {/* Fade out effect - radial gradient overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(circle at center, transparent 0%, transparent 40%, black 100%)'
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}