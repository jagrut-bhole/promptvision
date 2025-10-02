import React, { useState, useEffect, forwardRef } from 'react';

// Utility function to combine class names (replacement for cn utility)
const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

// MasonryGrid Component (JavaScript version)
const MasonryGrid = forwardRef(({ className, columns = 3, gap = 4, children, ...props }, ref) => {
  // Dynamically create the style object for column layout
  const style = {
    columnCount: columns,
    columnGap: `${gap * 0.25}rem`, // Converts gap unit to rem
  };

  return (
    <div ref={ref} style={style} className={cn('w-full', className)} {...props}>
      {React.Children.map(children, (child, index) => (
        <div
          key={index}
          className="mb-4 break-inside-avoid opacity-0 animate-fade-in" // Prevents items from breaking across columns
          style={{
            animationDelay: `${index * 0.1}s`,
            animationFillMode: 'forwards'
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
});

MasonryGrid.displayName = 'MasonryGrid';

// --- Data for the cards ---
const testimonials = [
  {
    profileImage: 'https://randomuser.me/api/portraits/men/32.jpg',
    name: 'Anaam Farooq',
    feedback: "Kashmir's Hidden Winter Wonderland",
    mainImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&h=1200&q=80',
  },
  {
    profileImage: 'https://randomuser.me/api/portraits/women/44.jpg',
    name: 'neophyte_clicker',
    feedback: 'Celebrating Diwali Through The Lens',
    mainImage: 'https://images.unsplash.com/photo-1605292356183-a77d0a9c9d1d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8RGl3YWxpfGVufDB8fDB8fHww',
  },
  {
    profileImage: 'https://randomuser.me/api/portraits/men/56.jpg',
    name: 'Badshah1341',
    feedback: 'A Sunset Symphony in Gold',
    mainImage: 'https://images.unsplash.com/photo-1494500764479-0c8f2919a3d8?auto=format&fit=crop&w=800&h=1000&q=80',
  },
  {
    profileImage: 'https://randomuser.me/api/portraits/men/78.jpg',
    name: 'mohsinsyasin_',
    feedback: 'realme Insider Event Kashmir',
    mainImage: 'https://images.unsplash.com/photo-1617396900799-f4ec2b43c7ae?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHdhbGxwYXBlciUyMDRrfGVufDB8fDB8fHww',
  },
  {
    profileImage: 'https://randomuser.me/api/portraits/women/68.jpg',
    name: 'Naaz Khan',
    feedback: 'Illuminate the Night with the P3 Pro',
    mainImage: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTF8fG5hdHVyZXxlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    profileImage: 'https://randomuser.me/api/portraits/women/88.jpg',
    name: 'Venky_smile',
    feedback: 'Highlights from realme',
    mainImage: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTh8fG5hdHVyZXxlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    profileImage: 'https://randomuser.me/api/portraits/men/21.jpg',
    name: 'LoserAnant',
    feedback: '14 Pro Series Launch Event Recap',
    mainImage: 'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njh8fG5hdHVyZXxlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    profileImage: 'https://randomuser.me/api/portraits/women/11.jpg',
    name: 'Isabella',
    feedback: 'The mountains are calling me.',
    mainImage: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=800&h=1200&q=80',
  },
];

// --- Reusable Card Component ---
const TestimonialCard = ({ profileImage, name, feedback, mainImage }) => (
  <div className="relative rounded-2xl overflow-hidden group transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-2xl cursor-pointer bg-gray-100 dark:bg-gray-800">
    <img
      src={mainImage}
      alt={feedback}
      className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
      onError={(e) => {
        e.currentTarget.src = 'https://placehold.co/800x600/1a1a1a/ffffff?text=Image+Not+Found';
      }}
    />
    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
    
    {/* Content overlay */}
    <div className="absolute top-0 left-0 p-4 text-white z-10">
      <div className="flex items-center gap-3 mb-3">
        <img
          src={profileImage}
          className="w-10 h-10 rounded-full border-2 border-white/90 shadow-lg transition-transform duration-300 group-hover:scale-110"
          alt={name}
          onError={(e) => {
            e.currentTarget.src = 'https://placehold.co/40x40/EFEFEF/333333?text=' + (name ? name.charAt(0) : 'U');
          }}
        />
        <span className="font-semibold text-sm drop-shadow-lg tracking-wide">{name}</span>
      </div>
      <p className="text-sm font-medium leading-relaxed drop-shadow-lg max-w-[90%]">{feedback}</p>
    </div>

    {/* Subtle shine effect on hover */}
    <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
  </div>
);

// --- Main Demo Component ---
const Gallery = () => {
  const [columns, setColumns] = useState(4);

  // Function to determine columns based on screen width
  const getColumns = (width) => {
    if (width < 640) return 1;    // sm
    if (width < 768) return 2;    // md
    if (width < 1024) return 3;   // lg
    return 4;                     // xl and up
  };

  useEffect(() => {
    const handleResize = () => {
      setColumns(getColumns(window.innerWidth));
    };

    handleResize(); // Set initial columns on mount

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="w-full min-h-screen p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            What People Are Saying
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Discover amazing stories and experiences shared by our community
          </p>
        </div>

        {/* Masonry Grid */}
        <MasonryGrid columns={columns} gap={4} className="transition-all duration-300">
          {testimonials.map((card, index) => (
            <TestimonialCard key={index} {...card} />
          ))}
        </MasonryGrid>
      </div>
    </div>
  );
};

export default Gallery;