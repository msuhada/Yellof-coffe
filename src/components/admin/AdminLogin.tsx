"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Lock, Eye, EyeOff, ArrowRight, ShieldCheck } from "lucide-react";
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
        setIsLoading(false);
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#0A0807] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md space-y-6">
        
        {/* Logo / Brand */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <Image
              src="/images/yellof_logo.png"
              alt="Yellof Coffee Official Logo"
              width={200}
              height={70}
              className="h-14 sm:h-16 w-auto object-contain drop-shadow-xl"
              priority
            />
          </div>
          <div>
            <h1 className="font-serif text-xl sm:text-2xl font-black text-white">
              ADMIN <span className="text-[#FFC72C]">CONTROL PANEL</span>
            </h1>
            <p className="text-xs text-[#A39688] mt-0.5">
              Panel Pengaturan Produk, Penjualan & Media
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
