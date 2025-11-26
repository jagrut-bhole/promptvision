import React from "react";
import {
  DraggableCardBody,
  DraggableCardContainer,
} from "../components/ui/draggable-card";

export function DragCard() {
  const items = [
    {
      title: "Realistic",
      key: 1,
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      className: "absolute top-10 left-[15%] rotate-[-5deg]",
    },
    {
      title: "Artistic",
      key: 2,
      image:
        "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=2667&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      className: "absolute top-40 left-[20%] rotate-[-7deg]",
    },
    {
      title: "Cartoon",
      key: 3,
      image:
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      className: "absolute top-5 left-[38%] rotate-[8deg]",
    },
    {
      title: "Abstract",
      key: 4,
      image:
        "https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=3648&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      className: "absolute top-32 left-[43%] rotate-[10deg]",
    },
    {
      title: "Vintage",
      key: 5,
      image:
        "https://images.unsplash.com/photo-1533158326339-7f3cf2404354?q=80&w=3542&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      className: "absolute top-20 right-[20%] rotate-[2deg]",
    },
    {
      title: "Modern",
      key: 6,
      image:
        "https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=3070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      className: "absolute top-24 left-[52%] rotate-[-7deg]",
    },
  ];

  return (
    <section id="styles" className="relative mb-10 py-10">
      {/* Heading at the top */}
      <div className="text-center mt-15 mb-16">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
          Explore Our AI Styles
        </h2>
      </div>

      {/* Cards container with background text */}
      <div className="relative min-h-[600px] flex items-center justify-center">
        {/* Background text - faint and behind cards */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <p className="text-lg md:text-xl text-white/20 max-w-3xl mx-auto text-center px-4 leading-relaxed">
            Discover the endless possibilities with PromptVision. Choose from
            six unique AI generation styles - from photorealistic renders to
            artistic masterpieces. Drag and explore each style to see what
            your imagination can create.
          </p>
        </div>

        {/* Draggable cards - on top */}
        <DraggableCardContainer className="relative w-full max-w-7xl mx-auto px-4 h-[500px] z-10">
          {items.map((item) => (
            <DraggableCardBody key={item.key} className={item.className}>
              <img
                src={item.image}
                alt={item.title}
                className="pointer-events-none relative z-10 h-80 w-80 object-cover rounded-lg shadow-2xl"
              />
              <h3 className="mt-4 text-center text-2xl font-bold text-white">
                {item.title}
              </h3>
            </DraggableCardBody>
          ))}
        </DraggableCardContainer>
      </div>
    </section>
  );
}