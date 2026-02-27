"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { ChevronDown, DollarSign, Home, LandPlot, Package, PiggyBank, Sprout, User } from "lucide-react";
import UserNavCard from "./UserNavCard";

type SectionProps = {
  title: string;
  basePath: string;
  items?: { label: string; href: string }[];
  href?: string; // optional single link
};

function Section({ title, basePath, items, href }: SectionProps) {
  const pathname = usePathname();
  const isActiveSection = pathname === basePath || pathname.startsWith(basePath + "/");
  const [open, setOpen] = useState(isActiveSection);

  useEffect(() => {
    if (isActiveSection) setOpen(true);
  }, [isActiveSection]);

  // Single link section (e.g., My Farm)
  if (!items && href) {
    const isActive = pathname === href;
    return (
      <Link
        href={href}
        className={`group flex items-center rounded-xl px-4 py-3 text-md transition-all duration-200
        ${isActive
            ? "bg-[var(--color-secondary)] text-[var(--color-surface)] shadow-sm"
            : "text-[var(--color-text)] hover:bg-[var(--color-soft)] hover:text-[var(--color-primary)] hover:shadow-sm"
          }`}
      >
        <span className="mr-3 h-4 w-4   group-hover:text-[var(--color-primary)]">
          {basePath === "/my-farm" && <LandPlot className="h-4 w-4" />}
        </span>
        {title}
      </Link>
    );
  }

  // Section with submenu items
  return (
    <div className="space-y-2">
      <button
        onClick={() => items && setOpen(!open)}
        className={`group flex w-full items-center justify-between rounded-xl px-4 py-3 text- transition-all duration-200
          ${isActiveSection
            ? "bg-[var(--color-secondary)] text-[var(--color-surface)]  shadow-sm"
            : "text-[var(--color-text)] hover:bg-[var(--color-soft)] hover:text-[var(--color-primary)] hover:shadow-sm"
          }`}
      >
        <div className="flex items-center">
          <span className="mr-3 h-4 w-4   group-hover:text-[var(--color-primary)] transition-colors">
            {/* Icons per section */}
            {basePath === "/animals" && <PiggyBank className="h-4 w-4" />}
            {basePath === "/farming" && <Sprout className="h-4 w-4" />}
            {basePath === "/stock" && <Package className="h-4 w-4" />}
            {basePath === "/finances" && <DollarSign className="h-4 w-4" />}
            {basePath === "/my-farm" && <LandPlot className="h-4 w-4" />}
          </span>
          {title}
        </div>
        {items && (
          <ChevronDown
            size={16}
            className={`transition-transform duration-200 ${open ? "rotate-180" : ""} 
              ${isActiveSection ? "text-[var(--color-surface)]" : "text-[var(--color-muted)]"}`}
          />
        )}
      </button>

      {items && open && (
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

export default function Sidebar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <aside className="flex h-screen flex-col justify-between border-r border-[var(--color-border)]/50 bg-[var(--color-bg)] shadow-sm">
      {/* Top */}
      <div className="space-y-4 p-3">
        {/* Logo / Brand */}
        <Link
          href="/"
          className={`group flex items-center rounded-2xl p-4 transition-all duration-200 ${isHome
            ? "bg-[var(--color-secondary)] text-[var(--color-surface)] shadow-lg"
            : "text-[var(--color-text)] hover:bg-[var(--color-soft)] hover:text-[var(--color-primary)] hover:shadow-md"
            }`}
        >
          {isHome ? (
            <Home className="mr-3 h-5 w-5 text-[var(--color-surface)]" />
          ) : (
            <Home className="mr-3 h-5 w-5  group-hover:text-[var(--color-primary)]" />
          )}
          <span className="text-xl tracking-tight">AgroGestion</span>
        </Link>

        {/* Navigation */}
        <nav className="space-y-2">
          <Section
            title="Animals"
            basePath="/animals"
            items={[
              { label: "Individuals", href: "/animals/individuals" },
              { label: "Batches", href: "/animals/batches" },
            ]}
          />
          <Section
            title="Farming"
            basePath="/farming"
            items={[
              { label: "Sowings", href: "/farming/sowings" },
              { label: "Harvests", href: "/farming/harvests" },
            ]}
          />
          <Section
            title="Stock"
            basePath="/stock"
            items={[
              { label: "Overview", href: "/stock" },
              { label: "Inventory", href: "/stock/inventory" },
              { label: "Tools", href: "/stock/tools" },
            ]}
          />
          <Section
            title="Finances"
            basePath="/finances"
            items={[
              { label: "Providers", href: "/finances/providers" },
              { label: "Billing", href: "/finances/billing" },
            ]}
          />
          <Section
            title="My Farm"
            basePath="/my-farm"
            href="/my-farm"
          />
        </nav>
      </div>

      {/* Bottom User Card */}
        <UserNavCard />
    </aside>
  );
}