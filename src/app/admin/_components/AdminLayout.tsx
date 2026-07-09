"use client";

import { useState } from "react";
import { Menu, X, Home, LogOut, User } from "lucide-react";

interface AdminLayoutProps {
  userEmail?: string;
  logoutAction: () => Promise<void>;
  children: React.ReactNode;
}

export function AdminLayout({
  userEmail,
  logoutAction,
  children,
}: AdminLayoutProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex relative">
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`
        fixed inset-y-0 left-0 w-64 bg-[#0a1b35] text-white p-6 space-y-6 z-50 transition-transform duration-300 transform
        lg:relative lg:transform-none
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold tracking-wider text-[#c29b57]">
            Admin Panel
          </h1>
          <button
            className="lg:hidden text-white/70 hover:text-white p-1"
            onClick={() => setIsOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        <nav className="space-y-2">
          <a
            href="/admin"
            className="flex items-center gap-3 px-4 py-2.5 rounded bg-white/10 font-medium text-white transition-colors"
          >
            <Home size={18} />
            Quản trị Home
          </a>
        </nav>

        <div className="pt-4 border-t border-white/10">
          <button
            onClick={() => logoutAction()}
            className="flex items-center gap-3 w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-white/5 rounded cursor-pointer transition-colors"
          >
            <LogOut size={18} />
            Đăng xuất
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="flex justify-between items-center bg-white p-4 lg:px-8 border-b border-gray-200 shadow-sm sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsOpen(true)}
              className="lg:hidden text-gray-600 hover:text-gray-900 p-1 rounded-md hover:bg-gray-100 transition-colors"
            >
              <Menu size={24} />
            </button>
            <h2 className="text-lg lg:text-xl font-bold text-gray-800 truncate">
              Cấu hình Trang Chủ
            </h2>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100 max-w-xs sm:max-w-none truncate">
            <User size={16} className="text-gray-400 shrink-0" />
            <span className="truncate hidden sm:inline">{userEmail}</span>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
