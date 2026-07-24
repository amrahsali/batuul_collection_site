import React from 'react';
import { useAdmin } from '../../context/AdminContext';

export default function AdminMessagesPage() {
  const { messages, markMessageAsResponded } = useAdmin();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-[#04120e] p-5 rounded-2xl border border-white/10">
        <div>
          <h2 className="text-lg font-bold font-serif text-white">Boutique Customer Inquiries</h2>
          <p className="text-xs text-white/60">Messages submitted through the online storefront contact form</p>
        </div>
        <span className="text-xs font-bold text-amber-300 bg-amber-500/20 px-3 py-1 rounded-full border border-amber-500/30">
          {messages.filter(m => m.status === 'Unread').length} Unread
        </span>
      </div>

      <div className="space-y-4">
        {messages.length === 0 ? (
          <div className="bg-[#04120e] p-8 rounded-2xl border border-white/10 text-center text-white/50 text-xs">
            No customer inquiries received yet.
          </div>
        ) : (
          messages.map(msg => (
            <div
              key={msg.id}
              className={`p-6 rounded-2xl border transition-all ${
                msg.status === 'Unread'
                  ? 'bg-[#04120e] border-[#735c00]/50 shadow-lg shadow-[#735c00]/5'
                  : 'bg-white/5 border-white/10 opacity-80'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#735c00]/30 text-amber-300 flex items-center justify-center font-serif font-bold text-base border border-[#735c00]/40">
                    {msg.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">{msg.name}</h3>
                    <p className="text-xs text-white/50">{msg.email} • {msg.phone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-white/40">{msg.date}</span>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                    msg.status === 'Unread' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-emerald-500/20 text-emerald-300'
                  }`}>
                    {msg.status}
                  </span>
                </div>
              </div>

              <div className="mt-4 space-y-2 text-xs">
                <p className="font-semibold text-emerald-400 text-xs uppercase tracking-wider">Subject: {msg.subject}</p>
                <p className="text-white/80 leading-relaxed bg-white/5 p-4 rounded-xl border border-white/5 italic">
                  "{msg.message}"
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-end gap-3 text-xs">
                {msg.status === 'Unread' && (
                  <button
                    onClick={() => markMessageAsResponded(msg.id)}
                    className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold"
                  >
                    Mark Responded
                  </button>
                )}

                {msg.phone && (
                  <a
                    href={`https://wa.me/${msg.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${msg.name}, thank you for contacting Batuul Collection regarding "${msg.subject}".`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold shadow-md"
                  >
                    <span className="material-symbols-outlined text-base">chat</span>
                    Reply via WhatsApp
                  </a>
                )}

                <a
                  href={`mailto:${msg.email}?subject=RE: ${encodeURIComponent(msg.subject)}`}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#735c00] hover:bg-[#8e7200] text-white font-semibold"
                >
                  <span className="material-symbols-outlined text-base">mail</span>
                  Reply Email
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
