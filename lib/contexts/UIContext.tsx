"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UIContextType {
    isMobileMenuOpen: boolean;
    setMobileMenuOpen: (open: boolean) => void;
    toggleMobileMenu: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: ReactNode }) {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => setMobileMenuOpen(prev => !prev);

    return (
        <UIContext.Provider value={{
            isMobileMenuOpen,
            setMobileMenuOpen,
            toggleMobileMenu
        }}>
            {children}
        </UIContext.Provider>
    );
}

export function useUI() {
    const context = useContext(UIContext);
    if (context === undefined) {
        throw new Error('useUI must be used within a UIProvider');
    }
    return context;
}
