import { FaHeadset, FaShieldAlt, FaGem } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import logo from "../assets/image/logo.png";
import kitchenImg from "../assets/image/about.jpg";

export default function AboutUs() {
  const { t } = useTranslation("about");

  return (
    <section className="w-full mt-[103px] md:mt-[163px] bg-gray-50 py-12 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        
        {/* النصوص */}
        <div className="bg-red-700 text-white rounded-2xl p-8 shadow-lg flex flex-col justify-between">
          {/* الهيدر */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img src={logo} alt="Al Nakheel Logo" className="w-12 h-12 object-contain" />
              <h2 className="text-2xl font-bold">{t("title")}</h2>
            </div>

            {/* من نحن */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">{t("about_heading")}</h3>
              <p className="leading-relaxed text-sm md:text-base">
                {t("about_text")}
              </p>
            </div>

            {/* ما نقدمه */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">{t("offer_heading")}</h3>
              <p className="leading-relaxed text-sm md:text-base">
                {t("offer_text")}
              </p>
            </div>
          </div>

          {/* الأيقونات */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
            <div className="bg-white text-red-700 rounded-xl shadow-md flex flex-col items-center p-4">
              <FaHeadset className="text-2xl mb-2" />
              <span className="text-[12px] font-medium">{t("features.customer_service")}</span>
            </div>
            <div className="bg-white text-red-700 rounded-xl shadow-md flex flex-col items-center p-4">
              <FaShieldAlt className="text-2xl mb-2" />
              <span className="text-[12px] font-medium">{t("features.trust")}</span>
            </div>
            <div className="bg-white text-red-700 rounded-xl shadow-md flex flex-col items-center p-4">
              <FaGem className="text-2xl mb-2" />
              <span className="text-[12px] font-medium">{t("features.value")}</span>
            </div>
            <div className="bg-white text-red-700 rounded-xl shadow-md flex flex-col items-center p-4">
              <FaGem className="text-2xl mb-2" />
              <span className="text-[12px] font-medium">{t("features.quality")}</span>
            </div>
          </div>
        </div>

        {/* الصورة مع أوفرلاي */}
        <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-lg">
          <img
            src={kitchenImg}
            alt="Kitchen Equipment"
            className="w-full h-full object-cover"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50 bg-opacity-40 flex items-center justify-center">
            <h2 className="text-white text-2xl md:text-3xl font-bold text-center px-4">
              {t("image overlay text")}
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
