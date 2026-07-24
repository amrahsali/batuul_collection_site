import React from 'react';
import { Link } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';
import { useCart } from '../context/CartContext';
import { MessageSquare, ArrowRight, ShoppingBag, Sparkles, MapPin } from 'lucide-react';

export default function HomePage() {
  const { addToCart, generateWhatsAppLink } = useCart();
  const { products } = useAdmin();
  const featuredProducts = products.slice(0, 4);

  const categoryThumbnails = [
    { name: 'Atampa', image: '/assets/atampa.png', tag: 'Traditional Wax' },
    { name: 'Lace', image: '/assets/lace.png', tag: 'Swiss Voile' },
    { name: 'Abayas', image: '/assets/abaya.png', tag: 'Silk & Velvet' },
    { name: 'Bags', image: '/assets/handbag.png', tag: 'Luxury Leather' },
    { name: 'Veils', image: '/assets/atampa.png', tag: 'Silk Chiffon' },
    { name: 'Perfumes', image: '/assets/handbag.png', tag: 'Royal Oud' },
  ];

  return (
    <div className="w-full font-sans antialiased text-[#1b1c1a] bg-[#fbf9f5]">

      {/* 1. Full-Screen (100vh) Hero Runway Cover */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
        {/* Animated Background Woman Image - Full Screen */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/assets/abaya.png"
            alt="Batuul Collection Runway Model"
            className="w-full h-full object-cover origin-center animate-runway-walk filter contrast-[1.05] brightness-90 scale-110"
          />
          {/* Subtle Ambient Lighting Sweep Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-200/15 to-transparent w-1/2 h-full animate-light-sweep pointer-events-none" />
          
          {/* Dark Luxury Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-black/50" />
        </div>

        {/* Hero Editorial Content */}
        <div className="relative z-10 text-center px-6 space-y-6 max-w-4xl mx-auto mt-12">
          
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2 rounded-full border border-white/20 shadow-xl">
            <Sparkles size={14} className="text-[#fed65b] animate-pulse" />
            <span className="font-sans text-[11px] font-bold text-white tracking-[0.35em] uppercase">
              HAUTE MODESTY &amp; BESPOKE TAILORING
            </span>
          </div>

          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl text-white max-w-4xl leading-[1.05] font-bold drop-shadow-2xl mx-auto tracking-tight">
            Batuul Collection
          </h1>

          <p className="text-sm md:text-lg text-white/90 font-sans max-w-xl mx-auto leading-relaxed font-light tracking-wide">
            Curated Hausa Atampa, Embellished Swiss Voile Lace, and Bespoke Saudi Silk Abayas.
          </p>

          <div className="pt-6">
            <Link
              to="/collections"
              className="inline-block bg-[#003426] hover:bg-[#735c00] text-white text-xs font-bold uppercase tracking-[0.25em] px-12 py-5 transition-all shadow-2xl border border-white/20 hover:scale-105"
            >
              EXPLORE LOOKBOOK
            </Link>
          </div>
        </div>

        {/* Floating Bottom Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-center text-white/60 animate-bounce">
          <span className="text-[10px] uppercase font-bold tracking-widest block mb-1">Scroll to Explore</span>
          <span className="material-symbols-outlined text-sm">expand_more</span>
        </div>
      </section>

      {/* 2. Sleek Horizontal Category Bar (Below Full-Screen Hero) */}
      <section className="bg-[#003426] text-white py-10 border-b border-[#735c00]/40 shadow-xl">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#fed65b] animate-ping" />
              <h2 className="text-xs uppercase font-bold tracking-[0.25em] text-[#fed65b]">
                BOUTIQUE COLLECTIONS
              </h2>
            </div>
            <Link to="/collections" className="text-[11px] font-bold text-white/70 hover:text-white uppercase tracking-widest flex items-center gap-1">
              <span>View All</span>
              <ArrowRight size={12} />
            </Link>
          </div>

          {/* Categories Grid Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categoryThumbnails.map((cat) => (
              <Link
                key={cat.name}
                to={`/collections?category=${cat.name}`}
                className="group relative h-28 rounded-xl overflow-hidden border border-white/10 hover:border-[#fed65b] transition-all flex flex-col justify-end p-3 shadow-md"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-70 group-hover:opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="relative z-10">
                  <p className="text-[9px] uppercase font-bold text-amber-300 tracking-wider">{cat.tag}</p>
                  <h3 className="font-serif font-bold text-sm text-white group-hover:text-[#fed65b] transition-colors">{cat.name}</h3>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* 3. Featured Arrivals Grid */}
      <section className="px-6 md:px-16 py-20 max-w-[1280px] mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#bfc9c3]/30 pb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#735c00]">
              CURATED SELECTION
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#003426] mt-1">
              Featured Luxury Pieces
            </h2>
          </div>
          <Link
            to="/collections"
            className="text-xs font-bold uppercase tracking-widest text-[#735c00] hover:text-[#003426] transition-colors flex items-center gap-1"
          >
            <span>EXPLORE CATALOGUE</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <div key={product.id} className="group bg-white rounded-2xl overflow-hidden border border-[#bfc9c3]/30 product-card-shadow flex flex-col justify-between">
              <div className="aspect-[4/5] bg-[#fbf9f5] relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {product.badge && (
                  <span className="absolute top-3 left-3 bg-[#0f4c3a] text-white text-[9px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full shadow-sm">
                    {product.badge}
                  </span>
                )}
                <button
                  onClick={() => addToCart(product)}
                  className="absolute bottom-0 left-0 right-0 bg-[#003426] text-white font-bold text-[10px] uppercase tracking-widest py-3.5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-center gap-2"
                >
                  <ShoppingBag size={14} />
                  ADD TO CART
                </button>
              </div>

              <div className="p-5 space-y-3">
                <div>
                  <span className="text-[10px] uppercase font-semibold tracking-widest text-[#735c00]">
                    {product.category}
                  </span>
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-serif text-base font-bold text-[#003426] hover:text-[#735c00] transition-colors mt-0.5 line-clamp-1">
                      {product.name}
                    </h3>
                  </Link>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#efeeea]">
                  <span className="font-serif text-lg font-bold text-[#003426]">
                    ₦{product.price.toLocaleString()}
                  </span>

                  <a
                    href={generateWhatsAppLink([{ ...product, quantity: 1 }])}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-[#25d366] bg-[#25d366]/10 hover:bg-[#25d366]/20 px-2.5 py-1 rounded-lg transition-colors"
                  >
                    <MessageSquare size={12} />
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Boutique Heritage Story */}
      <section className="bg-[#f5f3ef] py-20 border-y border-[#bfc9c3]/30">
        <div className="px-6 md:px-16 max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[#735c00]">
                AUTHENTIC NIGERIAN CRAFTSMANSHIP
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#003426] leading-tight">
                Embrace the Royal Legacy of Batuul
              </h2>
              <p className="text-sm text-[#404944] leading-relaxed font-light">
                Hand-selected Hausa Atampa wax cotton, imported Swiss Voile lace embellished with crystals, and bespoke Saudi silk velvet abayas designed to celebrate elegance and modesty.
              </p>
              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#003426] border-b-2 border-[#735c00] pb-1 hover:text-[#735c00] transition-colors"
                >
                  <span>OUR HERITAGE STORY</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-[#bfc9c3]/40">
                <img src="/assets/atampa.png" alt="Batuul Heritage Fabrics" className="w-full h-full object-cover" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Flagship Store Location */}
      <section className="bg-[#efeeea] min-h-[380px] flex flex-col md:flex-row">
        <div className="md:w-1/2 p-8 md:p-16 flex flex-col justify-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#735c00]">
            VISIT OUR SHOWROOM
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#003426]">
            Kaduna Flagship Boutique
          </h2>
          <p className="text-xs text-[#404944] max-w-md leading-relaxed">
            Experience the texture, touch, and drape of our fabrics in person at our luxury Kaduna showroom.
          </p>

          <div className="flex items-start gap-4 pt-2">
            <MapPin className="text-[#735c00] shrink-0 mt-1" size={20} />
            <div>
              <p className="text-sm font-bold text-[#003426]">Batuul Collection Boutique</p>
              <p className="text-xs text-[#404944] mt-0.5">Amsocco Plaza, opposite 24 Complex, Murtala Square, Kaduna, Nigeria</p>
            </div>
          </div>
        </div>

        <div className="md:w-1/2 p-8 md:p-12 bg-[#003426] flex items-center justify-center relative overflow-hidden border-t md:border-t-0 md:border-l border-[#735c00]/30">
          <div className="absolute inset-0 bg-[radial-gradient(#735c00_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />
          <div className="relative z-10 w-full max-w-sm aspect-square p-4 rounded-full bg-black/40 border-2 border-[#735c00]/50 shadow-2xl flex items-center justify-center group">
            <img
              src="/assets/batuul_logo_seal.jpg"
              alt="Batuul Collections Official Seal & Contact"
              className="w-full h-full object-cover rounded-full shadow-inner transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>
      </section>

    </div>
  );
}
