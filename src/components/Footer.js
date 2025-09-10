import React from 'react';
import { Link } from 'react-router-dom';
import { 
  InstagramIcon, 
  FacebookIcon, 
  TwitterIcon, 
  YoutubeIcon, 
  LinkedinIcon,
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  LogoIcon
} from '../assets/Icons';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    shop: [
      { name: 'Women', href: '/products?category=women' },
      { name: 'Men', href: '/products?category=men' },
      { name: 'Accessories', href: '/products?category=accessories' },
      { name: 'New Arrivals', href: '/products?category=new' },
      { name: 'Sale', href: '/products?category=sale' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press', href: '/press' },
      { name: 'Sustainability', href: '/sustainability' },
    ],
    support: [
      { name: 'Contact Us', href: '/contact' },
      { name: 'Size Guide', href: '/size-guide' },
      { name: 'Shipping Info', href: '/shipping' },
      { name: 'Returns', href: '/returns' },
      { name: 'FAQ', href: '/faq' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
    ]
  };

  const socialLinks = [
    { name: 'Instagram', icon: InstagramIcon, href: 'https://instagram.com/houseoftrendoz' },
    { name: 'Facebook', icon: FacebookIcon, href: 'https://facebook.com/houseoftrendoz' },
    { name: 'Twitter', icon: TwitterIcon, href: 'https://twitter.com/houseoftrendoz' },
    { name: 'YouTube', icon: YoutubeIcon, href: 'https://youtube.com/houseoftrendoz' },
    { name: 'LinkedIn', icon: LinkedinIcon, href: 'https://linkedin.com/company/houseoftrendoz' },
  ];

  return (
    <footer className="bg-luxury-black text-white">
      {/* Newsletter Section */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h3 className="text-2xl font-serif font-light mb-4">Stay Connected</h3>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter for exclusive offers, style tips, and early access to new collections.
            </p>
            <form className="max-w-md mx-auto flex gap-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-luxury-gold focus:border-transparent"
              />
              <button type="submit" className="btn-gold">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center mb-6">
              <LogoIcon className="w-10 h-10" />
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">
              House of Trendoz - Where contemporary style meets timeless elegance. 
              Discover luxury fashion that defines your unique personality.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-400">
                <MailIcon />
                <span className="text-sm">hello@houseoftrendoz.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <PhoneIcon />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <MapPinIcon />
                <span className="text-sm">New York, NY</span>
              </div>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="text-lg font-medium mb-6">Shop</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-gray-400 hover:text-luxury-gold transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-lg font-medium mb-6">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-gray-400 hover:text-luxury-gold transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-lg font-medium mb-6">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-gray-400 hover:text-luxury-gold transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-lg font-medium mb-6">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-gray-400 hover:text-luxury-gold transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            
            {/* Copyright */}
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} House of Trendoz. All rights reserved.
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-6">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-luxury-gold transition-colors duration-300"
                    aria-label={social.name}
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                );
              })}
            </div>

            {/* Payment Methods */}
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <span className="text-gray-400 text-sm">We accept:</span>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-5 bg-gray-700 rounded flex items-center justify-center">
                  <span className="text-xs text-white">VISA</span>
                </div>
                <div className="w-8 h-5 bg-gray-700 rounded flex items-center justify-center">
                  <span className="text-xs text-white">MC</span>
                </div>
                <div className="w-8 h-5 bg-gray-700 rounded flex items-center justify-center">
                  <span className="text-xs text-white">AMEX</span>
                </div>
                <div className="w-8 h-5 bg-gray-700 rounded flex items-center justify-center">
                  <span className="text-xs text-white">PP</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;