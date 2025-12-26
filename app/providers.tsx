"use client";

import { HeroUIProvider } from "@heroui/react";
import { LanguageProvider } from "@/lib/i18n";
import { WishlistProvider } from '@/lib/contexts/WishlistContext';
import { CartProvider } from '@/lib/contexts/CartContext';
import { AuthProvider } from '@/lib/contexts/AuthContext';
import { OrdersProvider } from '@/lib/contexts/OrdersContext';
import { WinesProvider } from '@/lib/contexts/WinesContext';

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
          {/* Провайдер списка вин (из API или моки) */}
          <WinesProvider>
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
          </WinesProvider>
        </OrdersProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}