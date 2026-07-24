import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import { ShoppingBag, MessageSquare, Star, ShieldCheck, Truck, ArrowLeft } from 'lucide-react';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { products } = useAdmin();
  const product = products.find(p => p.id === id) || products[0];
  const { addToCart, generateWhatsAppLink } = useCart();

  const sizesArray = Array.isArray(product?.sizes) ? product.sizes : (product?.sizes ? product.sizes.split(', ') : ['Standard']);
  const colorsArray = Array.isArray(product?.colors) ? product.colors : (product?.colors ? product.colors.split(', ') : ['Default']);

  const [selectedSize, setSelectedSize] = useState(sizesArray[0] || 'Standard');
  const [selectedColor, setSelectedColor] = useState(colorsArray[0] || 'Default');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('details');

  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const directWhatsAppLink = generateWhatsAppLink([
    {
      ...product,
      selectedSize,
      selectedColor,
      quantity
    }
  ]);

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Back Link */}
      <div>
        <Link
          to="/collections"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#735c00] hover:text-[#003426] transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Catalogue
        </Link>
      </div>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Gallery Image */}
        <div className="lg:col-span-7 space-y-4">
          <div className="aspect-[4/5] bg-white rounded-2xl overflow-hidden shadow-lg border border-[#bfc9c3]/30">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Product Details & Selection */}
        <div className="lg:col-span-5 space-y-6">
          
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-[#735c00]">
              {product.category}
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#003426] mt-1">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-3">
              <div className="flex text-[#735c00]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-current" />
                ))}
              </div>
              <span className="text-xs text-[#707974]">
                {product.rating || '5.0'} ({product.reviews || 0} reviews)
              </span>
            </div>

            <div className="mt-4 pt-4 border-t border-[#efeeea]">
              <span className="font-serif text-3xl font-bold text-[#003426]">
                ₦{product.price.toLocaleString()}
              </span>
              <span className="text-xs text-[#707974] block mt-1">
                Taxes included. Free delivery on orders over ₦150,000.
              </span>
            </div>
          </div>

          {/* Size Selector */}
          {sizesArray.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs uppercase font-semibold text-[#003426] tracking-wider block">
                Select Length / Size: <span className="font-bold text-[#735c00]">{selectedSize}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {sizesArray.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 text-xs font-semibold rounded-lg border transition-all ${
                      selectedSize === size
                        ? 'border-[#0f4c3a] bg-[#0f4c3a] text-white shadow-sm'
                        : 'border-[#bfc9c3] bg-white text-[#003426] hover:border-[#735c00]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="space-y-2">
            <label className="text-xs uppercase font-semibold text-[#003426] tracking-wider block">
              Quantity
            </label>
            <div className="inline-flex items-center border border-[#bfc9c3] rounded-lg bg-white overflow-hidden">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 text-sm text-[#003426] hover:bg-[#efeeea] transition-colors"
              >
                -
              </button>
              <span className="px-5 text-sm font-semibold text-[#003426]">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-2 text-sm text-[#003426] hover:bg-[#efeeea] transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4">
            <button
              onClick={() => addToCart(product, selectedSize, selectedColor, quantity)}
              className="w-full py-4 bg-[#0f4c3a] hover:bg-[#003426] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 text-xs uppercase tracking-widest"
            >
              <ShoppingBag size={18} />
              Add to Shopping Bag
            </button>

            <a
              href={directWhatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 bg-[#25d366] hover:bg-[#20ba5a] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 text-xs uppercase tracking-widest"
            >
              <MessageSquare size={18} />
              Order Immediately on WhatsApp
            </a>
          </div>

          {/* Guarantees */}
          <div className="pt-6 border-t border-[#efeeea] space-y-3 text-xs text-[#404944]">
            <div className="flex items-center gap-3">
              <ShieldCheck size={18} className="text-[#735c00]" />
              <span>Guaranteed Grade 1 Premium Wax Cotton & Authentic Silk</span>
            </div>
            <div className="flex items-center gap-3">
              <Truck size={18} className="text-[#735c00]" />
              <span>Express Delivery with Tracking across all Nigerian States</span>
            </div>
          </div>

        </div>
      </div>

      {/* Tabs Section for Specs & Fabric Details */}
      <div className="bg-white rounded-2xl p-8 border border-[#bfc9c3]/30 shadow-sm space-y-6">
        <div className="flex border-b border-[#efeeea] space-x-8">
          <button
            onClick={() => setActiveTab('details')}
            className={`pb-3 text-xs font-semibold uppercase tracking-wider transition-colors ${
              activeTab === 'details'
                ? 'text-[#003426] border-b-2 border-[#735c00]'
                : 'text-[#707974] hover:text-[#003426]'
            }`}
          >
            Fabric & Craftsmanship
          </button>
          <button
            onClick={() => setActiveTab('care')}
            className={`pb-3 text-xs font-semibold uppercase tracking-wider transition-colors ${
              activeTab === 'care'
                ? 'text-[#003426] border-b-2 border-[#735c00]'
                : 'text-[#707974] hover:text-[#003426]'
            }`}
          >
            Care Instructions
          </button>
        </div>

        {activeTab === 'details' ? (
          <div className="space-y-4 text-sm text-[#404944] leading-relaxed">
            <p>{product.description}</p>
            <div className="p-4 bg-[#fbf9f5] rounded-lg border border-[#bfc9c3]/30 space-y-2">
              <h4 className="font-serif font-bold text-[#003426]">Specifications</h4>
              <p className="text-xs"><strong className="text-[#735c00]">Material:</strong> {product.fabricDetails}</p>
              <p className="text-xs"><strong className="text-[#735c00]">Colors Available:</strong> {colorsArray.join(', ')}</p>
            </div>
          </div>
        ) : (
          <div className="space-y-3 text-sm text-[#404944]">
            <p className="text-xs leading-relaxed">{product.careInstructions}</p>
          </div>
        )}
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="space-y-8">
          <h2 className="font-serif text-2xl font-bold text-[#003426]">
            Complete Your Look
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
