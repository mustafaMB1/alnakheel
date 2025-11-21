import { useState } from "react";
import { AiFillTikTok } from "react-icons/ai";
import {
  FaWhatsapp,
  FaInstagram,
  FaTimes,
  FaFacebook
} from "react-icons/fa";
import { GrContact } from "react-icons/gr";

export default function SocialSidebar() {
  const [open, setOpen] = useState(false);

  const links = [
    {
      href: "https://wa.me/+971557847654",
      icon: <FaWhatsapp size={22} />,
      bg: "bg-green-500",
    },
    {
      href: "https://www.facebook.com/share/1GXq5a9jJS/",
      icon: <FaFacebook size={22} />,
      bg: "bg-green-400",
    },
    {
      href: "https://www.tiktok.com/@asultan1991?_t=ZS-8yyxL5AUjEj&_r=1",
      icon: <AiFillTikTok size={22} />,
      bg: "bg-blue-500",
    },
    {
      href: "https://www.instagram.com/alnakheel_kitchen?igsh=MW8ydjNuZHp1cXkxbw==",
      icon: <FaInstagram size={22} />,
      bg: "bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600",
    },
  ];

  return (
    <div className="fixed top-1/3 right-4 z-50 flex flex-col items-center space-y-3">
      {/* زر الفتح والإغلاق مع pulse animation */}
      <button
  onClick={() => setOpen(!open)}
  className="w-12 h-12 cursor-pointer rounded-full bg-[var(--main-color)] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 pulse-button"
>
  {/* الطبقة الثالثة من الموجات */}
  <span className="pulse-layer"></span>

  {open ? <FaTimes size={20} /> : <GrContact size={20} />}
</button>


      {/* الأيقونات الداخلية */}
      <div className="flex flex-col items-center mt-2 space-y-3">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`
              w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg
              transform transition-all duration-500 ease-in-out
              ${open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-4 pointer-events-none"}
              ${link.bg} contact-icon
            `}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            {link.icon}
          </a>
        ))}
      </div>
    </div>
  );
}
