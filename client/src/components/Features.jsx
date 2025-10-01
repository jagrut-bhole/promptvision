import React from "react";
import {
  Zap,
  Palette,
  Download,
  Sparkles,
  Settings,
  Shield,
} from "lucide-react";

function Features() {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast Generation",
      description:
        "Generate high-quality images in seconds with our optimized AI models and advanced processing infrastructure.",
    },
    {
      icon: Palette,
      title: "Multiple Art Styles",
      description:
        "Choose from photorealistic, abstract, artistic, anime, and countless other styles to match your vision.",
    },
    {
      icon: Settings,
      title: "Advanced Customization",
      description:
        "Fine-tune every aspect of your images with detailed prompts, style controls, and generation parameters.",
    },
    {
      icon: Download,
      title: "High Resolution Output",
      description:
        "Download your creations in multiple formats and resolutions, perfect for both web and print use.",
    },
    {
      icon: Sparkles,
      title: "Smart Enhancement",
      description:
        "Our AI automatically enhances image quality, fixing lighting, composition, and details for perfect results.",
    },
    {
      icon: Shield,
      title: "Commercial License",
      description:
        "Use your generated images for personal and commercial projects with full rights and copyright protection.",
    },
  ];

  return (
    <section id="features" className="py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-medium text-gray-900 dark:text-white mb-6"
            style={{
              fontFamily: "Balto Medium, Inter, sans-serif",
              letterSpacing: "-0.01em",
            }}>
            Powerful Features for
            <span className="block text-[#008055]">Every Creator</span>
          </h2>
          <p
            style={{ fontFamily: "Balto Medium, Inter, sans-serif" }}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Everything you need to bring your creative vision to life with
            cutting-edge AI technology
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              className="group p-8 bg-gray-50/50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-[#008055]/30 dark:hover:border-[#008055]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[#008055]/10 hover:-translate-y-1"
              key={index}>
              <div className="w-12 h-12 bg-gradient-to-br from-[#008055] to-[#0A6647] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3
                className="text-xl font-medium text-gray-900 dark:text-white mb-4"
                style={{ fontFamily: "Balto Medium, Inter, sans-serif" }}>
                {feature.title}
              </h3>
              <p
                className="text-gray-600 dark:text-gray-300 leading-relaxed"
                style={{ fontFamily: "Balto Medium, Inter, sans-serif" }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
