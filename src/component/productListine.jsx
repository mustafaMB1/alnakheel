import React, { useEffect, useState } from "react";
import axios from "axios";
// import { baseUrl } from "../../baseUrl";
import { useTranslation } from "react-i18next";
import { Link, useSearchParams } from "react-router-dom";

const ProductListing = () => {
  const baseUrl = import.meta.env.VITE_API_URL
  const { i18n } = useTranslation("home");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [hasFetched, setHasFetched] = useState(false);

  // pagination & filters
  const [take, setTake] = useState(12);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);

  const [sortField, setSortField] = useState("price");
  const [sortOrder, setSortOrder] = useState("asc");

  // price inputs
  const [minPrice, setMinPrice] = useState("0");
  const [maxPrice, setMaxPrice] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();

  // fetch categories
  useEffect(() => {
    const fetchCats = async () => {
      try {
        const res = await axios.get(`${baseUrl}/categories`);
        setCategories(res.data.filter((i) => i.parentId === null));
      } catch (err) {
        setErr(err.message);
      }
    };
    fetchCats();
  }, []);

  // fetch brands
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await axios.get(`${baseUrl}/brands`);
        setBrands(res.data);
      } catch (err) {
        setErr(err.message);
      }
    };
    fetchBrands();
  }, []);

  // fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setHasFetched(false);

        const brandId = searchParams.get("brandId") || "";
        const search = searchParams.get("search") || "";
        const catIdsString = searchParams.get("catId");
        const catIds = catIdsString ? catIdsString.split(",") : [];
        const price__gte = searchParams.get("price__gte") || "";
        const price__lte = searchParams.get("price__lte") || "";
        const hasOffer = searchParams.get("hasOffer__eq"); // "true" أو "false"

        // ✨ نبني params ديناميكيًا
        const params = {
          take,
          skip,
          sortField,
          sortOrder,
          hasOffer__eq : false
        };

        if (catIds.length > 0) params.categoryId__in = catIds.join(",");
        if (price__gte) params.price__gte = price__gte;
        if (price__lte) params.price__lte = price__lte;
        if (brandId) params.brandId__eq = brandId;
        if (search) params.search = search;
        if (hasOffer !== null) params.hasOffer__eq = hasOffer === "true";

        const res = await axios.get(`${baseUrl}/products/filter`, { params } );

        setProducts(res.data.data);
        setTotal(res.data.total || 0);
      } catch (err) {
        setErr(err.message);
      } finally {
        setLoading(false);
        setHasFetched(true);
      }
    };
    fetchProducts();
  }, [searchParams, take, skip, sortField, sortOrder]);

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

  const totalPages = Math.ceil(total / take);
  const currentPage = Math.floor(skip / take) + 1;

  const handlePageChange = (page) => {
    setSkip((page - 1) * take);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 sm:p-6">
      {/* Sidebar */}
      <div className="w-full lg:w-72 bg-white shadow rounded-2xl p-4 border">
        <h2 className="text-lg font-bold mb-4 border-b pb-2">
          {i18n.language === "en" ? "Filters" : "الفلاتر"}
        </h2>

        {/* Categories Filter */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">
            {i18n.language === "en" ? "Categories" : "الأقسام"}
          </h3>

          {!categories.length && !err ? (
            <p className="text-gray-500 text-sm">
              {i18n.language === "en"
                ? "Loading categories..."
                : "جاري تحميل الأقسام..."}
            </p>
          ) : err ? (
            <p className="text-red-500 text-sm">
              {i18n.language === "en" ? "Failed to load" : "فشل التحميل"}
            </p>
          ) : (
            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {/* All Categories Option */}
              <label className="flex items-center gap-2 text-sm cursor-pointer font-medium">
                <input
                  type="checkbox"
                  checked={!searchParams.get("catId")}
                  onChange={() => {
                    searchParams.delete("catId");
                    setSearchParams(searchParams);
                  }}
                />
                {i18n.language === "en" ? "All Categories" : "كل الأقسام"}
              </label>

              {categories.map((cat) => {
                const catIdsString = searchParams.get("catId");
                const selectedCats = catIdsString ? catIdsString.split(",") : [];
                const isChecked = selectedCats.includes(String(cat.id));

                return (
                  <label
                    key={cat.id}
                    className="flex items-center gap-2 text-sm cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) => {
                        let updated = [...selectedCats];
                        if (e.target.checked) {
                          updated.push(String(cat.id));
                        } else {
                          updated = updated.filter((c) => c !== String(cat.id));
                        }
                        if (updated.length > 0) {
                          searchParams.set("catId", updated.join(","));
                        } else {
                          searchParams.delete("catId");
                        }
                        setSearchParams(searchParams);
                      }}
                    />
                    {i18n.language === "en" ? cat.name_en : cat.name_ar}
                  </label>
                );
              })}
            </div>
          )}
        </div>

        {/* Brands Filter */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">
            {i18n.language === "en" ? "Brands" : "العلامات التجارية"}
          </h3>

          {!brands.length && !err ? (
            <p className="text-gray-500 text-sm">
              {i18n.language === "en"
                ? "Loading brands..."
                : "جاري تحميل العلامات..."}
            </p>
          ) : err ? (
            <p className="text-red-500 text-sm">
              {i18n.language === "en" ? "Failed to load" : "فشل التحميل"}
            </p>
          ) : (
            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {/* All Brands Option */}
              <label className="flex items-center gap-2 text-sm cursor-pointer font-medium">
                <input
                  type="radio"
                  name="brand"
                  checked={!searchParams.get("brandId")}
                  onChange={() => {
                    searchParams.delete("brandId");
                    setSearchParams(searchParams);
                  }}
                />
                {i18n.language === "en" ? "All Brands" : "كل البراندات"}
              </label>

              {brands.map((brand) => {
                const selectedBrand = searchParams.get("brandId") || "";
                const isChecked = selectedBrand === String(brand.id);

                return (
                  <label
                    key={brand.id}
                    className="flex items-center gap-2 text-sm cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="brand"
                      checked={isChecked}
                      onChange={() => {
                        if (isChecked) {
                          searchParams.delete("brandId");
                        } else {
                          searchParams.set("brandId", String(brand.id));
                        }
                        setSearchParams(searchParams);
                      }}
                    />
                    {i18n.language === "en" ? brand.name_en : brand.name_ar}
                  </label>
                );
              })}
            </div>
          )}
        </div>

        {/* Price Filter */}
        <div>
          <h3 className="font-semibold mb-2">
            {i18n.language === "en" ? "Price" : "السعر"}
          </h3>
          <div className="flex gap-2 mb-2">
            <input
              type="number"
              placeholder={i18n.language === "en" ? "Min" : "الأدنى"}
              className="w-1/2 border rounded p-1 text-sm"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <input
              type="number"
              placeholder={i18n.language === "en" ? "Max" : "الأعلى"}
              className="w-1/2 border rounded p-1 text-sm"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
          <button
            onClick={() => {
              if (minPrice) searchParams.set("price__gte", minPrice);
              else searchParams.delete("price__gte");
              if (maxPrice) searchParams.set("price__lte", maxPrice);
              else searchParams.delete("price__lte");
              setSearchParams(searchParams);
            }}
            className="bg-[var(--main-color)] text-white px-3 py-1 rounded-md text-sm w-full"
          >
            {i18n.language === "en" ? "Apply" : "تطبيق"}
          </button>
        </div>
      </div>

      {/* Products Section */}
      <div className="flex-1">
        {/* Header Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
          <h2 className="text-xl font-semibold">
            {i18n.language === "en" ? "Products" : "المنتجات"}
          </h2>
          <select
            className="border rounded p-2 text-sm"
            value={take}
            onChange={(e) => {
              setTake(Number(e.target.value));
              setSkip(0);
            }}
          >
            <option value={8}>
              {i18n.language === "en" ? "Show 8" : "عرض 8"}
            </option>
            <option value={12}>
              {i18n.language === "en" ? "Show 12" : "عرض 12"}
            </option>
            <option value={24}>
              {i18n.language === "en" ? "Show 24" : "عرض 24"}
            </option>
          </select>
        </div>

        {/* Products Grid */}
        {loading && !hasFetched ? (
          <p className="text-center py-4">
            {i18n.language === "en" ? "Loading..." : "جاري التحميل..."}
          </p>
        ) : products.length !== 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-2xl shadow p-4 hover:shadow-lg transition"
                >
                  <img
                    src={getImageSrc(p.image)}
                    alt={i18n.language === "en" ? p.name_en : p.name_ar}
                    className="w-full h-40 object-cover rounded-xl mb-2"
                  />
                  <h3 className="font-semibold text-sm mb-2 sm:text-base">
                    {i18n.language === "en" ? p.name_en : p.name_ar}
                  </h3>
                  <p className="text-xs text-gray-600 mb-1">
                    {i18n.language === "en"
                      ? p.description_en
                      : p.description_ar}
                  </p>
                  <p className="text-[var(--main-color)] font-bold mb-2">
                    {p.price} <small>AED</small>
                  </p>
                  <div className="flex items-center gap-1.5">
                    <a
                      href={`https://wa.me/+963991519824?text=${encodeURIComponent(
                        `مرحباً، أنا مهتم بهذا المنتج: ${
                          i18n.language === "en" ? p.name_en : p.name_ar
                        }.\nرابط المنتج: ${
                          window.location.origin
                        }/products/${p.id}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-600 px-2 py-1 text-white cursor-pointer rounded-md font-bold text-xs block text-center"
                    >
                      {i18n.language === "en"
                        ? "Shop by WhatsApp"
                        : "تواصل عبر واتساب"}
                    </a>
                    <Link
                      to={`/products/${p.id}`}
                      className="bg-[var(--main-color)] px-2 py-1 text-white cursor-pointer rounded-md font-bold text-xs block text-center"
                    >
                      {i18n.language === "en" ? "Show more" : "عرض التفاصيل"}
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-2 mt-6">
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="px-3 py-1 rounded-md border disabled:opacity-50 flex items-center gap-1"
              >
                <span>‹</span>
                {i18n.language === "en" ? "Prev" : "السابق"}
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((page) => {
                  if (page === 1 || page === totalPages) return true;
                  if (Math.abs(page - currentPage) <= 2) return true;
                  return false;
                })
                .map((page, idx, arr) => {
                  const prevPage = arr[idx - 1];
                  if (prevPage && page - prevPage > 1) {
                    return (
                      <React.Fragment key={page}>
                        <span className="px-2">...</span>
                        <button
                          onClick={() => handlePageChange(page)}
                          className={`px-3 py-1 rounded-md border ${
                            currentPage === page
                              ? "bg-[var(--main-color)] text-white"
                              : "hover:bg-gray-100"
                          }`}
                        >
                          {page}
                        </button>
                      </React.Fragment>
                    );
                  }
                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-3 py-1 rounded-md border ${
                        currentPage === page
                          ? "bg-[var(--main-color)] text-white"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}

              <button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className="px-3 py-1 rounded-md border disabled:opacity-50 flex items-center gap-1"
              >
                {i18n.language === "en" ? "Next" : "التالي"}
                <span>›</span>
              </button>
            </div>
          </>
        ) : hasFetched ? (
          <h2 className="text-2xl text-[var(--main-color)] text-center block mx-auto">
            {i18n.language === "en" ? "products not found" : "لا يوجد منتجات"}
          </h2>
        ) : null}
      </div>
    </div>
  );
};

export default ProductListing;
