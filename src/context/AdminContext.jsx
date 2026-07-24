import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS as INITIAL_PRODUCTS } from '../data/products';
import { db } from '../config/firebase';
import { collection, onSnapshot, doc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';

const AdminContext = createContext();

const enhancedProducts = INITIAL_PRODUCTS.map((p, idx) => ({
  ...p,
  stock: p.stock ?? (idx === 0 ? 12 : idx === 1 ? 4 : idx === 2 ? 25 : idx === 3 ? 2 : 18),
  sku: `BTC-${p.category.substring(0, 3).toUpperCase()}-${100 + idx}`,
  createdDate: '2026-07-20'
}));

const INITIAL_ORDERS = [
  {
    id: "ORD-1001",
    customerName: "Amina Bello",
    phone: "+2348031234567",
    email: "amina.bello@example.com",
    address: "14 Maitama Avenue, Abuja",
    items: [
      { id: "royal-rose-lace", name: "Royal Rose Lace", quantity: 1, price: 85000, image: "/assets/lace.png" },
      { id: "sultana-evening-bag", name: "Sultana Evening Bag", quantity: 1, price: 32000, image: "/assets/handbag.png" }
    ],
    totalAmount: 117000,
    paymentMethod: "Bank Transfer",
    paymentStatus: "Paid",
    status: "Processing",
    date: "2026-07-23 14:30"
  },
  {
    id: "ORD-1002",
    customerName: "Fatima Al-Hassan",
    phone: "+2348029876543",
    email: "fatima.hassan@example.com",
    address: "28 Victoria Island, Lagos",
    items: [
      { id: "noor-velvet-abaya", name: "Noor Velvet Abaya", quantity: 2, price: 45000, image: "/assets/abaya.png" }
    ],
    totalAmount: 90000,
    paymentMethod: "Card",
    paymentStatus: "Paid",
    status: "Pending",
    date: "2026-07-23 16:45"
  }
];

const INITIAL_MESSAGES = [
  {
    id: "MSG-201",
    name: "Zubaida Mahmoud",
    email: "zubaida.m@example.com",
    phone: "+2348033334444",
    subject: "Custom Lace Tailoring Inquiry",
    message: "Assalamu Alaikum, do you offer bespoke tailoring services for the Royal Rose Lace if I order 3 sets for a wedding?",
    date: "2026-07-23 18:20",
    status: "Unread"
  }
];

export function AdminProvider({ children }) {
  // Load products from localStorage or initial products
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('batuul_products');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {}
    return enhancedProducts;
  });

  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('batuul_orders');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return INITIAL_ORDERS;
  });

  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem('batuul_messages');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return INITIAL_MESSAGES;
  });

  // Save products to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem('batuul_products', JSON.stringify(products));
    } catch (e) {}
  }, [products]);

  // Save orders to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem('batuul_orders', JSON.stringify(orders));
    } catch (e) {}
  }, [orders]);

  // Save messages to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem('batuul_messages', JSON.stringify(messages));
    } catch (e) {}
  }, [messages]);

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('batuul_admin_auth') === 'true';
  });

  const loginAdmin = (email, password) => {
    if (password === 'batuul2026' || password === 'admin123') {
      sessionStorage.setItem('batuul_admin_auth', 'true');
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    sessionStorage.removeItem('batuul_admin_auth');
    setIsAuthenticated(false);
  };

  // Firestore Synchronization
  useEffect(() => {
    try {
      const unsub = onSnapshot(collection(db, 'products'), (snapshot) => {
        if (!snapshot.empty) {
          const remoteProducts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setProducts(prev => {
            // Merge remote products with local state without losing items
            const map = new Map();
            prev.forEach(p => map.set(p.id, p));
            remoteProducts.forEach(p => map.set(p.id, p));
            return Array.from(map.values());
          });
        }
      }, (error) => {
        console.warn('Firestore fallback mode:', error.message);
      });
      return () => unsub();
    } catch (e) {
      console.warn('Firestore fallback mode active.');
    }
  }, []);

  // Product CRUD (Syncs to Firestore & local state)
  const addProduct = async (newProduct) => {
    const id = newProduct.id || `${newProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now()}`;
    const sku = `BTC-${(newProduct.category || 'GEN').substring(0, 3).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;
    const productToAdd = {
      ...newProduct,
      id,
      sku,
      price: Number(newProduct.price) || 0,
      stock: Number(newProduct.stock) || 0,
      rating: 5.0,
      reviews: 0,
      image: newProduct.image || "/assets/atampa.png",
      createdDate: new Date().toISOString().split('T')[0]
    };

    setProducts(prev => [productToAdd, ...prev.filter(p => p.id !== id)]);

    try {
      await setDoc(doc(db, 'products', id), productToAdd);
    } catch (e) {
      console.warn('Saved to local storage (Firestore write queued)');
    }
    return productToAdd;
  };

  const updateProduct = async (id, updatedFields) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updatedFields } : p));
    try {
      await updateDoc(doc(db, 'products', id), updatedFields);
    } catch (e) {
      console.warn('Saved locally');
    }
  };

  const deleteProduct = async (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    try {
      await deleteDoc(doc(db, 'products', id));
    } catch (e) {
      console.warn('Saved locally');
    }
  };

  const updateStock = async (id, stockDelta) => {
    setProducts(prev => prev.map(p => {
      if (p.id === id) {
        const newStock = Math.max(0, p.stock + stockDelta);
        const updated = { ...p, stock: newStock };
        try {
          updateDoc(doc(db, 'products', id), { stock: newStock });
        } catch (e) {}
        return updated;
      }
      return p;
    }));
  };

  // Order Operations
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  const addOrder = (orderData) => {
    const newId = `ORD-${1000 + orders.length + 1}`;
    const newOrder = {
      id: newId,
      ...orderData,
      date: new Date().toLocaleString(),
      status: "Pending",
      paymentStatus: orderData.paymentStatus || "Paid"
    };
    setOrders(prev => [newOrder, ...prev]);
  };

  // Messages Operations
  const markMessageAsResponded = (msgId) => {
    setMessages(prev => prev.map(m => m.id === msgId ? { ...m, status: "Responded" } : m));
  };

  const addMessage = (msgData) => {
    const newMsg = {
      id: `MSG-${200 + messages.length + 1}`,
      ...msgData,
      date: new Date().toLocaleString(),
      status: "Unread"
    };
    setMessages(prev => [newMsg, ...prev]);
  };

  // WhatsApp Customer Notification Builder
  const generateOrderWhatsAppNotifyLink = (order) => {
    if (!order) return '#';
    let text = `Hello ${order.customerName},\n\n`;
    text += `✨ *Batuul Collection Update* ✨\n`;
    text += `Your Order *#${order.id}* status has been updated to: *${order.status.toUpperCase()}*.\n\n`;
    text += `*Order Items:*\n`;
    order.items.forEach(item => {
      text += `• ${item.name} (x${item.quantity}) - ₦${item.price.toLocaleString()}\n`;
    });
    text += `\n*Total Amount:* ₦${order.totalAmount.toLocaleString()}\n`;
    text += `\nThank you for choosing Batuul Collection Modest Luxury. For any questions, reply to this chat.`;

    const cleanPhone = order.phone.replace(/[^0-9]/g, '');
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
  };

  // Calculated Metrics
  const totalRevenue = orders.reduce((acc, curr) => acc + (curr.paymentStatus === 'Paid' ? curr.totalAmount : 0), 0);
  const pendingOrdersCount = orders.filter(o => o.status === 'Pending').length;
  // Show products with stock <= 10 sorted by lowest stock first
  const lowStockProducts = products
    .filter(p => p.stock <= 10)
    .sort((a, b) => a.stock - b.stock);
  const unreadMessagesCount = messages.filter(m => m.status === 'Unread').length;

  return (
    <AdminContext.Provider
      value={{
        products,
        orders,
        messages,
        isAuthenticated,
        loginAdmin,
        logoutAdmin,
        addProduct,
        updateProduct,
        deleteProduct,
        updateStock,
        updateOrderStatus,
        addOrder,
        markMessageAsResponded,
        addMessage,
        generateOrderWhatsAppNotifyLink,
        metrics: {
          totalRevenue,
          totalOrders: orders.length,
          pendingOrdersCount,
          totalProducts: products.length,
          lowStockCount: lowStockProducts.length,
          lowStockProducts,
          unreadMessagesCount
        }
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
