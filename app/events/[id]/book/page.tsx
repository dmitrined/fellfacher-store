"use client";

/**
 * Страница бронирования билетов на дегустацию или мероприятие.
 * Содержит пошаговую форму: выбор даты, количество гостей, подтверждение и успех.
 */

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTranslation } from '@/lib/i18n';
import { Calendar, Users, ArrowLeft, CheckCircle2, CreditCard, Minus, Plus } from 'lucide-react';
import Link from 'next/link';
import { useBookingStore } from '@/lib/store/useBookingStore';
import { getEvents } from '@/lib/data/events';

export default function BookingPage() {
    const { t } = useTranslation();
    const params = useParams();
    const [step, setStep] = useState(1);
    const router = useRouter();
    const addBooking = useBookingStore(state => state.addBooking);

    const [selectedDate, setSelectedDate] = useState("Fr, 24. Feb");
    const [guestCount, setGuestCount] = useState(2);

    const eventId = params.id as string;
    const events = getEvents(t);
    const event = events.find(e => e.id === eventId);
    const pricePerPerson = event ? parseFloat(event.price.replace(/[^\d.]/g, '')) || 49 : 49;
    const totalPrice = pricePerPerson * guestCount;

    const handleNext = () => {
        if (step < 3) setStep(step + 1);
        else {
            // Save booking to local storage via context
            addBooking({
                eventId: eventId,
                eventTitle: event?.title || "Event",
                date: selectedDate,
                time: "18:30 Uhr",
                guests: guestCount,
                totalAmount: totalPrice
            });
            setStep(4);
        }
    };

    if (step === 4) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white dark:bg-zinc-950 px-4">
                <div className="max-w-md w-full text-center space-y-8 animate-in fade-in zoom-in duration-500">
                    <div className="inline-flex p-6 bg-green-50 dark:bg-green-900/20 rounded-full">
                        <CheckCircle2 className="w-20 h-20 text-green-500" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black serif dark:text-white mb-4 italic">{t("booking_success_title")}</h1>
                        <p className="text-zinc-500 dark:text-zinc-400">
                            {t("booking_success_desc")}
                        </p>
                    </div>
                    <Link
                        href="/events"
                        className="inline-block w-full py-5 bg-wine-dark text-white rounded-2xl font-black uppercase tracking-widest hover:bg-wine-gold hover:text-wine-dark transition-all"
                    >
                        {t("booking_back_to_events")}
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pt-32 pb-24">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link href="/events" className="inline-flex items-center text-zinc-400 hover:text-wine-gold mb-12 transition-colors group">
                    <ArrowLeft className="w-5 h-5 mr-3 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-[10px] font-black uppercase tracking-widest">{t("booking_cancel")}</span>
                </Link>

                <div className="bg-white dark:bg-zinc-900 rounded-[3rem] p-10 md:p-16 border border-zinc-100 dark:border-zinc-800 shadow-2xl">
                    <div className="mb-12">
                        <h1 className="text-4xl font-black serif dark:text-white mb-2 italic">{t("booking_title")}</h1>
                        <div className="flex gap-2 mt-4">
                            {[1, 2, 3].map((i) => (
                                <div
                                    key={i}
                                    className={`h-1 flex-grow rounded-full transition-colors ${step >= i ? 'bg-wine-gold' : 'bg-zinc-100 dark:bg-zinc-800'}`}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="space-y-12">
                        {step === 1 && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <h3 className="text-xl font-bold dark:text-white mb-6 serif">{t("booking_step_1")}</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {["Fr, 24. Feb", "Sa, 25. Feb", "Fr, 02. Mär"].map((date) => (
                                        <button
                                            key={date}
                                            onClick={() => setSelectedDate(date)}
                                            className={`p-6 border rounded-2xl text-left transition-colors group ${selectedDate === date ? 'border-wine-gold bg-wine-gold/5' : 'border-zinc-100 dark:border-zinc-800 hover:border-wine-gold'}`}
                                        >
                                            <Calendar className={`w-5 h-5 mb-4 ${selectedDate === date ? 'text-wine-gold' : 'text-zinc-400'}`} />
                                            <span className="block font-bold dark:text-white">{date}</span>
                                            <span className="text-xs text-zinc-500">18:30 Uhr</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <h3 className="text-xl font-bold dark:text-white mb-6 serif">{t("booking_step_2")}</h3>
                                <div className="flex items-center justify-between p-6 bg-zinc-50 dark:bg-zinc-800 rounded-2xl">
                                    <div className="flex items-center gap-4">
                                        <Users className="w-6 h-6 text-wine-gold" />
                                        <span className="font-bold dark:text-white">{t("booking_guests")}</span>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <button
                                            onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                                            className="w-10 h-10 rounded-full border border-zinc-200 dark:border-zinc-700 flex items-center justify-center font-bold dark:text-white hover:bg-wine-gold hover:border-wine-gold transition-colors"
                                        >
                                            <Minus size={18} />
                                        </button>
                                        <span className="text-xl font-black serif italic dark:text-white">{guestCount}</span>
                                        <button
                                            onClick={() => setGuestCount(guestCount + 1)}
                                            className="w-10 h-10 rounded-full border border-zinc-200 dark:border-zinc-700 flex items-center justify-center font-bold dark:text-white hover:bg-wine-gold hover:border-wine-gold transition-colors"
                                        >
                                            <Plus size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <h3 className="text-xl font-bold dark:text-white mb-6 serif">{t("booking_step_3")}</h3>
                                <div className="p-8 border-2 border-dashed border-zinc-100 dark:border-zinc-800 rounded-[2rem] space-y-6">
                                    <div className="flex justify-between items-center text-sm font-bold dark:text-white">
                                        <span>{guestCount}x {event?.title || t("booking_ticket")}</span>
                                        <span>{totalPrice.toFixed(2)} €</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm font-bold dark:text-white border-t border-zinc-50 dark:border-zinc-800 pt-6">
                                        <span>{t("booking_total_amount")}</span>
                                        <span className="text-2xl font-black text-wine-gold serif italic">{totalPrice.toFixed(2)} €</span>
                                    </div>
                                    <div className="pt-4 flex items-center gap-3 text-zinc-400">
                                        <CreditCard className="w-5 h-5" />
                                        <span className="text-[10px] font-bold uppercase tracking-widest">{t("booking_payment_on_site")}</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        <button
                            onClick={handleNext}
                            className="w-full py-5 bg-wine-dark text-white rounded-2xl font-black uppercase tracking-widest hover:bg-wine-gold hover:text-wine-dark transition-all transform hover:scale-[1.02] active:scale-95 shadow-xl shadow-wine-dark/10"
                        >
                            {step === 3 ? t("booking_confirm") : t("booking_next")}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
