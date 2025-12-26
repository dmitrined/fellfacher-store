/**
 * Компонент для отображения ссылок на социальные сети в подвале сайта.
 * Содержит иконки Facebook, Twitter и Instagram.
 */
"use client";
import React from "react";
import Link from "next/link";
import { Facebook, Twitter, Instagram } from "@/app/icon-sets";

interface SocialLinksProps {
    className?: string;
}

const SocialLinks: React.FC<SocialLinksProps> = ({ className = "" }) => {
    return (
        <div className={`flex items-center gap-5 ${className}`}>
            <Link
                href="https://facebook.com"
                className="text-zinc-500 hover:text-wine-gold transition-colors"
            >
                <Facebook className="w-5 h-5" />
            </Link>
            <Link
                href="https://twitter.com"
                className="text-zinc-500 hover:text-wine-gold transition-colors"
            >
                <Twitter className="w-5 h-5" />
            </Link>
            <Link
                href="https://instagram.com"
                className="text-zinc-500 hover:text-wine-gold transition-colors"
            >
                <Instagram className="w-5 h-5" />
            </Link>
        </div>
    );
};

export default SocialLinks;
