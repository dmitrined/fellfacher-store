/**
 * Компонент для отображения контактной информации в подвале сайта.
 * Показывает адрес, телефон, факс и электронную почту.
 */
"use client";
import React from "react";
import Link from "next/link";

interface ContactInfoProps {
    t: (key: string) => string;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ t }) => {
    return (
        <div className="md:col-span-1 lg:col-span-1">
            <h3 className="font-black text-xs uppercase tracking-[0.2em] mb-6 text-wine-gold">
                {t("footer_contact_title")}
            </h3>
            <div className="space-y-4 text-sm">
                <p className="text-zinc-400 leading-relaxed">{t("footer_address")}</p>
                <div className="space-y-1 font-bold">
                    <p className="text-zinc-400">
                        {t("footer_phone_label")}{" "}
                        <a
                            href={`tel:${t("footer_phone_value")}`}
                            className="text-white hover:text-wine-gold transition-colors"
                        >
                            {t("footer_phone_value")}
                        </a>
                    </p>
                    <p className="text-zinc-400">
                        {t("footer_fax_label")} <span className="text-white">{t("footer_fax_value")}</span>
                    </p>
                </div>
                <p>
                    <a
                        href={`mailto:${t("footer_email")}`}
                        className="text-white hover:text-wine-gold transition-colors font-bold underline underline-offset-4 decoration-wine-gold/30 hover:decoration-wine-gold"
                    >
                        {t("footer_email")}
                    </a>
                </p>
                <Link
                    href="/directions"
                    className="inline-block text-white hover:text-wine-gold transition-colors font-bold underline underline-offset-4 decoration-zinc-800 hover:decoration-wine-gold mt-4"
                >
                    {t("footer_directions")}
                </Link>
            </div>
        </div>
    );
};

export default ContactInfo;
