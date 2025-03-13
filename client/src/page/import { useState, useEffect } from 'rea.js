import { useState, useEffect } from 'react';
import { Sun, Moon, X, ArrowRight } from 'lucide-react';

const LandingPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Unsplash sample images - high quality lifestyle/portrait photos
  const slides = [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1517070208541-6ddc4d3efbcb?w=500&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=500&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&auto=format&fit=crop&q=60'
  ];

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Navbar */}
      <nav className="py-4 px-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="font-bold text-xl">100xPhoto</div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
            Pricing
          </button>
          <button className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600">
            Sign In
          </button>
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12 flex-grow">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-2">Transform Your Photos</h1>
          <h2 className="text-5xl font-bold mb-8">
            with <span className="text-purple-600">AI</span> <span className="text-pink-500">Magic</span>
          </h2>

          <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-bold flex items-center mx-auto">
            Start Creating Now
            <ArrowRight className="ml-2" size={20} />
          </button>

          {/* Image Slideshow - Always visible */}
          <div className="mt-16 relative">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out" 
                style={{ transform: `translateX(-${currentSlide * 25}%)` }}
              >
                {slides.map((slide, index) => (
                  <div key={index} className="w-1/4 flex-shrink-0 px-2">
                    <img 
                      src={slide} 
                      alt={`Example ${index + 1}`} 
                      className="w-full h-80 object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-center items-center mt-8 space-x-4">
              <button 
                onClick={handlePrevSlide}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
              >
                <ArrowRight size={20} className="rotate-180" />
              </button>
              
              <div className="flex space-x-2">
                {slides.map((_, index) => (
                  <div 
                    key={index}
                    className={`h-1 w-8 rounded-full ${
                      index === currentSlide 
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  />
                ))}
              </div>
              
              <button 
                onClick={handleNextSlide}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
              >
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal - Only shown initially */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className={`relative w-full max-w-4xl p-8 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <X size={24} />
            </button>
            
            <div className="flex flex-col items-center">
              <div className="flex flex-wrap justify-center gap-4 mb-6">
                <div className="bg-purple-900 text-purple-200 px-4 py-2 rounded-full flex items-center">
                  <span className="mr-2">✨</span>
                  <span>Next-Gen AI Portrait Generation</span>
                </div>
                <div className="bg-purple-900 text-purple-200 px-4 py-2 rounded-full flex items-center">
                  <span className="mr-2">🚀</span>
                  <span>Powered by 100xDevs</span>
                </div>
              </div>

              <h1 className="text-5xl font-bold text-center mb-2">Transform Your Photos</h1>
              <h2 className="text-5xl font-bold text-center mb-8">
                with <span className="text-purple-600">AI</span> <span className="text-pink-500">Magic</span>
              </h2>

              <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-bold flex items-center">
                Start Creating Now
                <ArrowRight className="ml-2" size={20} />
              </button>

              <div className="mt-16 w-full">
                <div className="overflow-hidden">
                  <div 
                    className="flex transition-transform duration-500 ease-in-out" 
                    style={{ transform: `translateX(-${currentSlide * 25}%)` }}
                  >
                    {slides.map((slide, index) => (
                      <div key={index} className="w-1/4 flex-shrink-0 px-2">
                        <img 
                          src={slide} 
                          alt={`Example ${index + 1}`} 
                          className="w-full h-80 object-cover rounded-lg"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-center items-center mt-8 space-x-4">
                  <button 
                    onClick={handlePrevSlide}
                    className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
                  >
                    <ArrowRight size={20} className="rotate-180" />
                  </button>
                  
                  <div className="flex space-x-2">
                    {slides.map((_, index) => (
                      <div 
                        key={index}
                        className={`h-1 w-8 rounded-full ${
                          index === currentSlide 
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
                            : 'bg-gray-300 dark:bg-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  
                  <button 
                    onClick={handleNextSlide}
                    className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
                  >
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;







<div className="w-full max-w-6xl">
{/* Image Gallery - Using a layout exactly like the image */}
<div className="relative flex justify-center overflow-hidden h-[450px]">
  <div className="flex w-full justify-center space-x-4">
    {/* Four images side by side with spacing between them */}
    {slides.map((slide, index) => {
      // Calculate the offset for the circular loop
      const offset = (index - currentSlide + slides.length) % slides.length;
      
      // Calculate x position
      // When we need circular effect, we need to make sure the first image appears after the last
      // and the last image appears before the first
      let translateX = "0%";
      if (currentSlide === slides.length - 1 && index === 0) {
        // First image after the last
        translateX = "100%";
      } else if (currentSlide === 0 && index === slides.length - 1) {
        // Last image before the first
        translateX = "-100%";
      } else {
        // Normal positioning based on the offset
        translateX = `${(offset - 1) * 110}%`;
      }
      
      return (
        <div 
          key={slide.id}
          className="w-1/4 flex-shrink-0 rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
          style={{
            transform: `translateX(${translateX})`,
            opacity: offset === 0 ? 1 : 0.9,
            height: '100%',
          }}
        >
          <img 
            src={slide.image} 
            alt={`Transformation example ${index + 1}`} 
            className="w-full h-full object-cover rounded-lg" 
          />
        </div>
      );
    })}
  </div>
</div>

{/* Controls */}
<div className="flex justify-center items-center mt-8 space-x-4">
  <button 
    onClick={prevSlide}
    className="w-10 h-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center"
  >
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M15 19l-7-7 7-7" />
    </svg>
  </button>
  
  <div className="flex space-x-2">
    {slides.map((_, index) => (
      <button
        key={index}
        onClick={() => goToSlide(index)}
        className={`w-12 h-1.5 rounded-full transition-all duration-300 ${
          index === currentSlide 
            ? 'bg-gradient-to-r from-purple-600 to-pink-500' 
            : 'bg-white bg-opacity-30'
        }`}
      />
    ))}
  </div>
  
  <button 
    onClick={nextSlide}
    className="w-10 h-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center"
  >
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 5l7 7-7 7" />
    </svg>
  </button>
</div>
</div>