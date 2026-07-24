import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const WHATSAPP_NUMBER = "2348035733571";

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('batuul_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('batuul_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, selectedSize = null, selectedColor = null, quantity = 1) => {
    const itemKey = `${product.id}-${selectedSize || product.sizes[0] || 'default'}-${selectedColor || product.colors[0] || 'default'}`;
    
    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(item => item.key === itemKey);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prevCart,
          {
            ...product,
            key: itemKey,
            selectedSize: selectedSize || product.sizes[0] || 'Standard',
            selectedColor: selectedColor || product.colors[0] || 'Default',
            quantity
          }
        ];
      }
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (itemKey) => {
    setCart(prevCart => prevCart.filter(item => item.key !== itemKey));
  };

  const updateQuantity = (itemKey, delta) => {
    setCart(prevCart => 
      prevCart.map(item => {
        if (item.key === itemKey) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  const generateWhatsAppLink = (itemsToOrder = cart, customMessage = "") => {
    if (customMessage) {
      return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(customMessage)}`;
    }

    if (!itemsToOrder || itemsToOrder.length === 0) {
      return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello Batuul Collection, I would like to inquire about your luxury modest collection.")}`;
    }

    let message = `*✨ New Order Inquiry - Batuul Collection Online Boutique*\n\n`;
    message += `Hello, I would like to place an order for the following item(s):\n\n`;

    itemsToOrder.forEach((item, index) => {
      message += `${index + 1}. *${item.name}*\n`;
      message += `   • Size: ${item.selectedSize}\n`;
      message += `   • Color: ${item.selectedColor}\n`;
      message += `   • Quantity: ${item.quantity}\n`;
      message += `   • Price: ₦${(item.price * item.quantity).toLocaleString()}\n\n`;
    });

    const total = itemsToOrder.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    message += `*Total Amount:* ₦${total.toLocaleString()}\n\n`;
    message += `Please confirm availability and payment instructions. Thank you!`;

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartTotal,
      cartCount,
      isCartOpen,
      setIsCartOpen,
      isSearchOpen,
      setIsSearchOpen,
      generateWhatsAppLink
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
