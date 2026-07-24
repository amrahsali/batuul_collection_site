import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider, useCart } from './context/CartContext';
import { AdminProvider } from './context/AdminContext';
import Header from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import SearchModal from './components/SearchModal';
import HomePage from './pages/HomePage';
import CollectionsPage from './pages/CollectionsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

// Secret Admin Layout & Pages
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminLayout from './layouts/AdminLayout';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminProductsPage from './pages/admin/AdminProductsPage';
import AdminOrdersPage from './pages/admin/AdminOrdersPage';
import AdminMessagesPage from './pages/admin/AdminMessagesPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Sleek, compact circular floating WhatsApp icon button
function FloatingWhatsApp() {
  const { generateWhatsAppLink } = useCart();
  const location = useLocation();

  if (location.pathname.startsWith('/batuul-portal-v1')) {
    return null; // Hide Floating WhatsApp in Secret Admin Portal
  }

  return (
    <a
      href={generateWhatsAppLink(null, "Hello Batuul Collection, I would like to inquire about your modest collections.")}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-40 w-12 h-12 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-110 border border-white/30"
      title="Contact VIP WhatsApp Concierge"
    >
      <span className="w-2.5 h-2.5 rounded-full bg-white absolute top-1 right-1 animate-ping" />
      <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.187-2.59-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793 0-.853.448-1.273.607-1.446.159-.173.346-.217.462-.217.116 0 .231.002.332.007.109.004.258-.041.404.308.145.347.491 1.2.535 1.288.043.087.072.188.014.303-.058.116-.087.188-.173.289l-.26.303c-.087.087-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.174.088.275.073.376-.044.101-.116.433-.506.549-.68.116-.174.231-.145.39-.087.159.058 1.011.477 1.184.564.173.087.289.129.332.202.043.073.043.423-.101.827z"></path>
      </svg>
    </a>
  );
}

function MainLayout() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/batuul-portal-v1');

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf9f5] text-[#1b1c1a]">
      {!isAdmin && <Header />}
      <main className={!isAdmin ? "pt-[60px] flex-grow w-full" : "flex-grow w-full"}>
        <Routes>
          {/* Public Storefront Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/collections" element={<CollectionsPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Secret Admin Authentication Login Route */}
          <Route path="/batuul-portal-v1/login" element={<AdminLoginPage />} />

          {/* Secret Protected Admin Portal Routes */}
          <Route path="/batuul-portal-v1" element={<AdminLayout />}>
            <Route index element={<AdminDashboardPage />} />
            <Route path="products" element={<AdminProductsPage />} />
            <Route path="orders" element={<AdminOrdersPage />} />
            <Route path="messages" element={<AdminMessagesPage />} />
          </Route>
        </Routes>
        {!isAdmin && <Footer />}
      </main>
      {!isAdmin && <CartDrawer />}
      {!isAdmin && <SearchModal />}
      <FloatingWhatsApp />
    </div>
  );
}

export default function App() {
  return (
    <AdminProvider>
      <CartProvider>
        <Router>
          <ScrollToTop />
          <MainLayout />
        </Router>
      </CartProvider>
    </AdminProvider>
  );
}
