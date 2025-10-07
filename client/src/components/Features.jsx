import React from 'react'
import { Sparkles, Zap, Shield, Palette, Download, Wand2, Image, Layers } from 'lucide-react'

function Features() {
  const features = [
    {
      icon: <Sparkles className="w-8 h-8 text-white" />,
      title: "AI-Powered Generation",
      description: "Create stunning images with advanced AI algorithms that understand your creative vision and bring it to life."
    },
    {
      icon: <Zap className="w-8 h-8 text-white" />,
      title: "Lightning Fast",
      description: "Generate high-quality images in seconds, not hours. Our optimized AI delivers results at unprecedented speed."
    },
    {
      icon: <Palette className="w-8 h-8 text-white" />,
      title: "Multiple Styles",
      description: "Choose from photorealistic, artistic, abstract, and custom styles to match your creative needs perfectly."
    },
    {
      icon: <Wand2 className="w-8 h-8 text-white" />,
      title: "Smart Prompts",
      description: "Our AI understands natural language descriptions and transforms them into beautiful, detailed images."
    },
    {
      icon: <Image className="w-8 h-8 text-white" />,
      title: "High Resolution",
      description: "Generate images up to 4K resolution with crisp details and professional quality for any use case."
    },
    {
      icon: <Shield className="w-8 h-8 text-white" />,
      title: "Commercial License",
      description: "Use generated images for commercial projects, marketing, and business purposes with full rights."
    },
    {
      icon: <Layers className="w-8 h-8 text-white" />,
      title: "Batch Processing",
      description: "Create multiple variations and styles simultaneously to explore different creative directions."
    },
    {
      icon: <Download className="w-8 h-8 text-white" />,
      title: "Instant Download",
      description: "Download your creations immediately in various formats including PNG, JPG, and high-res versions."
    }
  ]

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black opacity-50"></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Powerful Features for
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Creative Minds
            </span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Unlock the full potential of AI image generation with our comprehensive suite of tools designed for creators, designers, and businesses.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/10"
            >
              {/* Icon */}
              <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-blue-400 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-white/70 leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                {feature.description}
              </p>
              
              {/* Hover effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        {/* <div className="text-center mt-20">
          <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-full px-8 py-4 border border-white/20">
            <Sparkles className="w-6 h-6 text-white" />
            <span className="text-white font-medium">Ready to create amazing images?</span>
            <button className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-white/90 transition-colors duration-300">
              Start Creating
            </button>
          </div>
        </div> */}
      </div>
    </section>
  )
}

export default Features