import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';

export default function AdminLoginPage() {
  const { loginAdmin } = useAdmin();
  const navigate = useNavigate();

  const [email, setEmail] = useState('admin@batuulcollection.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const success = loginAdmin(email, password);
      if (success) {
        navigate('/batuul-portal-v1');
      } else {
        setError('Invalid admin credentials or security passcode.');
        setLoading(false);
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#071c15] text-[#fbf9f5] flex items-center justify-center p-4 font-sans selection:bg-[#735c00] selection:text-white">
      {/* Ambient background glow */}
      <div className="fixed inset-0 bg-gradient-to-tr from-[#04120e] via-[#071c15] to-[#0d3428] pointer-events-none" />
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#735c00]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative w-full max-w-md bg-[#04120e] p-8 rounded-3xl border border-[#735c00]/30 shadow-2xl shadow-black/80 space-y-6 z-10 backdrop-blur-md">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#735c00]/20 border border-[#735c00]/40 text-[#735c00] mb-2 shadow-inner">
            <span className="material-symbols-outlined text-3xl">lock</span>
          </div>
          <h1 className="font-serif text-2xl font-bold tracking-wide text-white">BATUUL COLLECTION</h1>
          <p className="text-xs uppercase tracking-widest text-emerald-400 font-mono">Restricted Admin Control Center</p>
        </div>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-center text-xs text-red-300 font-semibold flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-base">error</span>
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-white/70 mb-1.5 font-semibold uppercase tracking-wider">
              Admin Email
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-3 text-white/40 text-lg">mail</span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/15 rounded-xl pl-10 pr-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#735c00] transition-colors"
                placeholder="admin@batuulcollection.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-white/70 mb-1.5 font-semibold uppercase tracking-wider">
              Passcode / Password
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-3 text-white/40 text-lg">key</span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/15 rounded-xl pl-10 pr-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#735c00] transition-colors"
                placeholder="Enter password (default: batuul2026)"
              />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-[11px] text-white/50 space-y-1">
            <p className="font-semibold text-amber-300">Quick Access Credentials:</p>
            <p>• Email: <code className="text-white">admin@batuulcollection.com</code></p>
            <p>• Passcode: <code className="text-white">batuul2026</code></p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-[#735c00] hover:bg-[#8e7200] text-white font-semibold rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg shadow-[#735c00]/20 flex items-center justify-center gap-2 mt-4"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                Authenticating...
              </span>
            ) : (
              <>
                <span>Unlock Control Center</span>
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </>
            )}
          </button>
        </form>

        <div className="pt-4 border-t border-white/10 text-center">
          <a
            href="/"
            className="text-[11px] text-white/50 hover:text-white transition-colors flex items-center justify-center gap-1"
          >
            ← Return to Batuul Collection Storefront
          </a>
        </div>
      </div>
    </div>
  );
}
