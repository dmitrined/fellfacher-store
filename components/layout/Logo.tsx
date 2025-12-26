/**
 * Компонент логотипа Fellbacher Weingärtner.
 * Поддерживает разные цветовые варианты (светлый, темный, золотой).
 */
import React from "react";
import Link from "next/link";

interface LogoProps {
    variant?: "light" | "dark" | "gold";
    className?: string;
    onClick?: () => void;
}

const Logo: React.FC<LogoProps> = ({ variant = "dark", className = "", onClick }) => {
    const getTextColor = () => {
        switch (variant) {
            case "light":
                return "text-white";
            case "gold":
                return "text-wine-gold";
            default:
                return "text-wine-dark dark:text-white";
        }
    };

    return (
        <Link
            href="/"
            className={`flex flex-col items-start no-underline ${className}`}
            onClick={onClick}
        >
            <span className={`text-xl md:text-2xl font-black tracking-tighter serif leading-none uppercase ${getTextColor()}`}>
                FELLBACHER
            </span>
            <span className="text-[10px] font-bold tracking-[0.3em] text-wine-gold uppercase leading-none mt-1">
                Weingärtner
            </span>
        </Link>
    );
};

export default Logo;
