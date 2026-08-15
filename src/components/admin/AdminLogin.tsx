"use client";

import React, { useState } from "react";
import { Lock, Eye, EyeOff, Coffee, ShieldCheck } from "lucide-react";
import { getAdminPassword } from "@/data/products";

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess }) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate slight delay for feel
    setTimeout(() => {
      const correctPassword = getAdminPassword();
      if (password === correctPassword) {
        // Store session
        sessionStorage.setItem("yellof_admin_session", "true");
        onLoginSuccess();
      } else {
        setError("Password salah! Silakan coba lagi.");
        setPassword("");
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#0A0807] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md space-y-6">
        
        {/* Logo / Brand */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-2xl bg-gradient-to-br from-[#FFD034] via-[#FFC72C] to-[#E6AF2E] flex items-center justify-center shadow-[0_0_40px_rgba(255,199,44,0.3)]">
            <Coffee className="w-8 h-8 sm:w-10 sm:h-10 text-[#0A0807]" />
          </div>
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-black text-white">
              YELLOF <span className="text-[#FFC72C]">ADMIN</span>
            </h1>
            <p className="text-xs sm:text-sm text-[#A39688] mt-1">
              Panel Kontrol Harga & Produk
            </p>
          </div>
        </div>

        {/* Login Card */}
        <div className="rounded-2xl sm:rounded-3xl bg-[#14100E] border border-[#DAA520]/40 p-5 sm:p-8 shadow-2xl space-y-5">
          
          <div className="flex items-center gap-2 text-[#FFC72C]">
            <Lock className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">Login Admin</span>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-[#A39688] block">
                Password Admin:
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password admin..."
                  required
                  className="admin-input pr-10"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A39688] hover:text-[#FFDF6D] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="text-xs text-red-400 bg-red-950/30 border border-red-500/30 rounded-lg px-3 py-2 animate-fadeIn">
                ⚠️ {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FFD034] via-[#FFC72C] to-[#E6AF2E] text-[#0A0807] font-black text-sm tracking-wider flex items-center justify-center gap-2 shadow-lg hover:scale-[1.02] transition-transform disabled:opacity-60 disabled:hover:scale-100"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-[#0A0807]/30 border-t-[#0A0807] rounded-full animate-spin" />
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  MASUK KE DASHBOARD
                </>
              )}
            </button>
          </form>

          <div className="text-center text-[10px] text-[#6B5D4F] space-y-0.5">
            <p>Password default: <code className="text-[#A39688] bg-[#1A1412] px-1.5 py-0.5 rounded">yellof2024</code></p>
            <p>Password bisa diganti setelah login.</p>
          </div>

        </div>

        {/* Back Link */}
        <div className="text-center">
          <a href="/" className="text-xs text-[#A39688] hover:text-[#FFC72C] transition-colors">
            ← Kembali ke Website Utama
          </a>
        </div>

      </div>
    </div>
  );
};
