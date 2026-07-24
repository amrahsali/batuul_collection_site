import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../context/CartContext';

export default function Footer() {
  const location = useLocation();

  if (location.pathname.startsWith('/batuul-portal-v1')) {
    return null; // Hide Storefront footer when in Admin layout
  }

  const whatsappGroupLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello Batuul Collection, I would like to join your VIP WhatsApp Group for exclusive drops.")}`;

  return (
    <footer className="bg-[#003426] text-white pt-16 pb-8 border-t border-[#735c00]/30 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-white/10">
          
          {/* Brand Info & Social Media Handles */}
          <div className="space-y-4 md:col-span-1">
            <h2 className="font-serif text-2xl font-bold tracking-tight text-white">
              Batuul Collection
            </h2>
            <p className="text-xs text-[#82bba4] leading-relaxed">
              Exquisite modesty meets high fashion. Curated Nigerian Atampa wax, hand-embellished Swiss Voile Lace, and bespoke Saudi Silk Abayas.
            </p>

            {/* Social Media Handles */}
            <div className="pt-3 space-y-2">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#fed65b]">Connect With Us</p>
              <div className="flex items-center gap-3">
                {/* Instagram SVG */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#735c00] text-white flex items-center justify-center transition-colors"
                  title="Instagram: @batuul_collection"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>

                {/* Facebook SVG */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#735c00] text-white flex items-center justify-center transition-colors"
                  title="Facebook: Batuul Collection"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.583 9 4.615V8z"/>
                  </svg>
                </a>
              </div>
              <p className="text-[11px] text-white/70">Instagram: <span className="text-white font-medium">@batuul_collection</span></p>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h3 className="text-xs uppercase font-semibold tracking-widest text-[#fed65b] mb-4">
              Explore Collections
            </h3>
            <ul className="space-y-2.5 text-xs text-white/80">
              <li>
                <Link to="/collections?category=Atampa" className="hover:text-[#fed65b] transition-colors">
                  Atampa Fabric
                </Link>
              </li>
              <li>
                <Link to="/collections?category=Lace" className="hover:text-[#fed65b] transition-colors">
                  Swiss Voile Lace
                </Link>
              </li>
              <li>
                <Link to="/collections?category=Abayas" className="hover:text-[#fed65b] transition-colors">
                  Silk &amp; Velvet Abayas
                </Link>
              </li>
              <li>
                <Link to="/collections?category=Bags" className="hover:text-[#fed65b] transition-colors">
                  Boutique Handbags &amp; Shoes
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-xs uppercase font-semibold tracking-widest text-[#fed65b] mb-4">
              Boutique Care
            </h3>
            <ul className="space-y-2.5 text-xs text-white/80">
              <li>
                <Link to="/about" className="hover:text-[#fed65b] transition-colors">
                  About Our Heritage
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#fed65b] transition-colors">
                  Visit Our Showroom
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#fed65b] transition-colors">
                  Shipping &amp; Delivery
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#fed65b] transition-colors">
                  Bespoke Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* WhatsApp Group Join Section */}
          <div>
            <h3 className="text-xs uppercase font-bold tracking-widest text-[#fed65b] mb-4">
              JOIN OUR WHATSAPP GROUP
            </h3>
            <p className="text-xs text-white/80 mb-4 leading-relaxed">
              Join our exclusive VIP WhatsApp community for instant access to new fabric drops, limited Atampa releases, and private lookbooks.
            </p>
            <a
              href={whatsappGroupLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#25d366] hover:bg-[#20bd5a] text-white py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-105"
            >
              <MessageSquare size={16} />
              JOIN WHATSAPP VIP GROUP
            </a>
          </div>

        </div>

        {/* Copyright & Social handles summary */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-white/50 space-y-4 sm:space-y-0">
          <p>© {new Date().getFullYear()} Batuul Collection Online Boutique. All Rights Reserved.</p>
          <div className="flex space-x-6 text-white/70">
            <span>Instagram: @batuul_collection</span>
            <span>Kaduna Showroom</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
