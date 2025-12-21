/**
 * Мобильное меню навигации.
 * Появляется на смартфонах и планшетах, предоставляя доступ к категориям товаров и разделам сайта.
 */
"use client";
import React from "react";
import Link from "next/link";
import { Close, ArrowRight, ChevronDown } from "../../../icon-sets";
import Logo from "../Logo";
import { useState } from "react";

interface MobileMenuProps {
    t: (key: string) => string;
    mobileOpen: boolean;
    setMobileOpen: (open: boolean) => void;
    navigationItems: Array<{ label: string; path: string }>;
    shopCategories: Array<{ label: string; path: string }>;
    eventCategories: Array<{ label: string; path: string }>;
    aboutCategories: Array<{ label: string; path: string }>;
    contactCategories: Array<{ label: string; path: string }>;
}

const MobileMenuSection: React.FC<{
    title: string;
    isOpen: boolean;
    onToggle: () => void;
    children: React.ReactNode;
}> = ({ title, isOpen, onToggle, children }) => {
    return (
        <div className="border-b border-zinc-100 dark:border-zinc-900 last:border-0">
            <button
                onClick={onToggle}
                className="w-full py-4 flex items-center justify-between text-left group"
            >
                <span className={`text-lg font-black uppercase tracking-widest transition-colors ${isOpen ? "text-wine-gold" : "text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-200"}`}>
                    {title}
                </span>
                <ChevronDown
                    className={`w-5 h-5 text-zinc-400 transition-transform duration-300 ${isOpen ? "rotate-180 text-wine-gold" : ""}`}
                />
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[500px] opacity-100 mb-4" : "max-h-0 opacity-0"}`}
            >
                <div className="flex flex-col gap-3 pl-2">
                    {children}
                </div>
            </div>
        </div>
    );
};

const MobileMenu: React.FC<MobileMenuProps> = ({
    t,
    mobileOpen,
    setMobileOpen,
    navigationItems,
    shopCategories,
    eventCategories,
    aboutCategories,
    contactCategories,
}) => {
    const [openSection, setOpenSection] = useState<string | null>(null);

    if (!mobileOpen) return null;

    const toggleSection = (section: string) => {
        setOpenSection(openSection === section ? null : section);
    };

    return (
        <div className="fixed inset-0 lg:hidden z-[100]">
            <div
                className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm animate-in fade-in duration-500"
                onClick={() => setMobileOpen(false)}
            />
            <div className="absolute left-0 top-0 h-full w-[85%] max-w-sm bg-white dark:bg-zinc-950 p-8 shadow-[20px_0_50px_rgba(0,0,0,0.3)] animate-in slide-in-from-left duration-500 flex flex-col overflow-y-auto">
                <div className="flex items-center justify-between mb-8 border-b border-zinc-100 dark:border-zinc-900 pb-6 flex-shrink-0">
                    <Logo onClick={() => setMobileOpen(false)} />
                    <button
                        onClick={() => setMobileOpen(false)}
                        className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full transition-colors"
                        aria-label="Close menu"
                    >
                        <Close className="w-6 h-6 dark:text-zinc-400" />
                    </button>
                </div>

                <nav className="flex flex-col flex-1">
                    {/* Main Navigation Items */}
                    <div className="flex flex-col gap-4 mb-6">
                        {navigationItems.map((item, idx) => (
                            <Link
                                key={item.label}
                                href={item.path}
                                className="text-2xl font-black serif dark:text-white hover:text-wine-gold transition-all duration-300"
                                onClick={() => setMobileOpen(false)}
                                style={{ animationDelay: `${idx * 100}ms` }}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    <div className="flex flex-col">
                        <MobileMenuSection
                            title={t("nav_shop")}
                            isOpen={openSection === "shop"}
                            onToggle={() => toggleSection("shop")}
                        >
                            {shopCategories.map((item) => (
                                <Link
                                    key={item.label}
                                    href={item.path}
                                    className="text-base font-medium text-zinc-600 dark:text-zinc-400 hover:text-wine-gold transition-colors flex items-center justify-between group py-1"
                                    onClick={() => setMobileOpen(false)}
                                >
                                    {item.label}
                                    <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-wine-gold" />
                                </Link>
                            ))}
                        </MobileMenuSection>

                        <MobileMenuSection
                            title={t("nav_events")}
                            isOpen={openSection === "events"}
                            onToggle={() => toggleSection("events")}
                        >
                            {eventCategories.map((item) => (
                                item.path === '#' || item.path === '' ? (
                                    <div
                                        key={item.label}
                                        className="text-base font-medium text-zinc-400 dark:text-zinc-600 cursor-not-allowed flex items-center justify-between py-1"
                                    >
                                        {item.label}
                                    </div>
                                ) : (
                                    <Link
                                        key={item.label}
                                        href={item.path}
                                        className="text-base font-medium text-zinc-600 dark:text-zinc-400 hover:text-wine-gold transition-colors flex items-center justify-between group py-1"
                                        onClick={() => setMobileOpen(false)}
                                    >
                                        {item.label}
                                        <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-wine-gold" />
                                    </Link>
                                )
                            ))}
                        </MobileMenuSection>

                        <MobileMenuSection
                            title={t("nav_about_us")}
                            isOpen={openSection === "about"}
                            onToggle={() => toggleSection("about")}
                        >
                            {aboutCategories.map((item) => (
                                item.path === '#' || item.path === '' ? (
                                    <div
                                        key={item.label}
                                        className="text-base font-medium text-zinc-400 dark:text-zinc-600 cursor-not-allowed flex items-center justify-between py-1"
                                    >
                                        {item.label}
                                    </div>
                                ) : (
                                    <Link
                                        key={item.label}
                                        href={item.path}
                                        className="text-base font-medium text-zinc-600 dark:text-zinc-400 hover:text-wine-gold transition-colors flex items-center justify-between group py-1"
                                        onClick={() => setMobileOpen(false)}
                                    >
                                        {item.label}
                                        <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-wine-gold" />
                                    </Link>
                                )
                            ))}
                        </MobileMenuSection>

                        <MobileMenuSection
                            title={t("nav_contact")}
                            isOpen={openSection === "contact"}
                            onToggle={() => toggleSection("contact")}
                        >
                            {contactCategories.map((item) => (
                                item.path === '#' || item.path === '' ? (
                                    <div
                                        key={item.label}
                                        className="text-base font-medium text-zinc-400 dark:text-zinc-600 cursor-not-allowed flex items-center justify-between py-1"
                                    >
                                        {item.label}
                                    </div>
                                ) : (
                                    <Link
                                        key={item.label}
                                        href={item.path}
                                        className="text-base font-medium text-zinc-600 dark:text-zinc-400 hover:text-wine-gold transition-colors flex items-center justify-between group py-1"
                                        onClick={() => setMobileOpen(false)}
                                    >
                                        {item.label}
                                        <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-wine-gold" />
                                    </Link>
                                )
                            ))}
                        </MobileMenuSection>
                    </div>
                </nav>


            </div>
        </div>
    );
};

export default MobileMenu;
