import React from "react";
import { Github, Mail, Sparkles, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Product: [
      {
        name: "Features",
        href: "#features",
      },
      {
        name: "How it Works",
        href: "#working",
      },
      {
        name: "Pricing",
        href: "#pricing",
      },
    ],
    Company: [
      {
        name: "About Us",
        href: "#about",
      },
      {
        name: "Contact",
        href: "#contact",
      },
      {
        name: "Blog",
        href: "#blog",
      },
    ],
    Resources: [
      {
        name: "Help Center",
        href: "#help",
      },
      {
        name: "Gallery",
        href: "#gallery",
      },
      {
        name: "Community",
        href: "#community",
      },
    ],
    Legal: [
      {
        name: "Terms & Conditions",
        herf: "#terms-and-conditions",
      },
      {
        name: "Cookie Policy",
        href: "#cookies",
      },
      {
        name: "Licenses",
        href: "licenses",
      },
    ],
  };

  const socialLinks = [
    {
      icon: "Instagram",
      href: "#instagram",
      name: "Instagram",
    },
    {
      icon: "Twitter",
      href: "#twitter",
      name: "Twitter",
    },
    {
      icon: "Github",
      href: "#github",
      name: "Github",
    },
    {
      icon: "Mail",
      href: "#email",
      name: "Email",
    },
  ];

  return (
    <footer className="bg-gray-900 dark:bg-black text-white">
      <div className="container mx-auto px-6 pt-16 pb-8">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-[#008055] to-[#0A6647] rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span
                className="text-2xl font-medium"
                style={{ fontFamily: "Balto Medium, Inter, sans-serif" }}
              >
                Prompt Vision
              </span>
            </div>
            <p
              className="text-gray-400 mb-6 max-w-sm leading-relaxed"
              style={{ fontFamily: "Balto Book, Inter, sans-serif" }}
            >
              Transforming creativity with AI-powered image generation. Turn
              your imagination into stunning visual reality.
            </p>

            {/* Social Links */}
            {/* <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 hover:bg-[#008055] rounded-lg flex items-center justify-center transition-colors duration-200"
                  aria-label={social.name}>
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div> */}
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="lg:col-span-1">
              <h3
                className="font-medium text-white mb-4"
                style={{ fontFamily: "Balto Medium, Inter, sans-serif" }}
              >
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-[#008055] transition-colors duration-200"
                      style={{ fontFamily: "Balto Book, Inter, sans-serif" }}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="bg-gray-800/50 rounded-2xl p-8 mb-8 border border-gray-700/50">
          <div className="max-w-2xl mx-auto text-center">
            <h3
              className="text-2xl font-medium mb-4"
              style={{ fontFamily: "Balto Medium, Inter, sans-serif" }}
            >
              Stay Updated
            </h3>
            <p
              className="text-gray-400 mb-6"
              style={{ fontFamily: "Balto Book, Inter, sans-serif" }}
            >
              Get the latest updates on new features, AI models, and creative
              tips delivered to your inbox.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 bg-gray-700 border border-gray-600 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-[#008055] transition-colors"
                style={{ fontFamily: "Balto Book, Inter, sans-serif" }}
              />
              <button
                className="bg-[#008055] hover:bg-[#0A6647] text-white px-8 py-3 rounded-full transition-colors duration-200 whitespace-nowrap"
                style={{ fontFamily: "Balto Book, Inter, sans-serif" }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p
            className="text-gray-400 text-sm mb-4 md:mb-0"
            style={{ fontFamily: "Balto Book, Inter, sans-serif" }}
          >
            © {currentYear} Prompt Vision. All rights reserved.
          </p>

          <div className="flex items-center space-x-6 text-sm text-gray-400">
            <span style={{ fontFamily: "Balto Book, Inter, sans-serif" }}>
              Made with ❤️ using AI
            </span>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span style={{ fontFamily: "Balto Book, Inter, sans-serif" }}>
                All systems operational
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
