import { useState, useEffect, useRef } from "react";
import { ChevronLeft, X } from "lucide-react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { baseUrl } from "../../baseUrl";

export default function MegaMenuMob() {
  const [openMenu, setOpenMenu] = useState(false);
  const [activeCategory, setActiveCategory] = useState([]);
  const [mainCat, setMainCat] = useState([]);
  const [allCat, setAllCat] = useState([]);
  const { t, i18n } = useTranslation("common");
  const [showAll, setShowAll] = useState(false);
  const [isSubMenu, setIsSubMenu] = useState(false);

  const menuRef = useRef(null);

  const displayedCats = showAll ? mainCat : mainCat.slice(0, 5);

  useEffect(() => {
    const fetchCat = async () => {
      try {
        const res = await axios.get(`${baseUrl}/categories`);
        setAllCat(res.data);
        const mainCat = res.data.filter((cat) => cat.parentId === null);
        setMainCat(mainCat);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCat();
  }, []);

  // إغلاق القائمة عند الضغط خارجها للديسكتوب
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenu(false);
        setActiveCategory([]);
        setIsSubMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMainClick = (cat) => {
    const sub = allCat.filter((item) => item.parentId === cat.id);
    setActiveCategory(sub);
    setIsSubMenu(true);
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* زر القائمة */}
      <button
        onClick={() => setOpenMenu(true)}
        className="bg-[#c10007] cursor-pointer text-white px-4 py-2 rounded-md"
      >
        {t("navbar.products")}
      </button>

      {/* نسخة الديسكتوب */}
      <div className="hidden md:block">
        {openMenu && (
          <div className="absolute z-[100] top-full right-0 mt-2 w-64 bg-white shadow-lg rounded-xl">
            <div className="max-h-80 overflow-y-auto">
              <ul className="divide-y divide-gray-200">
                {displayedCats.map((cat, idx) => (
                  <li
                    key={idx}
                    className="relative flex justify-between items-center px-4 py-3 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleMainClick(cat)}
                  >
                    {i18n.language === "en" ? cat.name_en : cat.name_ar}
                    <ChevronLeft size={16} />
                  </li>
                ))}
                {mainCat.length > 5 && (
                  <li
                    onClick={() => setShowAll(!showAll)}
                    className="text-center py-3 text-[#c10007] font-semibold cursor-pointer hover:bg-gray-50 sticky bottom-0 bg-white"
                  >
                    {showAll ? "عرض أقل" : "عرض المزيد"}
                  </li>
                )}
              </ul>
            </div>

            {/* القائمة الفرعية بدون منتجات */}
            {activeCategory.length !== 0 && (
              <div
                className={`absolute top-0 ${
                  i18n.language === "en" ? "left-full" : "right-full"
                } w-[700px] bg-white shadow-lg rounded-xl p-6 grid grid-cols-3 gap-6`}
              >
                <div>
                  <h3 className="font-bold text-[#c10007] mb-3">
                    {t("navbar.subcategories")}
                  </h3>
                  <ul className="space-y-2">
                    {activeCategory.map((sub) => (
                  <>
                                        <a
                      href={`#`}
                        key={sub.id}
                        className="text-gray-700 hover:text-[#c10007] cursor-pointer"
                      >
                        {i18n.language === "en" ? sub.name_en : sub.name_ar}
                      </a><br />
                  </>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* نسخة الموبايل */}
      {openMenu && (
        <div
          className={`fixed top-0 left-0 w-full h-full bg-white z-[200] transform transition-transform duration-300 ${
            openMenu ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Header */}
          <div className="flex justify-between items-center border-b px-4 py-3">
            {!isSubMenu ? (
              <h2 className="text-lg font-bold">{t("navbar.products")}</h2>
            ) : (
              <button
                onClick={() => setIsSubMenu(false)}
                className="flex items-center gap-2 text-[#c10007]"
              >
                <ChevronLeft size={18} />
                {i18n.language === 'en' ? "back" : "رجوع"}
              </button>
            )}
            <button onClick={() => setOpenMenu(false)}>
              <X size={24} className="text-gray-700" />
            </button>
          </div>

          {/* محتوى القائمة */}
          <div className="p-4 overflow-y-auto">
            {!isSubMenu ? (
              <ul className="divide-y divide-gray-200">
                {mainCat.map((cat, idx) => (
                  <li
                    key={idx}
                    className="flex justify-between items-center px-4 py-3 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleMainClick(cat)}
                  >
                    {i18n.language === "en" ? cat.name_en : cat.name_ar}
                    <ChevronLeft size={16} />
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="divide-y divide-gray-200">
                {activeCategory.map((sub) => (
                  <>
                                      <a
                  href={`/products?catId=${sub.id}`}
                    key={sub.id}
                    className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
                  >
                    {i18n.language === "en" ? sub.name_en : sub.name_ar}
                  </a><br />
                  </>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
