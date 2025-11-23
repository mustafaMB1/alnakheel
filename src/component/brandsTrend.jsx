import React, { useEffect, useState } from "react";
import axios from "axios";
// import { baseUrl } from "../../baseUrl";
import { useTranslation } from "react-i18next";
import { useInView } from "../useInView";
import { Link } from "react-router-dom";

export default function Brand() {
  const baseUrl = import.meta.env.VITE_API_URL
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [err, setErr] = useState(null);
  const { i18n } = useTranslation("brand");
  const [ref, isVisible] = useInView({ threshold: 0.2 });

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${baseUrl}/brands`);
        setData(res.data);
      } catch (err) {
        console.error(err);
        setErr(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBrands();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center mt-[103px] md:mt-[163px] items-center py-10">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-[#c10007] rounded-full animate-spin"></div>
      </div>
    );
  }
 
  return (
    <div className="w-full py-16 mt-[103px] md:mt-[163px] px-6 bg-gray-50">
      {/* Title */}
      <div className="text-center mb-12">
        <h2
          ref={ref}
          className={`text-2xl md:text-4xl font-bold mb-12 text-center text-[var(--main-color)] 
          transition-opacity duration-700 
          ${isVisible ? "animate-fadeUp-title" : "opacity-0"}`}
        >
          {i18n.language === "en" ? "Trending Brands" : "علامات تجارية رائجة"}
        </h2>
      </div>

      {err && (
        <h2 className="text-[var(--main-color)] text-center text-2xl">{err}</h2>
      )}

      {/* Brands Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {data.slice(0, 8).map((brand) => (
          <Link
            to={`/products?brandId=${brand.id}`}
            key={brand.id}
            className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-md p-6 transition cursor-pointer group overflow-hidden"
          >
            <div className="w-full h-32 md:h-36 mb-4 overflow-hidden rounded-lg">
              <img
                src={brand.image}
                alt={i18n.language === "en" ? brand.name_en : brand.name_ar}
                className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110 group-hover:brightness-110"
              />
            </div>
            <h3 className="font-semibold text-gray-800 text-center">
              {i18n.language === "en" ? brand.name_en : brand.name_ar}
            </h3>
            <p className="text-xs text-gray-400 mt-1 text-center">
              {i18n.language === "en"
                ? brand.description_en
                : brand.description_ar}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
