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
    return (
      <Link
        href={href}
        className={`group flex items-center rounded-xl px-4 py-3 text-md transition-all duration-200
        ${collapsed ? "justify-center px-2" : ""}
        ${isActive
            ? "bg-[var(--color-secondary)] text-[var(--color-surface)] shadow-sm"
            : "text-[var(--color-text)] hover:bg-[var(--color-soft)] hover:text-[var(--color-primary)] hover:shadow-sm"
          }`}
        title={collapsed ? title : undefined}
      >
        <span className={`h-4 w-4 flex-shrink-0 ${!collapsed ? "mr-3" : "mx-auto"}`}>
          {basePath === "/my-farm" && <LandPlot className="h-4 w-4" />}
        </span>
        {!collapsed && title}
      </Link>
    );
  }

  // Section with submenu items
  return (
    <div className="space-y-2">
      <button
        onClick={() => !collapsed && items && setOpen(!open)}
        className={`group flex w-full items-center ${collapsed ? "justify-center" : "justify-between"} rounded-xl px-4 py-3 text-md transition-all duration-200
          ${isActiveSection
            ? "bg-[var(--color-secondary)] text-[var(--color-surface)]  shadow-sm"
            : "text-[var(--color-text)] hover:bg-[var(--color-soft)] hover:text-[var(--color-primary)] hover:shadow-sm"
          }`}
        title={collapsed ? title : undefined}
      >
        <div className="flex items-center">
          <span className={`h-4 w-4 flex-shrink-0 transition-colors ${!collapsed ? "mr-3" : "mx-auto"}`}>
            {basePath === "/animals" && <PiggyBank className="h-4 w-4" />}
            {basePath === "/farming" && <Sprout className="h-4 w-4" />}
            {basePath === "/stock" && <Package className="h-4 w-4" />}
            {basePath === "/finances" && <DollarSign className="h-4 w-4" />}
          </span>
          {!collapsed && title}
        </div>
        {items && !collapsed && (
          <ChevronDown
            size={16}
            className={`transition-transform duration-200 ${open ? "rotate-180" : ""} 
              ${isActiveSection ? "text-[var(--color-surface)]" : "text-[var(--color-primary)]"}`}
          />
        )}
      </button>

      {items && open && !collapsed && (
        <div className="ml-2 flex flex-col space-y-1 border-l border-[var(--color-border)] pl-6">
          {items.map((item) => {
            const isActiveItem = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative block rounded-lg px-3 py-2.5 text-md transition-all
                  ${isActiveItem
                    ? "shadow-sm"
                    : "text-[var(--color-text)] hover:bg-[var(--color-soft)] hover:text-[var(--color-primary)]"
                  }`}
              >
                {isActiveItem && (
                  <div className="absolute left-0 top-0 h-full w-1.5 rounded-r bg-[var(--color-secondary)] shadow-sm" />
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

type SidebarProps = {
  collapsed: boolean;
};

export default function Sidebar({ collapsed }: SidebarProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <aside
      className={`flex h-screen flex-col justify-between border-r border-[var(--color-border)]/50 bg-[var(--color-bg)] shadow-sm transition-all duration-300
      ${collapsed ? "w-20" : "w-48"}`}
    >
      {/* Top */}
      <div className="space-y-4 p-3">
        {/* Logo */}
        <Link
          href="/"
          className={`group flex items-center rounded-2xl p-4 transition-all duration-200 ${isHome
            ? "bg-[var(--color-secondary)] text-[var(--color-surface)] shadow-lg"
            : "text-[var(--color-text)] hover:bg-[var(--color-soft)] hover:text-[var(--color-primary)] hover:shadow-md"
            } ${collapsed ? "justify-center px-2" : ""}`}
          title={collapsed ? "Home" : undefined}
        >
          <Home className="h-5 w-5 flex-shrink-0" />
          {!collapsed && <span className="ml-3 text-xl tracking-tight">AgroGestion</span>}
        </Link>

        {/* Navigation */}
        <nav className="space-y-2">
          <Section
            title="My Farm"
            basePath="/my-farm"
            collapsed={collapsed}
            href="/my-farm"
          />
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