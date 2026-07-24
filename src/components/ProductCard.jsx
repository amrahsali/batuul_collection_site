import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingBag, ArrowUpRight } from 'lucide-react';

export default function ProductCard({ product }) {
  const { addToCart, generateWhatsAppLink } = useCart();

  const defaultSize = Array.isArray(product.sizes) ? product.sizes[0] : (product.sizes ? product.sizes.split(', ')[0] : 'Standard');
  const defaultColor = Array.isArray(product.colors) ? product.colors[0] : (product.colors ? product.colors.split(', ')[0] : 'Default');

  const singleItemWhatsAppLink = generateWhatsAppLink([
    {
      ...product,
      selectedSize: defaultSize,
      selectedColor: defaultColor,
      quantity: 1
    }
  ]);

  return (
    <div className="group bg-white rounded-lg overflow-hidden border border-[#bfc9c3]/30 product-card-shadow flex flex-col h-full">
      {/* Product Image Container */}
      <div className="relative aspect-[4/5] bg-[#fbf9f5] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        
        {/* Badge */}
        {product.badge && (
          <span className="absolute top-3 left-3 bg-[#0f4c3a] text-white text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full shadow-sm">
            {product.badge}
          </span>
        )}

        {/* Hover Quick Actions */}
        <div className="absolute inset-0 bg-[#003426]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 p-4">
          <Link
            to={`/product/${product.id}`}
            className="bg-white text-[#003426] p-3 rounded-full hover:bg-[#735c00] hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300 shadow-md"
            title="View Details"
          >
            <ArrowUpRight size={18} />
          </Link>

          <button
            onClick={() => addToCart(product)}
            className="bg-[#0f4c3a] text-white p-3 rounded-full hover:bg-[#003426] transition-all transform translate-y-4 group-hover:translate-y-0 duration-300 shadow-md"
            title="Add to Shopping Bag"
          >
            <ShoppingBag size={18} />
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-5 flex flex-col flex-grow justify-between">
        <div>
          <span className="text-[10px] uppercase font-semibold tracking-widest text-[#735c00]">
            {product.category}
          </span>
          <Link to={`/product/${product.id}`}>
            <h3 className="font-serif text-lg font-semibold text-[#003426] hover:text-[#735c00] transition-colors mt-1 line-clamp-1">
              {product.name}
            </h3>
          </Link>
          <p className="text-xs text-[#404944] mt-1.5 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-[#efeeea] flex items-center justify-between">
          <span className="font-serif text-lg font-bold text-[#003426]">
            ₦{product.price.toLocaleString()}
          </span>

          <a
            href={singleItemWhatsAppLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#25d366] hover:text-[#003513] transition-colors py-1 px-2.5 rounded bg-[#25d366]/10 hover:bg-[#25d366]/20"
          >
            <span className="w-2 h-2 rounded-full bg-[#25d366]"></span>
            Order on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
