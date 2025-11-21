import { Phone, Mail } from "lucide-react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import logo from "../assets/image/logo.png";
import { AiFillTikTok } from "react-icons/ai";

export default function ContactPage() {
  const { t } = useTranslation('contact');

  return (
    <div className="w-full flex mt-[103px] md:mt-[163px] justify-center items-center py-10 px-4 bg-gradient-to-br from-[#c10007]/10 to-white">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-2xl overflow-hidden p-6 md:p-10 relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <img src={logo} alt="logo" width={60} height={60} />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            {t("contact.title")}
          </h2>
        </div>

        {/* Body */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Google Map */}
          <div className="flex flex-col items-center text-center">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d403343.123456789!2d55.1670000!3d25.2359438!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5d8a3b4e3ab1%3A0xabcdef1234567890!2sSheikh%20Khalifa%20Bin%20Zayed%20St%2C%20Sharjah%20-%20UAE!5e0!3m2!1sen!2s!4v1699999999999"
              width="100%"
              height="220"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="map"
              className="rounded-xl mb-4"
            ></iframe>
            <p className="text-gray-700">{t("contact.address")}</p>
          </div>

          {/* Contact Info */}
          <div>
            {/* Contact Methods */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">
                {t("contact.methods.title")}
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#c10007]" />
                  <span>{t("contact.methods.phone")}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#c10007]" />
                  <span>{t("contact.methods.email")}</span>
                </li>
              </ul>
            </div>

            {/* Social Media */}
            <div className="flex gap-4 mb-6">
              <a href="https://www.facebook.com/share/1GXq5a9jJS/" target="_blank" className="w-9 h-9 flex items-center justify-center rounded-full bg-[#c10007] text-white hover:opacity-90">
                <FaFacebook />
              </a>
              {/* <a href="#" target="_blank" className="w-9 h-9 flex items-center justify-center rounded-full bg-[#c10007] text-white hover:opacity-90">
                <FaTwitter />
              </a> */}
              <a href="https://www.instagram.com/alnakheel_kitchen?igsh=MW8ydjNuZHp1cXkxbw==" className="w-9 h-9 flex items-center justify-center rounded-full bg-[#c10007] text-white hover:opacity-90">
                <FaInstagram />
              </a>
              {/* <a href="#" target="_blank" className="w-9 h-9 flex items-center justify-center rounded-full bg-[#c10007] text-white hover:opacity-90">
                <FaLinkedin />
              </a> */}
              <a href="https://www.tiktok.com/@asultan1991?_t=ZS-8yyxL5AUjEj&_r=1" target="_blank" className="w-9 h-9 flex items-center justify-center rounded-full bg-[#c10007] text-white hover:opacity-90">
                 <AiFillTikTok/>
              </a>
              <a href="https://wa.me/+971557847654" target="_blank" className="w-9 h-9 flex items-center justify-center rounded-full bg-[#c10007] text-white hover:opacity-90">
                <FaWhatsapp/>
              </a>
            </div>

            {/* Working Hours */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">
                {t("contact.hours.title")}
              </h3>
              <div className="bg-gray-100 p-4 rounded-lg space-y-2 text-gray-700 text-sm">
                <p>{t("contact.hours.monFri")}</p>
                <p>{t("contact.hours.sat")}</p>
                <p>{t("contact.hours.sun")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
