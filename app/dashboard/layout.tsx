"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  BarChart3Icon,
  UploadIcon,
  Settings2Icon,
  LogOutIcon,
  UserIcon,
  WalletIcon,
  CalendarIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarLinks = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
  { name: "Transactions", href: "/dashboard/insights", icon: WalletIcon },
  { name: "Upload", href: "/dashboard/upload", icon: UploadIcon },
  { name: "Profile", href: "/dashboard/profile", icon: UserIcon },
  { name: "Settings", href: "/dashboard/settings", icon: Settings2Icon },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-20 bg-gray-100 border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="h-16 flex items-center justify-center border-b border-gray-200">
          <Link href="/dashboard" className="text-xl font-bold text-gray-800">
            {/* Replace with your logo */}
            <span className="text-indigo-600">FT</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "flex items-center justify-center p-3 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-200 transition-colors",
                      isActive ? "bg-indigo-50 text-indigo-600" : ""
                    )}
                    title={link.name}
                  >
                    <Icon className="w-6 h-6" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        {/* Sign Out */}
        <div className="p-4 border-t border-gray-200">
          <Link
            href="/login"
            className="flex items-center justify-center p-3 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-200 transition-colors"
            title="Sign Out"
          >
            <LogOutIcon className="w-6 h-6" />
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
