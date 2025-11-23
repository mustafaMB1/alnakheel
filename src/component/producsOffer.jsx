import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";
// import { baseUrl } from "../../baseUrl";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import img from '../assets/image/sale.png'
export default function ProductsOffer() {
  const baseUrl = import.meta.env.VITE_API_URL
  const { i18n } = useTranslation("home");
  const [current, setCurrent] = useState(0); 
  const [isPaused, setIsPaused] = useState(false);
  const [itemsPerSlide, setItemsPerSlide] = useState(3);
  const [products, setProducts] = useState([]);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);
  const [title , setTitle] = useState(i18n.language === 'en' ? 'our offer' : "عروضنا")
  const totalSlides = Math.ceil(products.length / itemsPerSlide);

  // fetch products
  useEffect(() => {
    // ✅ جلب المنتجات (مع فلتر العرض)
const fetchProduct = async () => {
  try {
    setLoading(true);
    const params = {
      take: 1000,
      skip: 0,
      hasOffer__eq : true ,
    };

    // ✅ إذا اختار المستخدم مع عرض أو بدون عرض نضيف الفلتر
   

    const res = await axios.get(`${baseUrl}/products/filter`, { params });
    setProducts(res.data.data);
    console.log(res.data.data);
  } catch (err) {
    console.log(err);
    setErr(err.message);
  } finally {
    setLoading(false);
  }
};
  fetchProduct();
}, []); // ✅ كل ما تغير الفلتر يرجع يجيب البيانات


  // auto-play
  useEffect(() => {
    if (isPaused || !totalSlides) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % totalSlides);
    }, 4000);
    return () => clearInterval(timer);
  }, [isPaused, totalSlides]);

  // responsive items per slide
  useEffect(() => {
    const updateItems = () => setItemsPerSlide(window.innerWidth < 768 ? 2 : 3);
    updateItems();
    window.addEventListener("resize", updateItems);
    return () => window.removeEventListener("resize", updateItems);
  }, []);

  // determine direction
  const direction = typeof document !== "undefined" ? document.dir || "ltr" : "ltr";

  // helper for image src
  const getImageSrc = (img) => {
    if (!img) return "https://via.placeholder.com/300x300?text=No+Image";
    if (img.startsWith("data:image") || img.length > 300) {
      return img.startsWith("data:image") ? img : `data:image/jpeg;base64,${img}`;
    }
    if (img.startsWith("http")) return img;
    return `${baseUrl}/${img}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center mt-[103px] md:mt-[163px] items-center py-10">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-[#c10007] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col md:flex-row-reverse items-center justify-between bg-white p-6 py-8 gap-3">
      {/* صورة البراند */}
      <div className="relative w-full md:w-2/5 overflow-hidden rounded-xl shadow-lg">
  {/* صورة الرحلة */}
  <img
    src={img}
    alt={title}
    className="object-cover h-[342px] w-full transform hover:scale-105 transition-transform duration-500"
  />

  {/* Overlay شفاف مع تدرج لوني */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>

  {/* العنوان */}
  <h2 className="absolute inset-0 flex items-center justify-center text-3xl md:text-4xl font-bold font-serif text-white drop-shadow-lg px-4 text-center">
    {title}
  </h2>
</div>


      {/* السلايدر */}
      {products.length ? (
        <div
          className="relative w-full md:w-3/5 overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(${direction === "rtl" ? current * 100 : -current * 100}%)`,
            }}
          >
            {Array.from({ length: totalSlides }).map((_, slideIndex) => {
              const start = slideIndex * itemsPerSlide;
              const slideItems = products.slice(start, start + itemsPerSlide);

              return (
                <div key={slideIndex} className="min-w-full flex justify-center gap-6">
                  {slideItems.map((p) => (
                    <div
                      key={p.id}
                      className="relative group w-56 h-56 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500"
                    >
                      <img
                        src={getImageSrc(p.image)}
                        alt={i18n.language === "en" ? p.name_en : p.name_ar}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                      />

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-[var(--main-color)]/90 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-center px-4 text-white transform translate-y-6 group-hover:translate-y-0">
                        <h3 className="text-lg text-center font-bold mb-2 animate-fadeIn">
                          {i18n.language === "en" ? p.name_en : p.name_ar}
                        </h3>
                        <a
                          href={`https://wa.me/+971557847654?text=${encodeURIComponent(
                            `مرحباً، أنا مهتم بهذا المنتج: ${
                              i18n.language === "en" ? p.name_en : p.name_ar
                            }.\nرابط المنتج: ${window.location.origin}/products/${p.id}`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-white py-1 px-2 text-[var(--main-color)] cursor-pointer rounded-md font-bold block text-center hover:bg-gray-200 transition-colors"
                        >
                          {i18n.language === "en"
                            ? "shop by whatsapp"
                            : "تواصل عبر واتساب"}
                        </a>
                        <Link
                          to={`/products/${p.id}`}
                          className="block mx-auto bg-white text-[var(--main-color)] cursor-pointer mt-2 py-1 px-2 rounded-md text-center hover:bg-gray-200 transition-colors"
                        >
                          {i18n.language === "en" ? "Show more" : "عرض التفاصيل"}
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>

          {/* Navigation */}
          <button
            onClick={() =>
              setCurrent((prev) => (prev - 1 + totalSlides) % totalSlides)
            }
            className="absolute top-1/2 -translate-y-1/2 left-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setCurrent((prev) => (prev + 1) % totalSlides)}
            className="absolute top-1/2 -translate-y-1/2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dots */}
          <div className="flex justify-center mt-4 gap-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  current === index
                    ? "bg-[var(--main-color)] scale-125 shadow-md"
                    : "bg-gray-400 hover:scale-110"
                }`}
              />
            ))}
          </div>
        </div>
      ) : err ? (
        <h2 className="block mx-auto text-2xl text-[var(--main-color)]">{err}</h2>
      ) : (
        <h2 className="text-center mx-auto font-bold text-[var(--main-color)] text-2xl">
          {i18n.language === "en" ? "not found products" : "لا يوجد منتجات"}
        </h2>
      )}
    </div>
  );
}
