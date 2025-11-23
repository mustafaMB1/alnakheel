import { useRef, useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import axios from "axios";
// import { baseUrl } from "../../baseUrl";
import {useInView} from '../useInView'
import { Link } from "react-router-dom";

export default function CategoriesSlider() {
  const baseUrl = import.meta.env.VITE_API_URL
  const { t, i18n } = useTranslation("home");
  const scrollRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [direction, setDirection] = useState("right");
  const [mainCat, setMainCat] = useState([]);
  const [err, setErr] = useState(null);
  const [ref, isVisible] = useInView({ threshold: 0.2 });

  useEffect(() => {
    const fetchCat = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${baseUrl}/categories`);
        const mainCat = res.data.filter((cat) => cat.parentId === null);
        setMainCat(mainCat);
      } catch (err) {
        console.log(err);
        setErr(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCat();
  }, []);

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: dir === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  // Auto scroll every 3s with reverse at edges
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

        if (direction === "right" && scrollLeft + clientWidth >= scrollWidth) {
          setDirection("left");
        } else if (direction === "left" && scrollLeft <= 0) {
          setDirection("right");
        }

        scroll(direction);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [direction]);

  // ✅ helper to get correct image src
  const getImageSrc = (image) => {
    if (!image) return "https://via.placeholder.com/300x200?text=No+Image";

    if (image.startsWith("data:image") || image.length > 300) {
      return image.startsWith("data:image")
        ? image
        : `data:image/jpeg;base64,${image}`;
    }

    if (image.startsWith("http")) return image;

    return `${baseUrl}/${image}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center mt-[103px] md:mt-[163px] items-center py-10">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-[#c10007] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="w-full py-12 bg-gradient-to-b from-gray-50 to-white">
      <h2
      ref={ref}
      className={`text-2xl md:text-4xl font-bold mb-12 text-center text-[var(--main-color)] 
      transition-opacity duration-700 
      ${isVisible ? "animate-fadeUp-title" : "opacity-0"}`}
    >
    {t("Popular-Categories")}
    </h2>
      {err && (
        <h2 className="text-center text-[var(--main-color)] text-2xl">{err}</h2>
      )}
      <div className="relative w-full flex items-center">
        {/* Left Arrow */}
        <button
          onClick={() => scroll("left")}
          className="flex absolute left-2 z-10 bg-white shadow-md w-10 h-10 rounded-full items-center justify-center 
          hover:bg-red-600 hover:text-white transition duration-300"
        >
          <FaChevronLeft />
        </button>

        {/* Slider */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 px-12 scroll-smooth snap-x snap-mandatory no-scrollbar"
        >
          {mainCat.map((cat) => (
            <Link
              to={`/products?catId=${cat.id}`}
              key={cat.id}
              className="flex flex-col items-center min-w-[140px] snap-center cursor-pointer group"
            >
              {/* Circle Icon */}
              <div
                className="w-24 h-24 flex items-center justify-center text-3xl text-blue-900 mb-3 rounded-full 
                overflow-hidden shadow-md transition-transform duration-500 transform group-hover:scale-110 group-hover:shadow-xl"
              >
                <img
                  src={getImageSrc(cat.image)}
                  alt="logo"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Name */}
              <p
                className="text-center text-sm font-medium text-gray-800 leading-tight transition-colors duration-300 group-hover:text-red-700"
              >
                {i18n.language === "en" ? cat.name_en : cat.name_ar}
              </p>

              {/* Count */}
              <span className="text-xs text-gray-500 mt-1 group-hover:text-gray-700 transition">
                {i18n.language === "en"
                  ? cat.description_en
                  : cat.description_ar}
              </span>
            </Link>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll("right")}
          className="flex absolute right-2 z-10 bg-white shadow-md w-10 h-10 rounded-full items-center justify-center 
          hover:bg-red-600 hover:text-white transition duration-300"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
}

/* Hide scrollbar */
const styles = `
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
`;

if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = styles; // type غير ضروري
  document.head.appendChild(styleSheet);
}
