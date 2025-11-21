import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaWhatsapp } from "react-icons/fa";
import logo from "../assets/image/logo.png";
import { useTranslation } from "react-i18next";
import { AiFillTikTok } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function Footer() {
  const { t } = useTranslation("footer");

  const links = [
    { key: "home", href: "/" },
    { key: "about", href: "/about" }, 
    { key: "contact", href: "/contact" }
  ];

  const socials = [
    { icon: <FaFacebookF />, color: "hover:bg-red-600"  , href:"https://www.facebook.com/share/1GXq5a9jJS/"},
    { icon: <FaInstagram />, color: "hover:bg-red-600" , href:"https://www.instagram.com/alnakheel_kitchen?igsh=MW8ydjNuZHp1cXkxbw=="},
    { icon : <AiFillTikTok/>, color:"hover:bg-red-600" , href:"https://www.tiktok.com/@asultan1991?_t=ZS-8yyxL5AUjEj&_r=1"},
    {icon : <FaWhatsapp/> , color:"hover:bg-red-600" , href:"https://wa.me/+971557847654"} 
  ];

  return (
    <footer className="bg-white text-[var(--primary-color)] shadow-[0_-4px_15px_rgba(0,0,0,0.1)] py-10 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
        
        {/* Logo */}
        <div className="flex flex-col gap-1.5 items-center md:items-start space-y-4">
          <img
            src={logo}
            alt="Logo"
            className="w-28 md:w-36 object-contain"
          />
          <p className="text-sm text-gray-500">
            {t("rights", { year: new Date().getFullYear() })}
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col items-center md:items-center space-y-3">
          <h3 className="text-lg font-semibold text-[var(--main-color)]">
            {t("linksTitle")}
          </h3>
          <ul className="space-y-2 text-sm">
            {links.map((link, i) => (
              <li key={i}>
                <Link
                  to={link.href}
                  className="hover:text-[var(--secondary-color)] transition-colors duration-300"
                  
                >
                  {t(`links.${link.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Media */}
        <div className="flex flex-col items-center md:items-end space-y-4">
          <h3 className="text-lg font-semibold text-[var(--main-color)]">
            {t("socialTitle")}
          </h3>
          <div className="flex space-x-4 rtl:space-x-reverse">
            {socials.map((social, i) => (
              <a
                key={i}
                href={social.href}
                target="_blank"
                className={`w-10 h-10 flex items-center justify-center rounded-full bg-[var(--main-color)] ${social.color} text-white transition-all duration-300 shadow-md hover:shadow-lg`}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
