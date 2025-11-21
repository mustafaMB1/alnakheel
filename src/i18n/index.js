import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enHome from "./locales/en/home.json";
import arHome from "./locales/ar/home.json";
import arCommon from './locales/ar/common.json'
import enCommon from './locales/en/common.json'
import arLogin from './locales/ar/login.json'
import enLogin from './locales/en/login.json'
import enFooter from './locales/en/footer.json'
import arFooter from './locales/ar/footer.json'
import enAbout from './locales/en/about.json'
import arAbout from './locales/ar/about.json'
import enContact from  './locales/en/contact.json'
import arContact from './locales/ar/contact.json'
import enProductDetails from './locales/en/productDatails.json'
import arProductDetails from './locales/ar/productDatails.json'
import enShopByBrand from './locales/en/shopByBrand.json'
import arShopByBrand from './locales/ar/shopByBrand.json'
import enRegister from './locales/en/register.json'
import arRegister from './locales/ar/register.json'
import enControl from './locales/en/control.json'
import arControl from './locales/ar/control.json'
i18n
  .use(LanguageDetector) // يحدد اللغة من المتصفح
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        home: enHome,
        common : enCommon,
        login : enLogin,
        footer : enFooter,
        about : enAbout,
        contact : enContact,
        product : enProductDetails,
        brand : enShopByBrand,
        register :enRegister,
        control : enControl
      },
      ar: {
        home: arHome,
        common : arCommon,
        login : arLogin,
        footer : arFooter,
        about:arAbout,
        contact : arContact,
        product : arProductDetails,
        brand : arShopByBrand,
        register : arRegister,
        control : arControl
      },
    },
    lng: "en", // اللغة الافتراضية
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
