import React from 'react';
import { Edit, Cpu, Download, ArrowRight } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: Edit,
      step: '01',
      title: 'Write Your Prompt',
      description: 'Describe your vision with detailed prompts. The more specific you are, the better your results will be.',
      color: 'from-[#008055] to-[#0A6647]'
    },
    {
      icon: Cpu,
      step: '02',
      title: 'AI Processing',
      description: 'Our advanced AI models analyze your prompt and generate multiple high-quality image variations.',
      color: 'from-[#0A6647] to-[#124E3B]'
    },
    {
      icon: Download,
      step: '03',
      title: 'Download & Enjoy',
      description: 'Choose your favorite result and download in multiple formats. Use them however you like!',
      color: 'from-[#124E3B] to-[#008055]'
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 
            className="text-4xl md:text-5xl font-medium text-gray-900 dark:text-white mb-6"
            style={{ 
              fontFamily: 'Balto Medium, Inter, sans-serif',
              letterSpacing: '-0.01em'
            }}
          >
            How It Works
          </h2>
          <p 
            className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            style={{ fontFamily: 'Balto Book, Inter, sans-serif' }}
          >
            Create stunning AI-generated images in three simple steps
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="flex flex-col md:flex-row items-center mb-16 last:mb-0">
                {/* Step Number and Icon */}
                <div className="flex-shrink-0 mb-8 md:mb-0">
                  <div className="relative">
                    <div className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}>
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                    <div 
                      className="text-6xl font-light text-gray-200 dark:text-gray-700 absolute -top-4 -right-4 -z-10"
                      style={{ fontFamily: 'Balto Book, Inter, sans-serif' }}
                    >
                      {step.step}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 md:ml-12 text-center md:text-left">
                  <h3 
                    className="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4"
                    style={{ fontFamily: 'Balto Medium, Inter, sans-serif' }}
                  >
                    {step.title}
                  </h3>
                  <p 
                    className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-lg"
                    style={{ fontFamily: 'Balto Book, Inter, sans-serif' }}
                  >
                    {step.description}
                  </p>
                </div>

                {/* Animation Placeholder */}
                <div className="flex-shrink-0 mt-8 md:mt-0 md:ml-12">
                  <div className="w-64 h-40 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-xl flex items-center justify-center border border-gray-200 dark:border-gray-600 relative overflow-hidden">
                    {index === 0 && (
                      <div className="text-gray-500 dark:text-gray-400 animate-pulse" style={{ fontFamily: 'Balto Book, Inter, sans-serif' }}>
                        "A magical forest..."
                      </div>
                    )}
                    {index === 1 && (
                      <div className="grid grid-cols-4 gap-1 animate-pulse">
                        {Array.from({ length: 16 }).map((_, i) => (
                          <div 
                            key={i} 
                            className="w-3 h-3 bg-[#008055] rounded-sm opacity-60"
                            style={{ animationDelay: `${i * 0.1}s` }}
                          />
                        ))}
                      </div>
                    )}
                    {index === 2 && (
                      <div className="flex items-center text-gray-500 dark:text-gray-400">
                        <Download className="w-6 h-6 mr-2 animate-bounce" />
                        <span style={{ fontFamily: 'Balto Book, Inter, sans-serif' }}>Ready!</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Arrow connector */}
              {index < steps.length - 1 && (
                <div className="hidden md:flex justify-center mb-16">
                  <ArrowRight className="w-6 h-6 text-[#008055] animate-pulse" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;