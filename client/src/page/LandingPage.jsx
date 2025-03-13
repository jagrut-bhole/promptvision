// import { useState, useEffect } from "react";
// import { Sun, Moon, X, ArrowRight } from "lucide-react";

// const LandingPage = () => {
//   const [darkMode, setDarkMode] = useState(false);
//   const [showModal, setShowModal] = useState(true);
//   const [currentSlide, setCurrentSlide] = useState(0);

//   useEffect(() => {
//     if (darkMode) {
//       document.documentElement.classList.add("dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//     }
//   }, [darkMode]);

//   const toggleDarkMode = () => {
//     setDarkMode(!darkMode);
//   };

//   const slides = [
//     "https://unsplash.com/photos/a-man-standing-in-a-field-under-a-flying-saucer-4qkA1kprJWs",
//     "https://unsplash.com/photos/skier-enjoying-a-snowy-winter-day-on-the-slopes-kcKIUXkA5EM",
//     "https://unsplash.com/photos/a-cosplayer-with-pink-hair-blows-a-kiss-mJm8JlYUUJ8",
//     "https://unsplash.com/photos/a-sunny-cafe-corner-with-chairs-and-a-table-XI_XxO5KWJE",
//   ];

//   const handlePrevSlide = () => {
//     setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
//   };

//   const handleNextSlide = () => {
//     setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
//   };

//   return (
//     <div
//       className={`min-h-screen flex flex-col ${
//         darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
//       }`}
//     >
//       {/* NavBar */}
//       <nav className="py-4 px-6 flex justify-between items-center">
//         <div className="flex items-center space-x-2">
//           <div className="font-bold text-xl">Prompt Vision</div>
//         </div>

//         <div className="flex items-center space-x-4">
//           <button className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600">
//             Sign In
//           </button>
//           <button
//             onClick={toggleDarkMode}
//             className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
//           >
//             {darkMode ? <Sun size={20} /> : <Moon size={20} />}
//           </button>
//         </div>
//       </nav>

//       {/* Main Context */}
//       <div className="container mx-auto px-6 py-12 flex-grow">
//         <div className="text-center">
//           <h1 className="text-5xl font-bold mb-2">Generate Your Photos</h1>
//           <h2 className="text-5xl font-bold mb-8">
//             With <span className="text-purple-600">AI</span>
//             <span className="text-pink-500">Magic</span>
//           </h2>

//           <button className="bg-gradient-to-r from-purple-500 to pink-500 text-white px-6 py-3 rounded-full font-bold flex items-center mx-auto">
//             Start Generating Now <ArrowRight className="ml-2" size={20} />
//           </button>

//           {/* Image SlideShow */}
//           <div className="mt-16 relative">
//             <div className="overflow-hidden">
//               <div
//                 className="flex transition-transform duration-500 ease-in-out"
//                 style={{ transform: `translateX(-${currentSlide * 25}%)` }}
//               >
//                 {slides.map((slide, index) => (
//                   <div key={index} className="w-1/4 flex-shrink-0 px-2">
//                     <img
//                       src={slide}
//                       alt={`Example ${index + 1}`}
//                       className="w-full h-80 object-cover rounded-lg"
//                     />
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="flex justify-center items-center mt-8 space-x-4">
//               <button
//                 onClick={handlePrevSlide}
//                 className="p-3 rounded-full bg-gray-200 dark:bg-gray-700"
//               >
//                 <ArrowRight size={20} className="rotate-180" />
//               </button>
//               <div className="flex space-x-2">
//                 {slides.map((_, index) => (
//                   <div
//                     key={index}
//                     className={`h-1 w-8 rounded-full ${
//                       index === currentSlide
//                         ? "bg-gradient-to-r from-purple-500 to-pink-500"
//                         : "bg-gray-300 dark:bg-gray-600"
//                     }`}
//                   />
//                 ))}
//               </div>

//               <button
//                 onClick={handleNextSlide}
//                 className="p-3 rounded-full bg-gray-200 dark:bg-gray-700"
//               >
//                 <ArrowRight size={20} />
//               </button>

//             </div>
//           </div>
//         </div>
//       </div>

//     </div>
//   );
// };

// export default LandingPage;

// Code 2.0 //

import { useState, useEffect, useRef } from "react";
import { images1, images2, images3, images4, images5, images6, images7 } from "../assets";


const LandingPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideInterval = useRef(null);

  const slides = [images1, images2, images3, images4, images5, images6, images7];

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? "bg-black text-white" : "bg-white text-black"}`}>
      {/* Header */}
      <header className="flex justify-between items-center px-6 md:px-12 py-6">
        <div className="flex items-center">
          <span className="mr-1 text-lg">✦</span>
          <span className="font-bold text-lg">PromptVision</span>
          <span className="mr-1 text-lg">✦</span>
        </div>

        <div className="flex items-center space-x-4 md:space-x-6">
          <a href="#pricing" className="font-medium">
            Pricing
          </a>
          <button className="bg-opacity-10 bg-white px-4 py-2 rounded-full font-medium">Sign In</button>
          <div className="bg-opacity-10 bg-white rounded-full p-1 flex">
            <button onClick={toggleDarkMode} className={`w-8 h-8 flex items-center justify-center rounded-full ${isDarkMode ? "bg-white bg-opacity-20" : ""}`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" />
              </svg>
            </button>
            <button onClick={toggleDarkMode} className={`w-8 h-8 flex items-center justify-center rounded-full ${!isDarkMode ? "bg-white bg-opacity-20" : ""}`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21.5287 15.9294C21.3687 15.6554 20.9187 15.2384 19.7987 15.4344C19.1787 15.5464 18.5487 15.5994 17.9187 15.5994C14.1387 15.5994 11.0187 12.9294 10.3987 9.32943C10.0087 7.16943 10.5387 5.01943 11.9187 3.33943C12.3987 2.75943 12.0387 1.82943 11.2787 1.75943C10.9487 1.72943 10.6187 1.70943 10.2787 1.70943C5.31867 1.70943 1.27867 5.75943 1.27867 10.7094C1.27867 15.6594 5.31867 19.7094 10.2787 19.7094C13.5787 19.7094 16.5287 18.0394 18.2187 15.4494C19.2787 13.8994 21.8787 16.5694 21.5287 15.9294Z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center px-6 md:px-12 pt-16 md:pt-24">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-10">
            Transform Your Photos
            <br />
            <span className="font-normal">with </span>
            <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">AI Magic</span>
          </h1>
          <button className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-3 rounded-full text-lg font-medium inline-flex items-center">
            Start Creating Now
            <span className="ml-2">→</span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
