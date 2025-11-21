import React, { useEffect, useRef, useState } from "react";
import { FaEnvelope, FaWhatsapp } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function ContactSection() {
  const { t } = useTranslation("home"); // نحدد namespace تبعك (غيره حسب ملفاتك)

  const whatsappNumber = "+971557847654";
  const whatsappMessage = t("contact.whatsappMessage"); 
  const contactEmail = "Alnakheelkitchenequ@gmail.com"; 

  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const [leftVisible, setLeftVisible] = useState(false);
  const [rightVisible, setRightVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (entry.target === leftRef.current) setLeftVisible(true);
            if (entry.target === rightRef.current) setRightVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (leftRef.current) observer.observe(leftRef.current);
    if (rightRef.current) observer.observe(rightRef.current);

    return () => {
      if (leftRef.current) observer.unobserve(leftRef.current);
      if (rightRef.current) observer.unobserve(rightRef.current);
    };
  }, []);

  return (
    <section className="w-full bg-gray-100 py-16 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        {/* Left Box */}
        <div
          ref={leftRef}
          className={`contact-card ${leftVisible ? "animate-fade-up" : ""}`}
        >
          <div className="mb-4 text-[var(--main-color)]">
            <FaEnvelope className="w-16 h-16 mx-auto" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[var(--main-color)]">
            {t("contact.emailTitle")}
          </h2>
          <p className="text-gray-600 mb-6">
            {t("contact.emailDesc")}
          </p>
          <a
            href={`mailto:${contactEmail}`}
            className="bg-[var(--main-color)] text-white font-bold px-8 py-3 rounded-xl hover:bg-red-700 transition-colors"
          >
            {contactEmail}
          </a>
        </div>

        {/* Right Box */}
        <div
          ref={rightRef}
          className={`contact-card ${rightVisible ? "animate-fade-up delay-200" : ""}`}
        >
          <div className="mb-4 text-green-500">
            <FaWhatsapp className="w-16 h-16 mx-auto" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[var(--main-color)]">
            {t("contact.whatsappTitle")}
          </h2>
          <p className="text-gray-600 mb-6">
            {t("contact.whatsappDesc")}
          </p>
          <a
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
              whatsappMessage
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 text-white font-bold px-8 py-3 rounded-xl hover:bg-green-600 transition-colors"
          >
            {t("contact.whatsappBtn")}
          </a>
        </div>
      </div>
    </section>
  );
}
