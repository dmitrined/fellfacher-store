"use client";

/**
 * Модальное окно авторизации и регистрации.
 * Содержит формы для входа и создания нового аккаунта, а также проверку сложности пароля.
 */
import React, { useState, useMemo } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { useTranslation } from '@/lib/i18n';
import { X, Mail, Lock, User as UserIcon, ArrowRight, Eye, EyeOff } from 'lucide-react';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
    const { t } = useTranslation();
    const { login, register } = useAuth();
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);



    const passwordStrength = useMemo(() => {
        if (!password) return 0;
        let strength = 0;
        if (password.length >= 6) strength++;
        if (password.length >= 10) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;

        if (strength <= 2) return 1; // Weak
        if (strength <= 4) return 2; // Medium
        return 3; // Strong
    }, [password]);

    const strengthColor = () => {
        switch (passwordStrength) {
            case 1: return 'bg-red-500';
            case 2: return 'bg-yellow-500';
            case 3: return 'bg-green-500';
            default: return 'bg-zinc-200 dark:bg-zinc-700';
        }
    };

    const strengthLabel = () => {
        switch (passwordStrength) {
            case 1: return t("strength_weak");
            case 2: return t("strength_medium");
            case 3: return t("strength_strong");
            default: return '';
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!isLogin && password !== confirmPassword) {
            setError(t("passwords_not_matching"));
            return;
        }

        setLoading(true);

        try {
            if (isLogin) {
                await login(email, password);
            } else {
                await register(name, email, password);
            }
            onClose();
        } catch (err: any) {
            setError(err.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose} />
            <div className="relative bg-white dark:bg-zinc-900 w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in slide-in-from-bottom-8 duration-500">
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors z-10"
                >
                    <X className="w-5 h-5 dark:text-zinc-400" />
                </button>

                <div className="p-8 md:p-12">
                    <div className="mb-8">
                        <h2 className="text-3xl font-black serif dark:text-white mb-2">
                            {isLogin ? t("login_title") : t("register_title")}
                        </h2>
                        <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                            {isLogin ? t("login_subtitle") : t("register_subtitle")}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {!isLogin && (
                            <div className="relative">
                                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                                <input
                                    required
                                    type="text"
                                    placeholder={t("auth_name_placeholder")}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border-2 border-transparent focus:border-wine-gold outline-none transition-all dark:text-white"
                                />
                            </div>
                        )}
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                            <input
                                required
                                type="email"
                                placeholder={t("auth_email_placeholder")}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border-2 border-transparent focus:border-wine-gold outline-none transition-all dark:text-white"
                            />
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                            <input
                                required
                                type={showPassword ? "text" : "password"}
                                placeholder={t("auth_password_placeholder")}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-12 pr-12 py-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border-2 border-transparent focus:border-wine-gold outline-none transition-all dark:text-white"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-wine-gold transition-colors"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>

                        {!isLogin && password && (
                            <div className="px-2">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{t("password_strength")}</span>
                                    <span className={`text-[10px] font-black uppercase tracking-widest ${passwordStrength === 1 ? 'text-red-500' : passwordStrength === 2 ? 'text-yellow-500' : 'text-green-500'}`}>
                                        {strengthLabel()}
                                    </span>
                                </div>
                                <div className="flex gap-1 h-1">
                                    <div className={`flex-1 rounded-full transition-colors ${passwordStrength >= 1 ? strengthColor() : 'bg-zinc-100 dark:bg-zinc-800'}`} />
                                    <div className={`flex-1 rounded-full transition-colors ${passwordStrength >= 2 ? strengthColor() : 'bg-zinc-100 dark:bg-zinc-800'}`} />
                                    <div className={`flex-1 rounded-full transition-colors ${passwordStrength >= 3 ? strengthColor() : 'bg-zinc-100 dark:bg-zinc-800'}`} />
                                </div>
                            </div>
                        )}

                        {!isLogin && (
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                                <input
                                    required
                                    type={showPassword ? "text" : "password"}
                                    placeholder={t("auth_confirm_password_placeholder")}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border-2 border-transparent focus:border-wine-gold outline-none transition-all dark:text-white"
                                />
                            </div>
                        )}

                        {error && (
                            <p className="text-red-500 text-xs font-bold px-2">{error}</p>
                        )}

                        <button
                            disabled={loading}
                            type="submit"
                            className="w-full bg-wine-dark text-white py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-wine-gold hover:text-wine-dark transition-all duration-300 flex items-center justify-center gap-2 group shadow-xl shadow-zinc-950/20"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    {isLogin ? t("login_button") : t("register_button")}
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8">
                        <div className="relative flex items-center justify-center mb-8">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-zinc-100 dark:border-zinc-800"></div>
                            </div>
                            <span className="relative px-4 bg-white dark:bg-zinc-900 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                                {t("social_login_with")}
                            </span>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <button className="flex items-center justify-center p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-zinc-100 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors group">
                                <svg className="w-5 h-5 dark:text-white group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                            </button>
                            <button className="flex items-center justify-center p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-zinc-100 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors group">
                                <svg className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </button>
                            <button className="flex items-center justify-center p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-zinc-100 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors group">
                                <svg className="w-5 h-5 dark:text-white group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M11.673 3.284c-.663 0-1.332.128-1.97.38C8.36 4.195 7.14 5.253 6.082 6.83 4.887 8.627 4.29 10.605 4.29 12.755c0 2.378.71 4.562 2.126 6.544 1.31 1.838 2.923 2.76 4.846 2.76.62 0 1.258-.124 1.916-.368.57-.21.996-.316 1.278-.316.273 0 .633.09 1.082.268.742.296 1.487.444 2.235.444 1.624 0 3.056-.69 4.292-2.072l.492-.555-1.042-.647c-1.2-.74-1.802-1.826-1.802-3.253 0-1.12.355-2.002 1.063-2.64.48-.432 1.077-.754 1.793-.966l.63-.16-.14-.663c-.156-.76-.45-1.464-.877-2.115-1.006-1.52-2.433-2.283-4.283-2.283-.695 0-1.442.148-2.24.444-.45.166-.816.25-1.093.25-.323 0-.75-.102-1.284-.305-.724-.277-1.396-.416-2.016-.416zm.79-3.213c.45 0 .89.043 1.32.128-1.637 2.29-1.467 4.385.508 6.255-2.31.256-4.48-1.492-4.997-3.69-.374-1.597.228-3.32 1.554-4.508.384-.347.882-.574 1.415-.658.067-.027.134-.027.202-.027z" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className="mt-8 text-center">
                        <button
                            onClick={() => {
                                setIsLogin(!isLogin);
                                setError('');
                            }}
                            className="text-sm font-bold text-zinc-500 hover:text-wine-gold transition-colors"
                        >
                            {isLogin ? t("auth_toggle_register") : t("auth_toggle_login")}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
