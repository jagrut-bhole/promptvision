import React from "react";
import { Sparkles, ImageIcon as Image, Twitter, Github, Linkedin, Mail, ArrowRight } from "lucide-react";

function Footer() {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = {
    product: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "API", href: "#api" },
      { label: "Templates", href: "#templates" },
    ],
    company: [
      { label: "About Us", href: "#about" },
      { label: "Blog", href: "#blog" },
      { label: "Careers", href: "#careers" },
      { label: "Press", href: "#press" },
    ],
    support: [
      { label: "Help Center", href: "#help" },
      { label: "Contact", href: "#contact" },
      { label: "Community", href: "#community" },
      { label: "Status", href: "#status" },
    ],
    legal: [
      { label: "Privacy Policy", href: "#privacy" },
      { label: "Terms of Service", href: "#terms" },
      { label: "Cookie Policy", href: "#cookies" },
      { label: "GDPR", href: "#gdpr" },
    ]
  };

  const socialLinks = [
    { icon: <Twitter className="w-5 h-5" />, href: "#twitter", label: "Twitter" },
    { icon: <Github className="w-5 h-5" />, href: "#github", label: "GitHub" },
    { icon: <Linkedin className="w-5 h-5" />, href: "#linkedin", label: "LinkedIn" },
    { icon: <Mail className="w-5 h-5" />, href: "#email", label: "Email" },
  ];

  return (
    <footer className="bg-black relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-gray-900 to-black opacity-50"></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        {/* Newsletter Section */}
        <div className="text-center mb-16">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Stay Updated with
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                AI Innovation
              </span>
            </h3>
            <p className="text-white/80 mb-8 text-lg">
              Get the latest updates on AI image generation features, tips, and creative inspiration delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:border-white/40 focus:bg-white/20 transition-all duration-300"
              />
              <button className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-white/90 transition-colors duration-300 flex items-center gap-2">
                Subscribe
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                <Image className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">PromptVision</span>
            </div>
            <p className="text-white/70 mb-6 leading-relaxed max-w-md">
              Transform your imagination into stunning AI-generated images. Create, inspire, and bring your creative vision to life with our advanced AI technology.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all duration-300"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-white font-semibold mb-6">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-white font-semibold mb-6">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-white font-semibold mb-6">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-white/70 text-sm">
              © {currentYear} #tailark. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              {footerLinks.legal.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-white/70 hover:text-white transition-colors duration-300"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

