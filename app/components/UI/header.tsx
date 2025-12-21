"use client";

/**
 * Главный компонент шапки сайта.
 * Содержит логотип, основную навигацию, поиск, корзину и управление пользовательской сессией.
 */
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/lib/i18n";
import { useWishlist } from "@/lib/WishlistContext";
import { useCart } from "@/lib/CartContext";
import { useAuth } from "@/lib/AuthContext";
import { wines } from "@/lib/data/wines";
import AuthModal from "./AuthModal";
import { Menu } from "../../icon-sets";
import TopBar from "./Header/TopBar";
import Navigation from "./Header/Navigation";
import HeaderActions from "./Header/HeaderActions";
import CartDropdown from "./Header/CartDropdown";
import SearchOverlay from "./Header/SearchOverlay";
import MobileMenu from "./Header/MobileMenu";
import Logo from "./Logo";

const Header: React.FC = () => {
  // Хуки для перевода, состояния списков и данных пользователя
  const { language, setLanguage, t } = useTranslation();
  const { wishlist } = useWishlist();
  const { getCartCount, cart, removeFromCart, updateQuantity } = useCart();
  const { isLoggedIn, user } = useAuth();

  // Состояния для управления открытием различных меню и модалок
  const [mobileOpen, setMobileOpen] = useState(false); // Мобильное меню
  const [searchOpen, setSearchOpen] = useState(false); // Прямой поиск
  const [authModalOpen, setAuthModalOpen] = useState(false); // Окно логина
  const [moreMenuOpen, setMoreMenuOpen] = useState(false); // Выпадающее меню "Магазин"
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false); // Предпросмотр корзины
  const [searchTerm, setSearchTerm] = useState(""); // Текст поиска

  const router = useRouter();

  // Рефы для отслеживания кликов вне области меню (для их закрытия)
  const moreMenuRef = useRef<HTMLDivElement>(null);
  const cartDropdownRef = useRef<HTMLDivElement>(null);
  const cartButtonRef = useRef<HTMLButtonElement>(null);

  const [eventsMenuOpen, setEventsMenuOpen] = useState(false);
  const eventsMenuRef = useRef<HTMLDivElement>(null);

  const [aboutMenuOpen, setAboutMenuOpen] = useState(false);
  const aboutMenuRef = useRef<HTMLDivElement>(null);

  const [contactMenuOpen, setContactMenuOpen] = useState(false);
  const contactMenuRef = useRef<HTMLDivElement>(null);

  // Группы ссылок для навигации
  const navigationItems = [
    { label: t("nav_loyalty"), path: "/loyalty" },
  ];

  const shopCategories = [
    { label: t("nav_all_wines"), path: "/catalog" },
    { label: t("nav_red_wines"), path: "/catalog?type=Rotwein" },
    { label: t("nav_white_wines"), path: "/catalog?type=Weißwein" },
    { label: t("wine_type_rose"), path: "/catalog?type=Roséwein" },
    { label: t("wine_type_sparkling"), path: "/catalog?type=Sekt" },
    { label: t("wine_type_alcohol_free"), path: "/catalog?type=Alkoholfrei" },
  ];

  const eventCategories = [
    { label: t("event_kellerblicke"), path: "/events?type=Kellerblicke" },
    { label: t("event_weinfeste"), path: "/events?type=Weinfeste" },
    { label: t("event_weinproben"), path: "/events?type=Weinproben" },
    { label: t("event_weintreff"), path: "/events?type=Weintreff" },
    { label: t("event_afterwork"), path: "/events?type=Afterwork" },
    { label: t("event_wein_weiter"), path: "/events?type=WeinWeiter" },
    { label: t("event_wein_raetsel_tour"), path: "/events?type=WeinRaetselTour" },
  ];

  const aboutCategories = [
    { label: t("about_we_about_us"), path: "/#" },
    { label: t("about_team"), path: "/#" },
    { label: t("about_impressions"), path: "/#" },
    { label: t("about_next_generation"), path: "/#" },
    { label: t("about_awards"), path: "/#" },
    { label: t("about_worth_reading"), path: "/#" },
    { label: t("about_partners"), path: "/#" },
    { label: t("about_business_vfb"), path: "/#" },
  ];

  const contactCategories = [
    { label: t("contact_info_hours"), path: "/#" },
    { label: t("contact_directions"), path: "/#" },
    { label: t("contact_jobs"), path: "/#" },
  ];

  // Эффект для закрытия всех выпадающих меню при клике в любое другое место экрана
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target as Node)) {
        setMoreMenuOpen(false);
      }
      if (eventsMenuRef.current && !eventsMenuRef.current.contains(event.target as Node)) {
        setEventsMenuOpen(false);
      }
      if (aboutMenuRef.current && !aboutMenuRef.current.contains(event.target as Node)) {
        setAboutMenuOpen(false);
      }
      if (contactMenuRef.current && !contactMenuRef.current.contains(event.target as Node)) {
        setContactMenuOpen(false);
      }
      if (
        cartDropdownRef.current &&
        !cartDropdownRef.current.contains(event.target as Node) &&
        cartButtonRef.current &&
        !cartButtonRef.current.contains(event.target as Node)
      ) {
        setCartDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/catalog?search=${encodeURIComponent(searchTerm)}`);
      setSearchOpen(false);
    }
  };

  const totalPrice = cart.reduce((total, item) => {
    const wine = wines.find((w) => w.id === item.id);
    return total + (wine ? wine.price * item.quantity : 0);
  }, 0);

  return (
    <>
      {/* Верхняя тонкая полоса с выбором языка и промо-текстом */}
      <TopBar t={t} language={language} setLanguage={setLanguage} />

      <header className="sticky top-0 z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800 px-4 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between py-4 md:py-6">
            <div className="flex items-center gap-8">
              {/* Кнопка гамбургер для мобильных устройств */}
              <button
                className="lg:hidden p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                <Menu className="w-6 h-6 dark:text-zinc-300" />
              </button>

              {/* Логотип компании */}
              <Logo />

              {/* Основная навигация (Десктоп) */}
              <Navigation
                t={t}
                moreMenuOpen={moreMenuOpen}
                setMoreMenuOpen={setMoreMenuOpen}
                moreMenuRef={moreMenuRef}
                eventsMenuOpen={eventsMenuOpen}
                setEventsMenuOpen={setEventsMenuOpen}
                eventsMenuRef={eventsMenuRef}
                aboutMenuOpen={aboutMenuOpen}
                setAboutMenuOpen={setAboutMenuOpen}
                aboutMenuRef={aboutMenuRef}
                contactMenuOpen={contactMenuOpen}
                setContactMenuOpen={setContactMenuOpen}
                contactMenuRef={contactMenuRef}
                navigationItems={navigationItems}
                shopCategories={shopCategories}
                eventCategories={eventCategories}
                aboutCategories={aboutCategories}
                contactCategories={contactCategories}
              />
            </div>

            <div className="relative">
              {/* Кнопки действий: Поиск, Аккаунт, Избранное, Корзина */}
              <HeaderActions
                isLoggedIn={isLoggedIn}
                wishlistCount={wishlist.length}
                cartCount={getCartCount()}
                searchOpen={searchOpen}
                setSearchOpen={setSearchOpen}
                cartDropdownOpen={cartDropdownOpen}
                setCartDropdownOpen={setCartDropdownOpen}
                onUserClick={() =>
                  isLoggedIn ? router.push("/dashboard") : setAuthModalOpen(true)
                }
                onWishlistClick={() =>
                  isLoggedIn ? router.push("/dashboard?tab=wishlist") : setAuthModalOpen(true)
                }
                cartButtonRef={cartButtonRef}
              />

              {/* Всплывающее окно предпросмотра корзины */}
              {cartDropdownOpen && (
                <CartDropdown
                  t={t}
                  cart={cart}
                  wines={wines}
                  getCartCount={getCartCount}
                  totalPrice={totalPrice}
                  updateQuantity={updateQuantity}
                  removeFromCart={removeFromCart}
                  setCartDropdownOpen={setCartDropdownOpen}
                  cartDropdownRef={cartDropdownRef}
                />
              )}
            </div>
          </div>
        </div>

        {/* Оверлей полноэкранного поиска */}
        {searchOpen && (
          <SearchOverlay
            t={t}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            setSearchOpen={setSearchOpen}
            handleSearchSubmit={handleSearchSubmit}
          />
        )}
      </header>

      {/* Мобильное меню (гамбургер) */}
      <MobileMenu
        t={t}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        navigationItems={navigationItems}
        shopCategories={shopCategories}
        eventCategories={eventCategories}
        aboutCategories={aboutCategories}
        contactCategories={contactCategories}
      />

      {/* Модальное окно входа / регистрации */}
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
  );
};

export default Header;