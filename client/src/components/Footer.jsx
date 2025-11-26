import React from "react";
import { Twitter, Github } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = {
    product: [
      { label: "Features", href: "#features" },
      { label: "About Us", href: "#about-us" },
      { label: "API", href: "#api" },
      { label: "Pricing", href: "#pricing" },
    ],
    support: [
      { label: "Help Center", href: "#help" },
      { label: "Contact Us", href: "#contact" },
      { label: "Community", href: "#community" },
      { label: "FAQ", href: "#faq" },
    ]
  };

  const socialLinks = [
    { icon: <Twitter className="w-5 h-5" />, href: "https://x.com/JagrutBhol2820", label: "Twitter" },
    { icon: <Github className="w-5 h-5" />, href: "https://github.com/jagrut-bhole", label: "GitHub" },
  ];

  return (
    <footer className="bg-black relative overflow-hidden">
      {/* Background linear overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black via-gray-900 to-black opacity-50"></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">


        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-16">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
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
            <h4 className="text-white font-semibold mb-6">Quick Links</h4>
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

          {/* Support Links */}
          <div id="support">
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
            <div className="text-white/70 text-sm">
              <p className="text-center">© {currentYear} PromptVision. All rights reserved.</p>
            </div>
        </div>
      </div>
    </footer>
  );
}
