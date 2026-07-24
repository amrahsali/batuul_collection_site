import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-6 lg:px-16 space-y-20">
      
      {/* Editorial Hero Section */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-5 order-2 md:order-1 space-y-6">
          <span className="text-xs font-semibold text-[#735c00] uppercase tracking-[0.2em] block">
            OUR IDENTITY
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#003426] leading-tight">
            A Legacy of Grace & Modesty
          </h1>
          <p className="text-base text-[#404944] leading-relaxed font-sans font-light">
            Batuul Collection was born from a vision to redefine luxury for the modern woman. We believe that true elegance lies in the intersection of traditional values and contemporary fashion sensibilities.
          </p>
          <div>
            <Link
              to="/collections"
              className="inline-flex items-center gap-3 bg-[#003426] text-white px-8 py-4 text-xs font-semibold uppercase tracking-widest hover:bg-[#003513] transition-all"
            >
              VIEW COLLECTIONS
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <div className="md:col-span-7 order-1 md:order-2">
          <div className="aspect-[4/5] bg-[#efeeea] overflow-hidden rounded-lg shadow-xl border border-[#bfc9c3]/30">
            <img
              src="/assets/abaya.png"
              alt="Batuul Collection Identity"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Our Story Content */}
      <section className="bg-[#f5f3ef] py-16 px-8 md:px-16 rounded-2xl border-y border-[#735c00]/20 space-y-12">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <span className="text-xs font-semibold text-[#735c00] uppercase tracking-widest">HERITAGE</span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#003426]">Our Story</h2>
          <div className="w-16 h-[2px] bg-[#735c00] mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-sm text-[#404944] leading-relaxed">
          <div className="space-y-6">
            <p>
              Founded in the heart of cultural refinement, Batuul Collection began as a dedicated boutique sourcing the finest fabrics for bespoke modest attire. Our passion for textiles led to traveling across the globe, seeking out delicate silks, resilient linens, and intricate Swiss lace.
            </p>
            <p>
              Every piece in our collection is a testament to craftsmanship. We work with master artisans who have spent generations perfecting embroidery techniques, ensuring that every stitch tells a story of heritage and pride.
            </p>
          </div>

          <div className="space-y-6">
            <p>
              At Batuul, we don't just sell clothing; we curate an experience. We understand that our clients seek more than just fashion—they seek an expression of their identity that respects their values without compromising on style.
            </p>
            <div className="border-l-2 border-[#735c00] pl-6 py-2 italic font-serif text-[#003426] text-base">
              "Luxury is not about being noticed, it's about being remembered. Our mission is to provide every woman with attire that makes her feel empowered and beautiful in her own skin."
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
