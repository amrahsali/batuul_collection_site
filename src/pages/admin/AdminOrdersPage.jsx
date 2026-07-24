import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';

export default function AdminOrdersPage() {
  const { orders, updateOrderStatus, generateOrderWhatsAppNotifyLink } = useAdmin();
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const statuses = ['All', 'Pending', 'Processing', 'Shipped', 'Delivered'];

  const filteredOrders = orders.filter(o => {
    if (statusFilter === 'All') return true;
    return o.status === statusFilter;
  });

  const getStatusStyle = (status) => {
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
    <div className="space-y-6">
      {/* Status Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-white/10">
        {statuses.map(s => {
          const count = s === 'All' ? orders.length : orders.filter(o => o.status === s).length;
          return (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                statusFilter === s
                  ? 'bg-[#735c00] text-white shadow-lg'
                  : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              {s} ({count})
            </button>
          );
        })}
      </div>

      {/* Orders Table */}
      <div className="bg-[#04120e] rounded-2xl border border-white/10 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-white/80">
            <thead className="bg-white/5 text-emerald-400 uppercase tracking-wider text-[10px] border-b border-white/10">
              <tr>
                <th className="p-4">Order Reference</th>
                <th className="p-4">Customer Details</th>
                <th className="p-4">Items Summary</th>
                <th className="p-4">Total (₦)</th>
                <th className="p-4">Payment</th>
                <th className="p-4">Status & Update</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-white/50">
                    No orders match the selected filter status.
                  </td>
                </tr>
              ) : (
                filteredOrders.map(order => (
                  <tr key={order.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 font-mono font-bold text-white">
                      <p>{order.id}</p>
                      <p className="text-[10px] font-sans text-white/40">{order.date}</p>
                    </td>

                    <td className="p-4">
                      <p className="font-semibold text-white">{order.customerName}</p>
                      <p className="text-[10px] text-emerald-400 font-mono">{order.phone}</p>
                      <p className="text-[10px] text-white/50 line-clamp-1">{order.address}</p>
                    </td>

                    <td className="p-4">
                      <div className="space-y-1">
                        {order.items.map((item, idx) => (
                          <p key={idx} className="text-white/90 font-medium">
                            • {item.name} <span className="text-[#735c00] font-bold">x{item.quantity}</span>
                          </p>
                        ))}
                      </div>
                    </td>

                    <td className="p-4 font-bold text-white text-sm">
                      ₦{order.totalAmount.toLocaleString()}
                    </td>

                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        order.paymentStatus === 'Paid' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                      }`}>
                        {order.paymentStatus} ({order.paymentMethod})
                      </span>
                    </td>

                    <td className="p-4">
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        className={`text-xs font-semibold rounded-lg px-2.5 py-1 bg-[#04120e] border focus:outline-none ${getStatusStyle(order.status)}`}
                      >
                        <option value="Pending" className="bg-[#04120e] text-white">Pending</option>
                        <option value="Processing" className="bg-[#04120e] text-white">Processing</option>
                        <option value="Shipped" className="bg-[#04120e] text-white">Shipped</option>
                        <option value="Delivered" className="bg-[#04120e] text-white">Delivered</option>
                      </select>
                    </td>

                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="p-2 bg-white/5 hover:bg-white/15 text-white rounded-lg transition-colors border border-white/10"
                        title="View Order Details"
                      >
                        <span className="material-symbols-outlined text-base">visibility</span>
                      </button>
                      <a
                        href={generateOrderWhatsAppNotifyLink(order)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 p-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 rounded-lg transition-colors border border-emerald-500/30"
                        title="Notify Customer via WhatsApp"
                      >
                        <span className="material-symbols-outlined text-base">chat</span>
                      </a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedOrder(null)} />
          <div className="relative w-full max-w-lg bg-[#04120e] rounded-2xl border border-[#735c00]/40 p-6 space-y-5 z-10 text-xs text-white">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <h3 className="text-lg font-bold font-serif text-white">Order #{selectedOrder.id}</h3>
                <p className="text-[10px] text-white/50">Placed on {selectedOrder.date}</p>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="text-white/60 hover:text-white">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Customer Info */}
            <div className="p-3 bg-white/5 rounded-xl border border-white/10 space-y-1">
              <p className="text-emerald-400 font-bold uppercase text-[10px]">Customer Details</p>
              <p className="font-semibold text-white text-sm">{selectedOrder.customerName}</p>
              <p className="text-white/70">Phone / WhatsApp: <span className="font-mono text-emerald-300">{selectedOrder.phone}</span></p>
              <p className="text-white/70">Email: {selectedOrder.email}</p>
              <p className="text-white/70">Delivery Address: {selectedOrder.address}</p>
            </div>

            {/* Order Items */}
            <div className="space-y-2">
              <p className="text-emerald-400 font-bold uppercase text-[10px]">Order Items</p>
              <div className="space-y-2">
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2.5 bg-white/5 rounded-lg border border-white/10">
                    <div className="flex items-center gap-3">
                      <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded-md border border-white/10" />
                      <div>
                        <p className="font-semibold text-white">{item.name}</p>
                        <p className="text-[10px] text-white/50">Quantity: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-bold text-[#735c00]">₦{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary & Actions */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <div>
                <p className="text-[10px] text-white/50 uppercase">Total Amount</p>
                <p className="text-lg font-bold font-serif text-white">₦{selectedOrder.totalAmount.toLocaleString()}</p>
              </div>
              <a
                href={generateOrderWhatsAppNotifyLink(selectedOrder)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-4 py-2.5 rounded-xl font-semibold uppercase tracking-wider text-[11px] shadow-lg"
              >
                <span className="material-symbols-outlined text-base">chat</span>
                Notify on WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
