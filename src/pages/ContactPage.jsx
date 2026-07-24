import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAdmin } from '../context/AdminContext';
import { Phone, Mail, MapPin, MessageSquare, Send } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../context/CartContext';

export default function ContactPage() {
  const { generateWhatsAppLink } = useCart();
  const { addMessage } = useAdmin();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addMessage({
      name: formData.fullName,
      email: formData.email,
      phone: formData.phone || '+234 803 573 3571',
      subject: formData.subject,
      message: formData.message
    });
    setSubmitted(true);
    setFormData({ fullName: '', phone: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 6000);
  };

  const whatsappGroupLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello Batuul Collection, I would like to join your VIP WhatsApp Group.")}`;

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-6 lg:px-16 space-y-16 font-sans">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-semibold text-[#735c00] uppercase tracking-widest">
          GET IN TOUCH
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#003426]">
          Connect With Us
        </h1>
        <p className="text-sm text-[#404944]">
          We are here to assist you with any inquiries regarding our collections, sizing, or bespoke custom orders.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Contact Details & Form */}
        <div className="lg:col-span-6 space-y-8">
          
          <div className="space-y-4 bg-white p-6 rounded-xl border border-[#bfc9c3]/30 shadow-sm">
            <div className="flex items-center gap-4 text-[#404944]">
              <Phone className="text-[#735c00]" size={20} />
              <span className="text-sm font-semibold text-[#003426]">+234 803 573 3571</span>
            </div>
            <div className="flex items-center gap-4 text-[#404944]">
              <Mail className="text-[#735c00]" size={20} />
              <span className="text-sm text-[#003426]">concierge@batuulcollection.com</span>
            </div>
            <div className="flex items-start gap-4 text-[#404944]">
              <MapPin className="text-[#735c00] mt-0.5" size={20} />
              <span className="text-sm text-[#003426]">
                Amsocco Plaza, opposite 24 Complex, Murtala Square, Kaduna, Nigeria
              </span>
            </div>

            {/* Social Media Handles */}
            <div className="pt-4 border-t border-[#efeeea] space-y-2">
              <span className="text-[10px] uppercase font-bold text-[#735c00] tracking-widest block">Official Social Media Handles</span>
              <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-[#003426]">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-[#735c00] transition-colors"
                >
                  <svg className="w-4 h-4 fill-current text-[#735c00]" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span>@batuul_collection</span>
                </a>

                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-[#735c00] transition-colors"
                >
                  <svg className="w-4 h-4 fill-current text-[#735c00]" viewBox="0 0 24 24">
                    <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.583 9 4.615V8z"/>
                  </svg>
                  <span>Batuul Collection</span>
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white p-8 rounded-xl border border-[#bfc9c3]/30 shadow-sm space-y-6">
            <h3 className="font-serif text-2xl font-bold text-[#003426]">
              Send an Inquiry
            </h3>

            {submitted ? (
              <div className="p-4 bg-[#0f4c3a]/10 border border-[#0f4c3a] rounded-lg text-center text-xs font-semibold text-[#0f4c3a]">
                Thank you! Your message has been sent directly to our boutique concierge &amp; admin team. We will get back to you shortly.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="FULL NAME"
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    className="bg-transparent border border-[#bfc9c3] p-4 text-xs font-semibold uppercase text-[#003426] placeholder-[#707974] focus:border-[#003426] outline-none transition-colors"
                  />
                  <input
                    type="tel"
                    placeholder="PHONE / WHATSAPP"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="bg-transparent border border-[#bfc9c3] p-4 text-xs font-semibold uppercase text-[#003426] placeholder-[#707974] focus:border-[#003426] outline-none transition-colors"
                  />
                </div>

                <input
                  type="email"
                  required
                  placeholder="EMAIL ADDRESS"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-transparent border border-[#bfc9c3] p-4 text-xs font-semibold uppercase text-[#003426] placeholder-[#707974] focus:border-[#003426] outline-none transition-colors"
                />

                <input
                  type="text"
                  required
                  placeholder="SUBJECT"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="w-full bg-transparent border border-[#bfc9c3] p-4 text-xs font-semibold uppercase text-[#003426] placeholder-[#707974] focus:border-[#003426] outline-none transition-colors"
                />

                <textarea
                  rows={4}
                  required
                  placeholder="YOUR MESSAGE"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-transparent border border-[#bfc9c3] p-4 text-xs font-semibold uppercase text-[#003426] placeholder-[#707974] focus:border-[#003426] outline-none transition-colors"
                />

                <button
                  type="submit"
                  className="w-full bg-[#003426] text-white py-4 text-xs font-semibold uppercase tracking-widest hover:bg-[#003513] transition-colors flex items-center justify-center gap-2"
                >
                  <Send size={14} />
                  SEND INQUIRY
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Right CTA & Showroom Image */}
        <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
          
          {/* WhatsApp Direct Group CTA */}
          <a
            href={whatsappGroupLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#25d366] hover:bg-[#20bd5a] text-white py-6 px-8 rounded-xl flex items-center justify-center gap-4 text-xs font-bold uppercase tracking-widest shadow-lg hover:scale-[1.01] transition-transform"
          >
            <MessageSquare size={20} />
            JOIN OUR WHATSAPP VIP GROUP
          </a>

          {/* Showroom Image */}
          <div className="aspect-[4/3] bg-[#efeeea] rounded-xl overflow-hidden shadow-md border border-[#bfc9c3]/30 flex-1">
            <img
              src="/assets/atampa.png"
              alt="Batuul Collection Kaduna Boutique"
              className="w-full h-full object-cover"
            />
          </div>

        </div>

      </div>

    </div>
  );
}
