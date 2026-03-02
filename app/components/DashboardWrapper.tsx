"use client";

import { useState } from "react";
import Sidebar from "./NavSection";
import { ArrowRightToLine, ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function DashboardWrapper({ children }: { children: React.ReactNode }) {
    const [collapsed, setCollapsed] = useState(false);
    const pathname = usePathname();
    const segments = pathname.split("/").filter(Boolean);

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar collapsed={collapsed} />

            <div className="flex-1 flex flex-col overflow-auto">
                <header className="flex items-center justify-between p-1 backdrop-blur-sm">
                    {/* Breadcrumb + Toggle */}
                    <nav className="flex items-center space-x-2 text-sm text-muted">
                        {/* Sidebar toggle arrow */}
                        <button
                            className="ml-2 p-1 rounded hover:bg-[var(--color-soft)] transition-all flex items-center"
                            onClick={() => setCollapsed(!collapsed)}
                            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                        >
                            <ArrowRightToLine
                                className={`h-5 w-5 transition-transform ${collapsed ? "rotate-0" : "rotate-180"
                                    }`}
                            />
                        </button>

                        {/* Breadcrumbs */}
                        {segments.length === 0 ? (
                            <span className="text-muted">Home</span>
                        ) : (
                            <>
                                {/* Always include Home as first clickable link */}
                                <Link href="/" className="hover:text-primary flex items-center">
                                    Home
                                </Link>

                                {segments.map((seg, idx) => {
                                    // Rebuild the path for each breadcrumb segment
                                    const path = "/" + segments.slice(0, idx + 1).join("/");

                                    return (
                                        <span key={idx} className="flex items-center space-x-2">
                                            <span>/</span>
                                            <Link
                                                href={path}
                                                className="capitalize hover:text-primary"
                                            >
                                                {seg.replace("-", " ")}
                                            </Link>
                                        </span>
                                    );
                                })}
                            </>
                        )}
                    </nav>
                </header>

                <main>{children}</main>
            </div>
        </div>
    );
}