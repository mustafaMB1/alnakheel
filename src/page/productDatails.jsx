import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../baseUrl";
import { useTranslation } from "react-i18next";
import { Eye } from "lucide-react";

const ProductDetails = () => {
  const { i18n } = useTranslation("home");
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(false);

  const [preview, setPreview] = useState(null); // للصورة المكبرة
  const [zoom, setZoom] = useState(1); // مستوى الزوم
  const [selectedImage, setSelectedImage] = useState(null); // الصورة المحددة للعرض
  const [images, setImages] = useState([]); // جميع الصور للـ carousel

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${baseUrl}/products/${id}`);
        setProduct(res.data);

        const relatedRes = await axios.get(`${baseUrl}/products/${id}/related`);
        setRelated(relatedRes.data.relatedProducts);

        // التعامل مع الصور
        let imgs = [];
        if (res.data.image) imgs.push(res.data.image);
        if (res.data.images && res.data.images.length > 0)
          imgs = imgs.concat(res.data.images);
        setImages(imgs);
        setSelectedImage(imgs[0] || null);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center mt-[103px] md:mt-[163px] items-center py-10">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-[#c10007] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center mt-[103px] md:mt-[163px] py-10 text-gray-500">
        Product not found
      </div>
    );
  }

  const getImageSrc = (img) => {
    if (!img) return "https://via.placeholder.com/300x300?text=No+Image";
    if (img.startsWith("data:image")) return img;
    if (img.length > 300) return `data:image/jpeg;base64,${img}`;
    if (img.startsWith("http")) return img;
    return `${baseUrl}/${img}`;
  };

  return (
    <div className="max-w-5xl mt-[103px] md:mt-[163px] mx-auto p-6">
      {/* Product Section */}
      <div className="grid md:grid-cols-2 gap-8 bg-white rounded-2xl shadow-md p-6 fade-up delay-100">
        <div className="flex flex-col items-center">
          <div className="relative flex items-center justify-center group">
            <img
              src={getImageSrc(selectedImage)}
              alt={product.name_en}
              className="w-full h-auto max-w-sm object-contain rounded-lg product-image"
              onClick={() => {
                setPreview(getImageSrc(selectedImage));
                setZoom(1);
              }}
            />
            <button
              onClick={() => {
                setPreview(getImageSrc(selectedImage));
                setZoom(1);
              }}
              className="absolute inset-0 flex items-center justify-center cursor-pointer rounded-2xl bg-black/40 opacity-0 group-hover:opacity-100 eye-button"
            >
              <Eye className="w-12 h-12 text-white" />
            </button>
          </div>

          {/* Carousel للصور */}
          {images.length > 1 && (
            <div className="carousel mt-4">
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={getImageSrc(img)}
                  alt={`product-${idx}`}
                  className={selectedImage === img ? "selected" : ""}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col justify-center fade-up delay-200">
          <h1 className="text-2xl font-bold text-gray-800 mb-3">
            {i18n.language === "en" ? product.name_en : product.name_ar}
          </h1>
          <p className="text-gray-600 mb-4">
            {i18n.language === "en"
              ? product.description_en
              : product.description_ar}
          </p>
          <p className="text-2xl font-semibold text-[var(--main-color)] mb-6">
            {product.price} <small>AED</small>
          </p>
          <a
            href={`https://wa.me/+971557847654?text=${encodeURIComponent( 
              `مرحباً، أنا مهتم بهذا المنتج: ${
                i18n.language === "en" ? product.name_en : product.name_ar
              }.\nرابط المنتج: ${window.location.origin}/product/${product.id}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[var(--main-color)] p-2 text-white cursor-pointer rounded-md font-bold block text-center whatsapp-btn"
          >
            {i18n.language === "en" ? "shop by whatsapp" : "تسوق عبر واتساب"}
          </a>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-12 fade-up delay-300">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          {i18n.language === "en" ? "You Might Also Like" : "قد يعجبك أيضاً"}
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {related.length === 0 && (
            <h2 className="text-center w-fit block mx-auto text-[var(--main-color)] text-2xl">
              {i18n.language === "en"
                ? "not found related product"
                : "لا يوجد منتجات مشابهة ل هذا المنتج"}
            </h2>
          )}
          {related.map((item, index) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col items-center text-center relative group related-card fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <img
                src={getImageSrc(item.image)}
                alt={i18n.language === "en" ? item.name_en : item.name_ar}
                className="w-32 h-32 object-contain mb-3 rounded-md product-image"
              />

              <h3 className="text-gray-700 font-medium mb-2">
                {i18n.language === "en" ? item.name_en : item.name_ar}
              </h3>
              <p className="text-gray-900 font-semibold">${item.price}</p>
              <a
                href={`https://wa.me/+971557847654?text=${encodeURIComponent(
                  `مرحباً، أنا مهتم بهذا المنتج: ${
                    i18n.language === "en" ? item.name_en : item.name_ar
                  }.\nرابط المنتج: ${window.location.origin}/product/${
                    item.id
                  }`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[var(--main-color)] mb-1.5 p-1 text-white cursor-pointer rounded-md font-bold block text-center whatsapp-btn"
              >
                {i18n.language === "en"
                  ? "shop by whatsapp"
                  : "تواصل عبر واتساب"}
              </a>
              <Link
                to={`/products/${item.id}`}
                className="bg-[var(--main-color)] p-1 text-white cursor-pointer rounded-md font-bold block text-center"
              >
                {i18n.language === "en" ? "Show more" : "عرض التفاصيل"}
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* مودال المعاينة */}
      {preview && (
        <div className="fixed inset-0 modal-preview z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full flex items-center justify-center">
            <img
              src={preview}
              alt="Preview"
              className="max-h-[80vh] max-w-full object-contain"
              style={{ transform: `scale(${zoom})` }}
            />
            {/* أزرار التكبير/التصغير والإغلاق */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
              <button
                onClick={() => setZoom((z) => Math.max(1, z - 0.2))}
                className="bg-white px-3 py-1 rounded shadow"
              >
                ➖
              </button>
              <button
                onClick={() => setZoom((z) => z + 0.2)}
                className="bg-white px-3 py-1 rounded shadow"
              >
                ➕
              </button>
              <button
                onClick={() => setPreview(null)}
                className="bg-red-600 text-white px-3 py-1 rounded shadow"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
