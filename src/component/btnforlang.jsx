import { useState } from "react";
import i18n from "../i18n";
import * as Flags from "country-flag-icons/react/3x2";

export default function LanguageDropdown() {
  const [open, setOpen] = useState(false);

  const currentLang = i18n.language || "en";

  const changeLang = (lang) => {
    i18n.changeLanguage(lang);
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    setOpen(false);
  };

  return (
    <div className="relative">
      {/* زر القائمة */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 bg-[var(--main-color)] hover:bg-[var(--secondary-color)] text-white px-4 py-2 rounded-lg shadow transition"
      >
        {currentLang === "ar" ? <Flags.SA className="w-6" /> : <Flags.US className="w-6" />}
        <span className="font-semibold">{currentLang === "ar" ? "العربية" : "English"}</span>
        <svg
          className={`w-4 h-4 transform transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* القائمة المنسدلة */}
      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <button
            onClick={() => changeLang("en")}
            className="flex items-center gap-2 w-full text-black px-4 py-2 hover:bg-red-100 transition"
          >
            <Flags.US className="w-6" /> English
          </button>
          <button
            onClick={() => changeLang("ar")}
            className="flex items-center gap-2 w-full text-black px-4 py-2 hover:bg-red-100 transition"
          >
            <Flags.SA className="w-6" /> العربية
          </button>
        </div>
      )}
    </div>
  );
}
