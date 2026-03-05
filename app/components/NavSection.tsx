"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { ArrowLeftToLine, ArrowRightToLine, ChevronDown, DollarSign, Home, LandPlot, Package, PiggyBank, Sprout, User } from "lucide-react";
import UserNavCard from "./UserNavCard";

type SectionProps = {
  title: string;
  basePath: string;
  items?: { label: string; href: string }[];
  href?: string;
  collapsed?: boolean;
};

type SidebarProps = {
  collapsed: boolean;
};


function Section({ title, basePath, items, href, collapsed }: SectionProps) {
  const pathname = usePathname();
  const isActiveSection = pathname === basePath || pathname.startsWith(basePath + "/");
  const [open, setOpen] = useState(isActiveSection);

  // Open section if active
  useEffect(() => {
    if (isActiveSection) setOpen(true);
  }, [isActiveSection]);

  // Close submenu if sidebar collapsed
  useEffect(() => {
    if (collapsed) setOpen(false);
  }, [collapsed]);

  // Single link section (e.g., My Farm)
  if (!items && href) {
    const isActive = pathname === href;
  }

  // Section with submenu items
  return (
    <div className="space-y-2">
      <button
        onClick={() => !collapsed && items && setOpen(!open)}
        className={`group flex w-full items-center ${collapsed ? "justify-center" : "justify-between"} rounded-xl px-4 py-2 text-md transition-all duration-200
          ${isActiveSection
            ? "bg-(--color-secondary) text-(--color-surface)  shadow-sm"
            : "text-(--color-text) hover:bg-(--color-soft) hover:text-(--color-primary) hover:shadow-sm"
          }`}
        title={collapsed ? title : undefined}
      >
        <div className="flex items-center">
          <span className={`shrink-0 transition-colors ${!collapsed ? "mr-3 h-4 w-4 " : "mx-auto"}`}>
            {basePath === "/animals" && <PiggyBank className="h-5 w-5" />}
            {basePath === "/farming" && <Sprout className="h-5 w-5" />}
            {basePath === "/stock" && <Package className="h-5 w-5" />}
            {basePath === "/finances" && <DollarSign className="h-5 w-5" />}
          </span>
          {!collapsed && title}
        </div>
        {items && !collapsed && (
          <ChevronDown
            size={16}
            className={`transition-transform duration-200 ${open ? "rotate-180" : ""} 
              ${isActiveSection ? "text-(--color-surface)" : "text-(--color-primary)"}`}
          />
        )}
      </button>

      {items && open && !collapsed && (
        <div className="ml-2 flex flex-col space-y-1 border-l border-(--color-border) pl-3">
          {items.map((item) => {
            const isActiveItem = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative block rounded-lg px-3 py-1 text-md transition-all
                  ${isActiveItem
                    ? "shadow-sm"
                    : "text-(--color-text) hover:bg-(--color-soft) hover:text-(--color-primary)"
                  }`}
              >
                {isActiveItem && (
                  <div className="absolute left-0 top-0 h-full w-1.5 rounded-r bg-(--color-secondary) shadow-sm" />
                )}
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function Sidebar({ collapsed }: SidebarProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <aside
      className={`flex h-screen flex-col justify-between border-r border-border/50 bg-(--color-bg) 
        shadow-sm transition-all duration-300 overflow-auto no-scrollbar
        ${collapsed ? "w-12" : "w-48"}`}
    >
      {/* Top */}
      <div className="space-y-2 p-1">
        {/* Logo */}
        <Link
          href="/"
          className={`group flex items-center rounded-2xl p-3 transition-all duration-200 ${isHome
            ? "bg-(--color-secondary) text-(--color-surface) shadow-lg"
            : "text-(--color-text) hover:bg-(--color-soft) hover:text-(--color-primary) hover:shadow-md"
            } ${collapsed ? "justify-center px-2" : ""}`}
          title={collapsed ? "Home" : undefined}
        >
          <Home className="h-5 w-5 shrink-0" />
          {!collapsed && <span className="ml-3 text-md tracking-tight">AgroManagement</span>}
        </Link>

        {/* Navigation */}
        <nav className="space-y-1">
          <Section
            title="Animals"
            basePath="/animals"
            collapsed={collapsed}
            items={[
              { label: "Overview", href: "/animals/overview" },
              { label: "Individuals", href: "/animals/individuals" },
              { label: "Batches", href: "/animals/batches" },
            ]}
          />
          <Section
            title="Farming"
            basePath="/farming"
            collapsed={collapsed}
            items={[
              { label: "Overview", href: "/farming/overview" },
              { label: "Sowings", href: "/farming/sowings" },
              { label: "Harvests", href: "/farming/harvests" },
            ]}
          />
          <Section
            title="Stock"
            basePath="/stock"
            collapsed={collapsed}
            items={[
              { label: "Overview", href: "/stock" },
              { label: "Inventory", href: "/stock/inventory" },
              { label: "Tools", href: "/stock/tools" },
            ]}
          />
          <Section
            title="Finances"
            basePath="/finances"
            collapsed={collapsed}
            items={[
              { label: "Overview", href: "/finances/overview" },
              { label: "Providers", href: "/finances/providers" },
              { label: "Billing", href: "/finances/billing" },
            ]}
          />
        </nav>
      </div>

      {/* Bottom User Card */}
      <UserNavCard collapsed={collapsed} />
    </aside>
  );
}