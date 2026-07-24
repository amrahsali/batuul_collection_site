import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAdmin } from '../context/AdminContext';
import { Search, X, ArrowRight } from 'lucide-react';

export default function SearchModal() {
  const { isSearchOpen, setIsSearchOpen } = useCart();
  const { products } = useAdmin();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  if (!isSearchOpen) return null;

  const filteredProducts = query.trim() === '' ? [] : products.filter(product =>
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    product.category.toLowerCase().includes(query.toLowerCase()) ||
    (product.description && product.description.toLowerCase().includes(query.toLowerCase()))
  );

  const handleSelectProduct = (productId) => {
    setIsSearchOpen(false);
    setQuery('');
    navigate(`/product/${productId}`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#003426]/70 backdrop-blur-md flex flex-col items-center pt-16 px-4 animate-fadeIn">
      <div className="w-full max-w-3xl bg-[#fbf9f5] rounded-2xl shadow-2xl overflow-hidden border border-[#735c00]/30">
        
        {/* Search Header */}
        <div className="p-6 bg-white border-b border-[#efeeea] flex items-center gap-4">
          <Search size={24} className="text-[#735c00]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Atampa, Lace, Abayas, Handbags..."
            className="flex-1 bg-transparent text-lg font-serif text-[#003426] placeholder-[#707974] focus:outline-none"
            autoFocus
          />
          <button
            onClick={() => { setIsSearchOpen(false); setQuery(''); }}
            className="p-2 text-[#707974] hover:text-[#003426] rounded-full hover:bg-[#efeeea] transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search Results */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {query.trim() === '' ? (
            <div className="text-center py-8 text-[#707974]">
              <p className="font-serif text-base text-[#003426]">Start typing to discover luxury pieces</p>
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {['Atampa', 'Lace', 'Abayas', 'Bags'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-3 py-1 bg-[#efeeea] hover:bg-[#0f4c3a] hover:text-white rounded-full text-xs font-semibold text-[#003426] transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-10 text-[#707974]">
              <p className="font-serif text-base">No results found for "{query}"</p>
            </div>
          ) : (
            <div className="space-y-3">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#735c00] block mb-2">
                {filteredProducts.length} Results Found
              </span>
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleSelectProduct(product.id)}
                  className="flex items-center gap-4 p-3 bg-white rounded-lg border border-[#bfc9c3]/30 hover:border-[#735c00] cursor-pointer transition-all hover:translate-x-1"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-14 h-16 object-cover rounded bg-[#efeeea]"
                  />
                  <div className="flex-1">
                    <span className="text-[10px] uppercase font-semibold text-[#735c00]">
                      {product.category}
                    </span>
                    <h4 className="font-serif text-sm font-semibold text-[#003426]">
                      {product.name}
                    </h4>
                    <p className="text-xs text-[#707974] line-clamp-1">
                      {product.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-serif text-sm font-bold text-[#003426] block">
                      ₦{product.price.toLocaleString()}
                    </span>
                    <ArrowRight size={16} className="text-[#735c00] ml-auto mt-1" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
