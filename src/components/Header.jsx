import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Header() {
  const { cartCount, setIsCartOpen, setIsSearchOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Collections', path: '/collections' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  if (location.pathname.startsWith('/batuul-portal-v1')) {
    return null; // Admin layout has its own dedicated header
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'scrolled-nav shadow-sm bg-[#fbf9f5]/90 backdrop-blur-md' : 'bg-[#fbf9f5]'
    }`}>
      <nav className="flex items-center justify-between w-full px-6 lg:px-16 py-3 max-w-[1280px] mx-auto">

        {/* Left Nav Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className={`text-[11px] font-semibold uppercase tracking-[0.1em] transition-colors duration-300 ${
              location.pathname === '/'
                ? 'text-[#003426] border-b border-[#735c00] pb-0.5'
                : 'text-[#404944] hover:text-[#735c00]'
            }`}
          >Home</Link>
          <Link
            to="/collections"
            className={`text-[11px] font-semibold uppercase tracking-[0.1em] transition-colors duration-300 ${
              location.pathname === '/collections'
                ? 'text-[#003426] border-b border-[#735c00] pb-0.5'
                : 'text-[#404944] hover:text-[#735c00]'
            }`}
          >Collections</Link>
          <Link
            to="/about"
            className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#404944] hover:text-[#735c00] transition-colors duration-300"
          >About</Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#003426]"
          aria-label="Toggle menu"
        >
          <span className="material-symbols-outlined">{mobileMenuOpen ? 'close' : 'menu'}</span>
        </button>

        {/* Center Brand */}
        <Link to="/" className="text-center">
          <span className="font-serif text-2xl lg:text-[2.2rem] leading-none text-[#003426] tracking-tight font-bold">
            Batuul Collection
          </span>
        </Link>

        {/* Right Nav + Icons */}
        <div className="flex items-center gap-5">
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/contact"
              className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#404944] hover:text-[#735c00] transition-colors duration-300"
            >Contact</Link>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="scale-100 hover:scale-110 transition-transform text-[#003426]"
              title="Search"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>search</span>
            </button>
            <button
              onClick={() => setIsCartOpen(true)}
              className="scale-100 hover:scale-110 transition-transform text-[#003426] relative"
              title="Shopping Bag"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>shopping_bag</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#735c00] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#fbf9f5] border-t border-[#bfc9c3]/40 px-6 py-4 flex flex-col gap-3">
          {navLinks.map(link => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`text-sm font-semibold uppercase tracking-wider py-2 px-3 rounded-md transition-colors ${
                location.pathname === link.path ? 'bg-[#0f4c3a] text-white' : 'text-[#003426] hover:bg-[#efeeea]'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
