import React from 'react';
import { useCart } from '../context/CartContext';
import { X, Trash2, Plus, Minus, MessageSquare, ShoppingBag } from 'lucide-react';

export default function CartDrawer() {
  const { cart, removeFromCart, updateQuantity, cartTotal, isCartOpen, setIsCartOpen, generateWhatsAppLink } = useCart();

  if (!isCartOpen) return null;

  const whatsappCheckoutLink = generateWhatsAppLink();

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop Overlay */}
      <div 
        className="absolute inset-0 bg-[#003426]/40 backdrop-blur-sm transition-opacity animate-fadeIn"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#fbf9f5] shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-6 bg-[#003426] text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShoppingBag size={22} className="text-[#fed65b]" />
              <h2 className="font-serif text-xl font-bold tracking-wide">Shopping Bag</h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-[#404944] space-y-4 py-12">
                <div className="w-16 h-16 rounded-full bg-[#efeeea] flex items-center justify-center text-[#735c00]">
                  <ShoppingBag size={32} />
                </div>
                <div>
                  <p className="font-serif text-lg font-semibold text-[#003426]">Your shopping bag is empty</p>
                  <p className="text-xs text-[#707974] mt-1 max-w-xs">
                    Explore our exquisite Atampa, Lace, and Silk Abayas to add luxury to your wardrobe.
                  </p>
                </div>
              </div>
            ) : (
              cart.map((item) => (
                <div 
                  key={item.key}
                  className="flex gap-4 p-4 bg-white rounded-lg border border-[#bfc9c3]/30 shadow-sm"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-24 object-cover rounded-md bg-[#efeeea]"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-serif text-sm font-semibold text-[#003426] line-clamp-1">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.key)}
                          className="text-[#707974] hover:text-[#ba1a1a] p-1 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <p className="text-[11px] text-[#735c00] font-medium mt-0.5">
                        Size: {item.selectedSize} | Color: {item.selectedColor}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-[#bfc9c3] rounded-md overflow-hidden bg-[#fbf9f5]">
                        <button
                          onClick={() => updateQuantity(item.key, -1)}
                          className="px-2 py-1 text-[#003426] hover:bg-[#efeeea] transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="px-3 text-xs font-semibold text-[#003426]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.key, 1)}
                          className="px-2 py-1 text-[#003426] hover:bg-[#efeeea] transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <span className="font-serif text-sm font-bold text-[#003426]">
                        ₦{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout */}
          {cart.length > 0 && (
            <div className="p-6 bg-white border-t border-[#bfc9c3]/40 space-y-4">
              <div className="flex items-center justify-between text-[#003426]">
                <span className="text-xs uppercase font-semibold tracking-wider">Total</span>
                <span className="font-serif text-2xl font-bold">₦{cartTotal.toLocaleString()}</span>
              </div>

              <p className="text-[11px] text-[#707974] text-center">
                Orders are processed instantly via our personal WhatsApp VIP concierge service.
              </p>

              <a
                href={whatsappCheckoutLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 bg-[#25d366] hover:bg-[#20ba5a] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 text-sm uppercase tracking-wider"
              >
                <MessageSquare size={20} />
                Order on WhatsApp
              </a>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
