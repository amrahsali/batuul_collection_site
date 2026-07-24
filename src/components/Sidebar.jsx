import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CATEGORIES } from '../data/products';
import { useCart } from '../context/CartContext';
import { MessageSquare } from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();
  const { generateWhatsAppLink } = useCart();

  if (location.pathname.startsWith('/batuul-portal-v1')) {
    return null; // Hide Storefront sidebar in Admin layout
  }

  const searchParams = new URLSearchParams(location.search);
  const activeCategory = searchParams.get('category') || 'all';
  const sidebarCategories = CATEGORIES.filter(c => c.id !== 'all');

  return (
    <aside className="hidden lg:flex fixed left-0 top-[88px] bottom-0 w-64 flex-col p-6 border-r border-[#735c00]/20 bg-[#fbf9f5] shadow-sm z-40 overflow-y-auto">
      <div className="mb-6">
        <h3 className="font-serif text-xl font-bold text-[#003426]">Categories</h3>
        <p className="text-xs text-[#404944] opacity-70 mt-0.5">Exquisite Selections</p>
      </div>

      <nav className="flex flex-col space-y-1.5 flex-1">
        {sidebarCategories.map((cat) => {
          const isActive = location.pathname === '/collections' && activeCategory.toLowerCase() === cat.id.toLowerCase();
          return (
            <Link
              key={cat.id}
              to={`/collections?category=${cat.id}`}
              className={`flex items-center gap-3 px-4 py-3 text-xs font-semibold uppercase tracking-wider rounded-full transition-all ${
                isActive
                  ? 'bg-[#0f4c3a]/20 text-[#003426] font-bold translate-x-1'
                  : 'text-[#404944] hover:bg-[#eae8e4] hover:text-[#003426]'
              }`}
            >
              <span className="material-symbols-outlined text-lg" data-icon={cat.icon}>
                {cat.icon}
              </span>
              <span>{cat.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Bottom Action */}
      <div className="pt-6 border-t border-[#bfc9c3]/40 mt-auto">
        <a
          href={generateWhatsAppLink(null, "Hello Batuul Collection, I would like to inquire about your collections.")}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-[#003513] hover:bg-[#004e20] text-white py-3.5 px-5 rounded-full text-xs uppercase font-semibold tracking-wider flex items-center justify-center gap-2 hover:scale-[1.02] transition-all shadow-md"
        >
          <MessageSquare size={16} className="text-[#25d366]" />
          Order on WhatsApp
        </a>
      </div>
    </aside>
  );
}
