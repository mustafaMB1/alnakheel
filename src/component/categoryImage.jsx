import React from "react";
import { useTranslation } from "react-i18next";
import img1 from '../assets/image/image1.jpg'
import img2 from '../assets/image/image4.jpg'
import img3 from '../assets/image/image2.jpg'
import img4 from '../assets/image/image3.jpg'
import { Link } from "react-router-dom";

export default function CategoryShowcaseNew() {
  const { t } = useTranslation("home");

  const categories = [
    {
      title: t('Cooking-Line'),
      desc: t('Cookers-Ovens-Fryers'),
      img: img1,
      href: '/products?catId=4'
    },
    {
      title: t('Bakery-Equipment'),
      img: img2,
      href: '/products?catId=1'
    },
    {
      title: t('Cold-Line'),
      img: img3,
      href: '/products?catId=3'
    },
    {
      title: t("Snacks-Equipment"),
      img: img4,
      href: '/products?catId=11'
    },
  ];

  return (
    <section className="p-6">
      {/* الصورة الرئيسية Full Width */}
      <div className="relative group mb-6 h-[300px] overflow-hidden rounded-2xl md:h-[400px] shadow-lg cs-float-animation">
        <img
          src={categories[0].img}
          alt={categories[0].title}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:brightness-90"
        />
        <div className="absolute inset-0 bg-black/30 transition duration-500 group-hover:bg-black/50"></div>
        <div className="absolute inset-0 flex flex-col justify-center p-6 text-white md:p-12 cs-animate-fadeup">
          <h2 className="text-3xl font-bold md:text-4xl drop-shadow-lg">{categories[0].title}</h2>
          <p className="mt-2 text-sm opacity-90">{categories[0].desc}</p>
          <Link
            to={categories[0].href}
            className="mt-4 w-fit rounded-md bg-red-700 px-5 py-2 text-sm font-semibold opacity-0 shadow-md transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-1 hover:scale-105 hover:shadow-xl cs-btn-hover"
          >
            {t('Shop-Now')} →
          </Link>
        </div>
      </div>

      {/* الكروت الثلاثة */}
      <div className="cs-grid grid gap-6 md:grid-cols-3">
        {categories.slice(1).map((cat, i) => (
          <div
            key={cat.id}
            className="group relative h-[250px] cursor-pointer [perspective:1000px] cs-animate-fadeup"
            style={{ animationDelay: `${i*150}ms` }}
          >
            <div className="relative h-full w-full transition-transform duration-700 ease-out [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
              {/* الوجه الأمامي */}
              <div className="absolute inset-0 overflow-hidden rounded-2xl shadow-md [backface-visibility:hidden]">
                <img
                  src={cat.img}
                  alt={cat.title}
                  className="h-full w-full object-cover transition-transform duration-700 cs-group-hover-scale"
                />
                <div className="absolute inset-0 bg-black/30 flex items-end p-4 text-white transition-all duration-500 group-hover:bg-black/50">
                  <h2 className="text-lg font-bold drop-shadow">{cat.title}</h2>
                </div>
              </div>

              {/* الوجه الخلفي */}
              <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-red-700 to-black text-white shadow-xl [transform:rotateY(180deg)] [backface-visibility:hidden]">
                <h2 className="text-xl font-semibold mb-4 cs-animate-fadeup">{cat.title}</h2>
                <Link
                  to={cat.href}
                  className="rounded-md bg-white px-5 py-2 text-sm font-bold text-red-700 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl cs-btn-hover"
                >
                  {t('Shop-Now')} →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
