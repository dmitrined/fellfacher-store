/**
 * Назначение файла: Компонент нижней навигации для мобильных устройств.
 * Зависимости: HeroUI, Framer Motion, Lucide React, i18n Context.
 * Особенности: Client Component, Mobile-only (hidden on md+), Premium glassmorphism.
 */

"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "@/lib/i18n";
import { Home, Wine, Calendar, QrCode, MoreHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useUI } from "@/lib/contexts/UIContext";

const BottomNav = () => {
    const pathname = usePathname();
    const { t } = useTranslation();
    const { toggleMobileMenu } = useUI();

    // Определение пунктов навигации (расширенный список для мобильных)
    const navItems = [
        {
            label: t("bottom_nav_home"),
            href: "/",
            icon: Home,
        },
        {
            label: t("bottom_nav_shop"),
            href: "/shop",
            icon: Wine,
        },
        {
            label: t("bottom_nav_events"),
            href: "/events",
            icon: Calendar,
        },
        {
            label: t("bottom_nav_mycode"),
            href: "/loyalty/qr-code",
            icon: QrCode,
        },
        {
            label: t("bottom_nav_more"),
            href: "#",
            icon: MoreHorizontal,
            onClick: (e: React.MouseEvent) => {
                e.preventDefault();
                toggleMobileMenu();
            }
        },
    ];


    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-black/80 backdrop-blur-lg border-t border-white/10 pb-safe">
            <nav className="flex items-center justify-around h-16">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            onClick={item.onClick}
                            className="relative flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors"
                        >

                            <motion.div
                                initial={false}
                                animate={{
                                    scale: isActive ? 1.1 : 1,
                                    color: isActive ? "#D4AF37" : "#9ca3af", // Gold for active, grey for inactive
                                }}
                                className="flex flex-col items-center"
                            >
                                <Icon size={24} />
                                <span className="text-[10px] font-medium uppercase tracking-wider">
                                    {item.label}
                                </span>

                                <AnimatePresence>
                                    {isActive && (
                                        <motion.div
                                            layoutId="bottom-nav-indicator"
                                            className="absolute -top-1 w-8 h-0.5 bg-[#D4AF37]"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                        />
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
};

export default BottomNav;
