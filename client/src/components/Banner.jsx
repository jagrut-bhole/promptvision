import React from 'react';
import { Button } from '../components/ui/button'
import { ArrowRight } from 'lucide-react';
import { BannerImage } from '../assets';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
  const navigate = useNavigate();
  return (
    // <section className="py-16 bg-white dark:bg-gray-900/80 overflow-hidden">
    <section className='py-16 overflow-hidden bg-black'>
      <div className="container mx-auto px-6">
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 rounded-3xl overflow-hidden shadow-2xl border border-gray-700/30">
          <div className="grid lg:grid-cols-2 min-h-[480px]">
            
            {/* Left Content Panel - Matching the uploaded image exactly */}
            <div className="flex flex-col justify-center p-12 lg:p-16 bg-gradient-to-br from-gray-900/98 to-gray-800/98 dark:from-gray-950/98 dark:to-gray-900/98 relative">
              
              {/* Main Heading - exactly matching the uploaded image */}
              <h2 
                className="text-3xl lg:text-4xl xl:text-5xl font-normal hover:cursor-pointer text-white mb-8 leading-tight tracking-wide"
                style={{ 
                  fontFamily: 'Balto Book, Inter, sans-serif',
                  fontWeight: '400'
                }}>
                Uplift your advertising visuals with
                <br />
                <span className="text-white">PromptVision</span>
              </h2>

              {/* CTA Button - matching the exact style from uploaded image */}
              <div className="mb-8">
                <Button 
                  className="bg-transparent border-2 border-gray-400/60 text-white hover:border-[#008055] hover:bg-[#008055]/10 px-8 py-4 rounded-2xl text-lg transition-all duration-300 min-h-[56px] backdrop-blur-sm font-normal" 
                  onClick={() => navigate('signup')}
                  style={{ 
                    fontFamily: 'Balto Book, Inter, sans-serif',
                    borderRadius: '20px'
                  }}>
                  Create an account
                  <ArrowRight className="w-5 h-5 ml-3" />
                </Button>
              </div>
            </div>

            {/* Right Image Panel - Enhanced to match uploaded reference more closely */}
            <div className="relative h-64 lg:h-auto min-h-[400px]">
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-slate-800/30 lg:to-slate-800/50 z-10"></div>
              
              {/* Image container */}
              <div className="absolute inset-0">
                <img
                //   src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop&q=80"
                src={BannerImage}
                  alt="Jeep and bear in scenic mountain landscape at sunset"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;