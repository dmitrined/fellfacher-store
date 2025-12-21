"use client";

import { HeroUIProvider } from "@heroui/react";
import { LanguageProvider } from "@/lib/i18n";
import { WishlistProvider } from '@/lib/WishlistContext';
import { CartProvider } from '@/lib/CartContext';
import { AuthProvider } from '@/lib/AuthContext';
import { OrdersProvider } from '@/lib/OrdersContext';

/**
 * Компонент-обертка для всех контекст-провайдеров приложения.
 * Включает локализацию, авторизацию, корзину, список желаемого и UI-библиотеку.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    // Провайдер управления языками (i18n) - самый верхний уровень
    <LanguageProvider>
      {/* Провайдер аутентификации (данные пользователя и сессия) */}
      <AuthProvider>
        {/* Провайдер управления историей заказов */}
        <OrdersProvider>
          {/* Провайдер списка избранных товаров (wishlist) */}
          <WishlistProvider>
            {/* Провайдер корзины (добавление, удаление, расчет цены) */}
            <CartProvider>
              {/* Провайдер библиотеки компонентов HeroUI (бывший NextUI) */}
              <HeroUIProvider>
                {/* Рендеринг дочерних элементов приложения */}
                {children}
              </HeroUIProvider>
            </CartProvider>
          </WishlistProvider>
        </OrdersProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}