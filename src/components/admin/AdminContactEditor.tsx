"use client";

import React, { useState } from "react";
import { YellofContact } from "@/data/products";
import { Save, Phone, AtSign, MapPin, MessageSquare, KeyRound, Eye, EyeOff } from "lucide-react";
import { setAdminPassword, getAdminPassword } from "@/data/products";

interface AdminContactEditorProps {
  contact: YellofContact;
  onSave: (contact: YellofContact) => void;
}

export const AdminContactEditor: React.FC<AdminContactEditorProps> = ({
  contact,
  onSave,
}) => {
  const [editedContact, setEditedContact] = useState<YellofContact>({
    ...contact,
  });
  const [hasChanges, setHasChanges] = useState(false);

  // Password change section
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState("");

  const updateField = (field: keyof YellofContact, value: string) => {
    setEditedContact((prev) => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleSave = () => {
    onSave(editedContact);
    setHasChanges(false);
  };

  const handlePasswordChange = () => {
    if (!newPassword) {
      setPasswordMessage("Password tidak boleh kosong!");
      return;
    }
    if (newPassword.length < 4) {
      setPasswordMessage("Password minimal 4 karakter!");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordMessage("Konfirmasi password tidak cocok!");
      return;
    }
    setAdminPassword(newPassword);
    setPasswordMessage("✅ Password berhasil diubah!");
    setNewPassword("");
    setConfirmPassword("");
    setTimeout(() => setPasswordMessage(""), 3000);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      
      {/* Contact Info Editor */}
      <div className="rounded-xl sm:rounded-2xl bg-[#14100E] border border-[#DAA520]/30 p-4 sm:p-6 space-y-4">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-[#FFC72C]" />
            <h2 className="text-sm sm:text-base font-bold text-white">Data Kontak & Informasi</h2>
          </div>
          <button
            onClick={handleSave}
            disabled={!hasChanges}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#FFD034] to-[#E6AF2E] text-[#0A0807] font-black text-[10px] sm:text-xs flex items-center gap-1.5 shadow-md hover:scale-[1.02] transition-transform disabled:opacity-40 disabled:hover:scale-100"
          >
            <Save className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            Simpan Kontak
          </button>
        </div>

        {hasChanges && (
          <div className="text-[10px] sm:text-xs text-amber-400 bg-amber-950/30 border border-amber-500/30 rounded-lg px-3 py-2 animate-fadeIn">
            ⚡ Ada perubahan belum disimpan.
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          
          <div className="space-y-1">
            <label className="text-[10px] sm:text-xs font-bold text-[#FFC72C] uppercase tracking-wider flex items-center gap-1">
              <Phone className="w-3 h-3" />
              Nomor WhatsApp (dengan kode negara)
            </label>
            <input
              type="text"
              value={editedContact.whatsapp}
              onChange={(e) => updateField("whatsapp", e.target.value)}
              className="admin-input"
              placeholder="6282171032691"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] sm:text-xs font-bold text-[#A39688] uppercase tracking-wider flex items-center gap-1">
              <Phone className="w-3 h-3" />
              Format Tampilan WA
            </label>
            <input
              type="text"
              value={editedContact.whatsappFormatted}
              onChange={(e) => updateField("whatsappFormatted", e.target.value)}
              className="admin-input"
              placeholder="0821 7103 2691"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] sm:text-xs font-bold text-[#A39688] uppercase tracking-wider flex items-center gap-1">
              <AtSign className="w-3 h-3" />
              Instagram
            </label>
            <input
              type="text"
              value={editedContact.instagram}
              onChange={(e) => updateField("instagram", e.target.value)}
              className="admin-input"
              placeholder="@uni.yellof"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] sm:text-xs font-bold text-[#A39688] uppercase tracking-wider flex items-center gap-1">
              <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.47 6.27 6.27 0 0 0 1.87-4.46V8.62a8.28 8.28 0 0 0 4.9 1.58V6.75a4.78 4.78 0 0 1-1-.06z"/>
              </svg>
              TikTok
            </label>
            <input
              type="text"
              value={editedContact.tiktok || ""}
              onChange={(e) => updateField("tiktok", e.target.value)}
              className="admin-input"
              placeholder="@Uni.yellof"
            />
          </div>

          <div className="space-y-1 sm:col-span-2">
            <label className="text-[10px] sm:text-xs font-bold text-[#A39688] uppercase tracking-wider flex items-center gap-1">
              <MessageSquare className="w-3 h-3" />
              Tagline
            </label>
            <input
              type="text"
              value={editedContact.tagline}
              onChange={(e) => updateField("tagline", e.target.value)}
              className="admin-input"
              placeholder="Nikmatnya Kopi Berkualitas, Semangat Berlipat!"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] sm:text-xs font-bold text-[#A39688] uppercase tracking-wider flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            Alamat
          </label>
          <input
            type="text"
            value={editedContact.address}
            onChange={(e) => updateField("address", e.target.value)}
            className="admin-input"
            placeholder="Kabupaten Pasaman, Sumatera Barat, Indonesia"
          />
        </div>

      </div>

      {/* Password Change Section */}
      <div className="rounded-xl sm:rounded-2xl bg-[#14100E] border border-[#DAA520]/30 p-4 sm:p-6 space-y-3 sm:space-y-4">
        
        <div className="flex items-center gap-2">
          <KeyRound className="w-4 h-4 sm:w-5 sm:h-5 text-[#FFC72C]" />
          <h2 className="text-sm sm:text-base font-bold text-white">Ganti Password Admin</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-[10px] sm:text-xs font-bold text-[#A39688] uppercase tracking-wider">
              Password Baru:
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="admin-input pr-10"
                placeholder="Masukkan password baru..."
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A39688] hover:text-[#FFDF6D] transition-colors"
              >
                {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] sm:text-xs font-bold text-[#A39688] uppercase tracking-wider">
              Konfirmasi Password:
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="admin-input"
              placeholder="Ulangi password baru..."
            />
          </div>
        </div>

        {passwordMessage && (
          <div className={`text-[10px] sm:text-xs rounded-lg px-3 py-2 animate-fadeIn ${
            passwordMessage.includes("✅")
              ? "text-emerald-400 bg-emerald-950/30 border border-emerald-500/30"
              : "text-red-400 bg-red-950/30 border border-red-500/30"
          }`}>
            {passwordMessage}
          </div>
        )}

        <button
          onClick={handlePasswordChange}
          className="px-4 py-2 rounded-lg bg-[#1A1412] border border-[#DAA520]/40 text-[#FFC72C] hover:bg-[#DAA520] hover:text-[#0A0807] text-[10px] sm:text-xs font-bold flex items-center gap-1.5 transition-all"
        >
          <KeyRound className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          Ubah Password
        </button>

      </div>
    </div>
  );
};
