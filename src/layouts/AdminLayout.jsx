import React, { useState } from 'react';
import { Link, NavLink, Outlet, useLocation, Navigate } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';

export default function AdminLayout() {
  const { metrics, isAuthenticated, logoutAdmin } = useAdmin();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Route protection guard
  if (!isAuthenticated && location.pathname !== '/batuul-portal-v1/login') {
    return <Navigate to="/batuul-portal-v1/login" replace />;
  }

  const navItems = [
    { label: 'Overview', path: '/batuul-portal-v1', icon: 'dashboard', exact: true },
    { label: 'Products & Pricing', path: '/batuul-portal-v1/products', icon: 'inventory_2' },
    { label: 'Customer Orders', path: '/batuul-portal-v1/orders', icon: 'shopping_bag', badge: metrics.pendingOrdersCount ? `${metrics.pendingOrdersCount} new` : null },
    { label: 'Inquiries', path: '/batuul-portal-v1/messages', icon: 'mail', badge: metrics.unreadMessagesCount ? `${metrics.unreadMessagesCount}` : null },
  ];

  return (
    <div className="min-h-screen bg-[#071c15] text-[#fbf9f5] flex flex-col font-sans antialiased selection:bg-[#735c00] selection:text-white">
      {/* Sleek Top Bar (Cleaned without top sign out button) */}
      <header className="h-16 bg-[#04120e] border-b border-[#735c00]/20 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-white/80 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
            aria-label="Toggle Navigation"
          >
            <span className="material-symbols-outlined">{mobileMenuOpen ? 'close' : 'menu'}</span>
          </button>

          <Link to="/batuul-portal-v1" className="flex items-center gap-3">
            <span className="font-serif text-xl tracking-wider text-white font-bold">BATUUL</span>
            <span className="text-[10px] tracking-widest uppercase bg-[#735c00] text-white px-2 py-0.5 rounded font-mono font-semibold">
              ADMIN PORTAL
            </span>
          </Link>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Navigation Sidebar */}
        <aside className="hidden lg:flex w-64 bg-[#04120e] border-r border-[#735c00]/20 flex-col justify-between p-4 flex-shrink-0">
          <nav className="space-y-2 mt-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.exact}
                className={({ isActive }) =>
                  `flex items-center justify-between px-4 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                    isActive
                      ? 'bg-[#735c00] text-white shadow-lg shadow-[#735c00]/20'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-xl">{item.icon}</span>
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] font-bold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="pt-4 border-t border-white/10">
            <button
              onClick={logoutAdmin}
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 text-xs font-semibold uppercase tracking-wider text-red-300 hover:text-red-200 bg-red-500/10 hover:bg-red-500/20 rounded-xl border border-red-500/20 transition-colors"
            >
              <span className="material-symbols-outlined text-sm">logout</span>
              Sign Out Admin
            </button>
          </div>
        </aside>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
            <div className="relative w-72 bg-[#04120e] h-full p-6 flex flex-col justify-between z-10 border-r border-[#735c00]/30 shadow-2xl">
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-white/10">
                  <span className="font-serif text-xl tracking-wider text-white font-bold">BATUUL PORTAL</span>
                  <button onClick={() => setMobileMenuOpen(false)} className="text-white/60 hover:text-white">
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </div>
                <nav className="mt-6 space-y-2">
                  {navItems.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      end={item.exact}
                      onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                          isActive
                            ? 'bg-[#735c00] text-white'
                            : 'text-white/70 hover:text-white hover:bg-white/5'
                        }`
                      }
                    >
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-xl">{item.icon}</span>
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="text-[10px] font-bold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </NavLink>
                  ))}
                </nav>
              </div>

              <div className="pt-4 border-t border-white/10">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logoutAdmin();
                  }}
                  className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-red-600 rounded-xl"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Body */}
        <main className="flex-1 overflow-y-auto bg-[#071c15] p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
