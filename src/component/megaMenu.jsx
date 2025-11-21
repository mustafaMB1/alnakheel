import { useState, useEffect, useRef } from "react";
import { ChevronLeft } from "lucide-react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { baseUrl } from "../../baseUrl";
import ProductInMega from "./productInMega";
export default function MegaMenu() {
  const [openMenu, setOpenMenu] = useState(false);
  const [activeCategory, setActiveCategory] = useState([]);
  const menuRef = useRef(null);
  const [mainCat , setMainCat] = useState([])
  const [allCat , setAllCat] = useState([])
  const { t , i18n } = useTranslation("common");
  const [showAll, setShowAll] = useState(false);

  // إذا showAll false → منعرض أول 5 عناصر فقط
  const displayedCats = showAll ? mainCat : mainCat.slice(0, 5);


  useEffect(() =>{
    const fetchCat = async () =>{
      try{
         const res = await axios.get(`${baseUrl}/categories`)
         setAllCat(res.data)
        const mainCat= res.data.filter((cat) => cat.parentId === null)
        setMainCat(mainCat)
      }catch(err){
          console.log(err);
      }
    }
    fetchCat()
   
  },[])




  // إغلاق القائمة عند الضغط برة
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenu(false);
        setActiveCategory([]);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      {/* زر القائمة */}
      <button
        onClick={() => setOpenMenu((prev) => !prev)}
        className="bg-[#c10007] cursor-pointer text-white px-4 py-2 rounded-md"
      >
        {t('navbar.products')}
      </button>

      {/* القائمة الرئيسية */}
      {openMenu && (
        <div className="absolute z-[100] top-full right-0 mt-2 w-64 bg-white shadow-lg rounded-xl ">
    <div className="max-h-80 overflow-y-auto"> {/* سكشن القائمة مع السكرول */}
      <ul className="divide-y divide-gray-200">
        {displayedCats.map((cat, idx) => (
          <li
            key={idx}
            className="relative flex justify-between items-center px-4 py-3 hover:bg-gray-100 cursor-pointer"
            onClick={() => {
               const sub =  allCat.filter((item) => item.parentId === cat.id)
                setActiveCategory(sub)
            }

            }
          >
            {i18n.language === "en" ? cat.name_en : cat.name_ar}
            <ChevronLeft size={16} />
          </li>
        ))}

        {/* زر عرض المزيد / أقل */}
        {mainCat.length > 5 && (
          <li
            onClick={() => setShowAll(!showAll)}
            className="text-center py-3 text-[#c10007] font-semibold cursor-pointer hover:bg-gray-50 sticky bottom-0 bg-white"
          >
            {showAll ? i18n.language === 'en' ? "show less" : "عرض أقل" : i18n.language === "en" ? "show more" : "عرض المزيد"}
          </li>
        )}
      </ul>
    </div>

          {/* القائمة الفرعية */}
          {activeCategory.length !==0 && (
            <div className={`absolute top-0  ${i18n.language === 'en' ? 'left-full' : 'right-full' }  w-[700px] bg-white shadow-lg rounded-xl p-6 grid grid-cols-3 gap-6`}>
              {/* كاتيجوري داخلي */}
              <div>
                <h3 className="font-bold text-[#c10007] mb-3">
                   {i18n.language === 'en' ? "Suggested sections" : "اقسام مقترحة"}
                </h3>
                <ul className="space-y-2">
                  {activeCategory.map((sub) => (
     <>
                    <a
                    href={`#`}
                      key={sub.id}
                      className="text-gray-700 hover:text-[#c10007] cursor-pointer"
                    >
                      {i18n.language === 'en' ? sub.name_en : sub.name_ar}
                    </a><br />
     </>
                  ))}
                </ul>
              </div>


              <ProductInMega id={activeCategory[0].parentId}/>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
