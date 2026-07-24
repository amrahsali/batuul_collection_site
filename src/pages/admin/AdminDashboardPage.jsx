import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';

export default function AdminDashboardPage() {
  const { metrics, orders, products, generateOrderWhatsAppNotifyLink } = useAdmin();

  const recentOrders = orders.slice(0, 5);

  // Dynamic Category Sales / Inventory Distribution Calculation
  const categoryStats = useMemo(() => {
    // Build quick product id -> category lookup map
    const productCategoryMap = {};
    products.forEach(p => {
      if (p.id && p.category) {
        productCategoryMap[p.id] = p.category;
      }
    });

    // Initialize all boutique categories
    const totalsByCategory = {
      'Abayas': 0,
      'Atampa': 0,
      'Lace': 0,
      'Shoes': 0,
      'Bags': 0,
      'Veils': 0,
      'Perfumes': 0,
    };

    let grandTotal = 0;

    // 1. Calculate sales revenue from orders matching product category
    orders.forEach(order => {
      order.items?.forEach(item => {
        const cat = item.category || productCategoryMap[item.id] || 'Abayas';
        const revenue = (item.price || 0) * (item.quantity || 1);
        totalsByCategory[cat] = (totalsByCategory[cat] || 0) + revenue;
        grandTotal += revenue;
      });
    });

    // 2. If no order revenue accumulated yet, calculate catalog stock value
    if (grandTotal === 0) {
      products.forEach(product => {
        const cat = product.category || 'Abayas';
        const catalogValue = (product.price || 0) * (product.stock || 1);
        totalsByCategory[cat] = (totalsByCategory[cat] || 0) + catalogValue;
        grandTotal += catalogValue;
      });
    }

    const colors = {
      'Abayas': 'bg-emerald-500',
      'Atampa': 'bg-[#735c00]',
      'Lace': 'bg-blue-500',
      'Shoes': 'bg-amber-400',
      'Bags': 'bg-purple-500',
      'Perfumes': 'bg-indigo-500',
      'Veils': 'bg-rose-500',
    };

    return Object.entries(totalsByCategory).map(([category, amount]) => {
      const percentage = grandTotal > 0 ? Math.round((amount / grandTotal) * 100) : 0;
      return {
        category,
        rawAmount: amount,
        formattedAmount: `₦${amount.toLocaleString()}`,
        percentage,
        color: colors[category] || 'bg-[#735c00]'
      };
    }).sort((a, b) => b.rawAmount - a.rawAmount);
  }, [orders, products]);

  const topCategoryName = categoryStats.length > 0 && categoryStats[0].rawAmount > 0 
    ? categoryStats[0].category 
    : 'Lace & Abayas';

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      case 'Shipped':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'Processing':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      default:
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Revenue */}
        <div className="bg-[#04120e] p-5 rounded-2xl border border-[#735c00]/30 shadow-lg relative overflow-hidden group hover:border-[#735c00] transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Total Sales</span>
            <div className="w-10 h-10 rounded-xl bg-[#735c00]/20 text-[#735c00] flex items-center justify-center border border-[#735c00]/30">
              <span className="material-symbols-outlined">payments</span>
            </div>
          </div>
          <p className="text-2xl font-bold font-serif text-white mt-3">₦{metrics.totalRevenue.toLocaleString()}</p>
          <p className="text-xs text-white/50 mt-1 flex items-center gap-1">
            <span className="text-emerald-400 font-semibold">↑ Real-Time Sync</span>
          </p>
        </div>

        {/* Total Orders */}
        <div className="bg-[#04120e] p-5 rounded-2xl border border-[#735c00]/30 shadow-lg relative overflow-hidden group hover:border-[#735c00] transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Total Orders</span>
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
              <span className="material-symbols-outlined">shopping_bag</span>
            </div>
          </div>
          <p className="text-2xl font-bold font-serif text-white mt-3">{metrics.totalOrders}</p>
          <p className="text-xs text-white/50 mt-1">
            <span className="text-amber-400 font-semibold">{metrics.pendingOrdersCount} pending</span> fulfillment
          </p>
        </div>

        {/* Total Catalog Items */}
        <div className="bg-[#04120e] p-5 rounded-2xl border border-[#735c00]/30 shadow-lg relative overflow-hidden group hover:border-[#735c00] transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Active Products</span>
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <span className="material-symbols-outlined">inventory_2</span>
            </div>
          </div>
          <p className="text-2xl font-bold font-serif text-white mt-3">{metrics.totalProducts}</p>
          <p className="text-xs text-white/50 mt-1">Across all luxury categories</p>
        </div>

        {/* Low Stock Warning */}
        <div className="bg-[#04120e] p-5 rounded-2xl border border-[#735c00]/30 shadow-lg relative overflow-hidden group hover:border-[#735c00] transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Stock Alerts</span>
            <div className="w-10 h-10 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center border border-red-500/30">
              <span className="material-symbols-outlined">warning</span>
            </div>
          </div>
          <p className="text-2xl font-bold font-serif text-white mt-3">{metrics.lowStockCount}</p>
          <p className="text-xs text-white/50 mt-1">
            <span className="text-red-400 font-semibold">Items ≤ 5 units</span> requiring restock
          </p>
        </div>
      </div>

      {/* Main Grid: Revenue Overview & Low Stock Alert */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Real Dynamic Category Sales Distribution */}
        <div className="lg:col-span-2 bg-[#04120e] p-6 rounded-2xl border border-white/10 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold font-serif text-white">Category Sales Distribution</h2>
              <p className="text-xs text-white/60">Live breakdown calculated across all boutique categories</p>
            </div>
            <span className="text-xs uppercase font-semibold text-[#735c00] bg-[#735c00]/10 px-3 py-1 rounded-full border border-[#735c00]/20">
              All Categories
            </span>
          </div>

          <div className="space-y-4">
            {categoryStats.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-white font-bold">{item.category}</span>
                  <span className="text-white/80">{item.formattedAmount} ({item.percentage}%)</span>
                </div>
                <div className="h-2.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.color} rounded-full transition-all duration-500`}
                    style={{ width: `${Math.max(item.percentage, item.rawAmount > 0 ? 5 : 2)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/60">
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-400 text-base">verified</span>
              Highest sales volume category: <strong className="text-white">{topCategoryName}</strong>
            </span>
            <Link to="/batuul-portal-v1/products" className="text-[#735c00] hover:text-white font-semibold flex items-center gap-1">
              View Catalog →
            </Link>
          </div>
        </div>

        {/* Low Stock Alerts & Quick Actions */}
        <div className="bg-[#04120e] p-6 rounded-2xl border border-white/10 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <h2 className="text-lg font-bold font-serif text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-amber-400">warning</span>
                Restock Warnings
              </h2>
              <Link to="/batuul-portal-v1/products" className="text-xs text-emerald-400 hover:underline font-semibold">
                Manage Stock
              </Link>
            </div>

            <div className="mt-4 space-y-3 max-h-64 overflow-y-auto">
              {metrics.lowStockProducts.length === 0 ? (
                <div className="text-center py-4">
                  <span className="material-symbols-outlined text-3xl text-emerald-400 block mb-2">check_circle</span>
                  <p className="text-xs text-white/50">All products are well stocked!</p>
                  <p className="text-[10px] text-white/30 mt-1">Stock warnings appear when items fall below 10 units.</p>
                </div>
              ) : (
                metrics.lowStockProducts.map(product => (
                  <div key={product.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-amber-500/20">
                    <div className="flex items-center gap-3">
                      <img src={product.image} alt={product.name} className="w-10 h-10 object-cover rounded-lg border border-white/10" />
                      <div>
                        <p className="text-xs font-semibold text-white line-clamp-1">{product.name}</p>
                        <p className="text-[10px] text-white/50">{product.category} • SKU: {product.sku}</p>
                      </div>
                    </div>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
                      product.stock === 0
                        ? 'bg-red-800/40 text-red-300 border-red-500/40'
                        : product.stock <= 5
                        ? 'bg-red-500/20 text-red-300 border-red-500/30'
                        : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                    }`}>
                      {product.stock === 0 ? 'OUT OF STOCK' : `${product.stock} left`}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-white/10">
            <Link
              to="/batuul-portal-v1/products"
              className="flex items-center justify-center gap-2 w-full py-3 bg-[#735c00] hover:bg-[#8e7200] text-white font-semibold rounded-xl transition-colors text-xs uppercase tracking-wider shadow-lg"
            >
              <span className="material-symbols-outlined text-base">add_circle</span>
              Add New Product
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Orders Datatable */}
      <div className="bg-[#04120e] p-6 rounded-2xl border border-white/10 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold font-serif text-white">Recent Customer Orders</h2>
            <p className="text-xs text-white/60">Live orders placed via storefront &amp; WhatsApp</p>
          </div>
          <Link to="/batuul-portal-v1/orders" className="text-xs text-[#735c00] hover:text-white font-semibold flex items-center gap-1">
            View All Orders ({metrics.totalOrders}) →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-white/80">
            <thead className="bg-[#04120e] text-emerald-400 uppercase tracking-wider text-[10px] border-b border-white/10">
              <tr>
                <th className="p-3.5 rounded-l-lg">Order ID</th>
                <th className="p-3.5">Customer</th>
                <th className="p-3.5">Items</th>
                <th className="p-3.5">Total Amount</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Date</th>
                <th className="p-3.5 text-right rounded-r-lg">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {recentOrders.map(order => (
                <tr key={order.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-3.5 font-mono font-bold text-white">{order.id}</td>
                  <td className="p-3.5">
                    <p className="font-semibold text-white">{order.customerName}</p>
                    <p className="text-[10px] text-white/50">{order.phone}</p>
                  </td>
                  <td className="p-3.5">
                    <span className="text-white/90">{order.items.map(i => i.name).join(', ')}</span>
                  </td>
                  <td className="p-3.5 font-semibold text-white">₦{order.totalAmount.toLocaleString()}</td>
                  <td className="p-3.5">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border ${getStatusBadge(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-white/60">{order.date}</td>
                  <td className="p-3.5 text-right">
                    <a
                      href={generateOrderWhatsAppNotifyLink(order)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 px-2.5 py-1 rounded-lg border border-emerald-500/30 transition-colors"
                      title="Notify client on WhatsApp"
                    >
                      <span className="material-symbols-outlined text-xs">chat</span>
                      WhatsApp
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
