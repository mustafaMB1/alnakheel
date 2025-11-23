// src/components/Products.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
// import { baseUrl } from "../../../baseUrl";

const Products = () => {
  const baseUrl = import.meta.env.VITE_API_URL
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [brand, setBrand] = useState([]);
  const [err, setErr] = useState("");
  const [filterOffer, setFilterOffer] = useState(false); // ✅ فلتر العرض

  const [formData, setFormData] = useState({
    name_en: "",
    name_ar: "",
    description_en: "",
    description_ar: "",
    price: "",
    image: "",
    categoryId: "",
    brandId: "",
    hasOffer: false,
  });

  const [editProduct, setEditProduct] = useState(null);



  useEffect(() => {
      // ✅ جلب المنتجات (مع فلتر العرض)
  const fetchProduct = async () => {
    try {
      setLoading(true);
      const params = {
        take: 1000,
        skip: 0,
        hasOffer__eq : filterOffer ? true : false,
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
  }, [filterOffer]); // ✅ كل ما تغير الفلتر يرجع يجيب البيانات

  // ✅ جلب الأقسام
  useEffect(() => {
    const fetchCat = async () => {
      try {
        const res = await axios.get(`${baseUrl}/categories`);
        const mainCat = res.data.filter((i) => i.parentId == null);
        setCategories(mainCat);
      } catch (err) {
        console.log(err);
        setErr(err.message);
      }
    };
    fetchCat();
  }, []);

  // ✅ جلب البراند
  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const res = await axios.get(`${baseUrl}/brands`);
        setBrand(res.data);
      } catch (err) {
        console.log(err);
        setErr(err.message);
      }
    };
    fetchBrand();
  }, []);

  // ✅ تحديث الحقول
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ رفع الصورة
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          image: reader.result.split(",")[1],
        }));
      };
    }
  };

  // ✅ إنشاء منتج
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const payload = {
        ...formData,
        price: parseFloat(formData.price),
        categoryId: parseFloat(formData.categoryId),
        brandId: parseFloat(formData.brandId),
        hasOffer: formData.hasOffer === "true",
      };

      await axios.post(`${baseUrl}/products`, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      alert("✅ تم إضافة المنتج بنجاح");
      fetchProduct(); // ✅ نحدث الجدول مباشرة
    } catch (err) {
      console.error("❌ خطأ في الإرسال:", err);
      alert("حدث خطأ أثناء إضافة المنتج");
    } finally {
      setLoading(false);
    }
  };

  // ✅ حذف منتج
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("هل أنت متأكد أنك تريد حذف هذا المنتج؟");
    if (!confirmDelete) return;

    try {
      setLoading(true);
      await axios.delete(`${baseUrl}/products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setProducts((prev) => prev.filter((product) => product.id !== id));

      alert("✅ تم حذف المنتج بنجاح");
    } catch (err) {
      console.error("❌ خطأ أثناء الحذف:", err);
      alert("حدث خطأ أثناء الحذف");
    } finally {
      setLoading(false);
    }
  };

  // ✅ فتح التعديل
  const handleEdit = (product) => {
    setEditProduct(product);
    setFormData({
      name_en: product.name_en,
      name_ar: product.name_ar,
      description_en: product.description_en,
      description_ar: product.description_ar,
      price: product.price,
      image: product.image,
      categoryId: product.categoryId,
      brandId: product.brandId,
      hasOffer: product.hasOffer ? "true" : "false",
    });
  };

  // ✅ تعديل منتج
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const payload = {
        ...formData,
        price: parseFloat(formData.price),
        categoryId: parseFloat(formData.categoryId),
        brandId: parseFloat(formData.brandId),
        hasOffer: formData.hasOffer === "true",
      };

      await axios.patch(`${baseUrl}/products/${editProduct.id}`, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setProducts((prev) =>
        prev.map((p) => (p.id === editProduct.id ? { ...p, ...formData } : p))
      );

      alert("✅ تم تعديل المنتج بنجاح");
      setEditProduct(null);
    } catch (err) {
      console.error("❌ خطأ أثناء التعديل:", err);
      alert("حدث خطأ أثناء تعديل المنتج");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Helper للصور
  const getImageSrc = (img) => {
    if (!img) return "https://via.placeholder.com/300x300?text=No+Image";
    if (img.startsWith("data:image")) return img;
    if (img.length > 300) return `data:image/jpeg;base64,${img}`;
    if (img.startsWith("http")) return img;
    return `${baseUrl}/${img}`;
  };

  return (
    <div>
      {loading && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-[1000]">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-[#c10007] rounded-full animate-spin"></div>
        </div>
      )}

      <h2 className="text-2xl font-bold text-[#c10007] mb-4 text-center">
        إضافة منتج جديد
      </h2>

      {/* ✅ نموذج إضافة منتج */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded-xl shadow-md mb-8"
      >
        <input type="text" name="name_en" placeholder="الاسم بالانكليزية *" value={formData.name_en} onChange={handleChange} className="border p-2 rounded" />
        <input type="text" name="name_ar" placeholder="الاسم بالعربية *" value={formData.name_ar} onChange={handleChange} className="border p-2 rounded" />
        <textarea name="description_en" placeholder="الوصف بالانكليزية" value={formData.description_en} onChange={handleChange} className="border p-2 rounded col-span-2" />
        <textarea name="description_ar" placeholder="الوصف بالعربية" value={formData.description_ar} onChange={handleChange} className="border p-2 rounded col-span-2" />
        <input type="number" name="price" placeholder="السعر *" value={formData.price} onChange={handleChange} className="border p-2 rounded" />
        <input type="file" accept="image/*" onChange={handleImageChange} className="border p-2 rounded" />

        <select name="categoryId" value={formData.categoryId} onChange={handleChange} className="border p-2 rounded">
          <option value="" hidden>اختر القسم</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name_ar}</option>
          ))}
        </select>

        <select name="brandId" value={formData.brandId} onChange={handleChange} className="border p-2 rounded">
          <option value="" hidden>اختر البراند</option>
          {brand.map((b) => (
            <option key={b.id} value={b.id}>{b.name_ar}</option>
          ))}
        </select>

        <select name="hasOffer" value={formData.hasOffer} onChange={handleChange} className="border p-2 rounded">
          <option value="false">بدون عرض</option>
          <option value="true">مع عرض</option>
        </select>

        <button type="submit" className="bg-[#c10007] text-white py-2 px-4 rounded hover:bg-red-800 transition col-span-2">
          إضافة المنتج
        </button>
      </form>

      {/* ✅ فلتر العرض */}
      <div className="mb-4 flex items-center gap-2">
        <label className="font-semibold">عرض المنتجات:</label>
        <select
  value={filterOffer}
  onChange={(e) => setFilterOffer(e.target.value === "true")}
  className="border p-2 rounded"
>
  <option value="true">مع عرض</option>
  <option value="false">بدون عرض</option>
</select>

      </div>

      {/* ✅ جدول المنتجات */}
      <h3 className="text-xl font-semibold mb-2">المنتجات</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">#</th>
              <th className="border p-2">الاسم (EN)</th>
              <th className="border p-2">الاسم (AR)</th>
              <th className="border p-2">السعر</th>
              <th className="border p-2">الصورة</th>
              <th className="border p-2">عرض</th>
              <th className="border p-2">العمليات</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center p-4 text-red-500">
                  {err ? err : "لا يوجد منتجات بعد"}
                </td>
              </tr>
            ) : (
              products.map((p, i) => (
                <tr key={p.id}>
                  <td className="border p-2">{i + 1}</td>
                  <td className="border p-2">{p.name_en}</td>
                  <td className="border p-2">{p.name_ar}</td>
                  <td className="border p-2">{p.price}</td>
                  <td className="border p-2">
                    {p.image ? <img src={getImageSrc(p.image)} alt={p.name_en} className="w-12 h-12 object-cover" /> : "—"}
                  </td>
                  <td className="border p-2 text-center">
                    {p.hasOffer ? "✔️" : "❌"}
                  </td>
                  <td className="border p-2">
                    <button onClick={() => handleEdit(p)} className="p-1 rounded-sm bg-green-600 cursor-pointer text-white mr-1.5">تعديل</button>
                    <button onClick={() => handleDelete(p.id)} className="p-1 rounded-sm bg-red-600 cursor-pointer text-white">حذف</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ نافذة التعديل */}
      {editProduct && (
        <div className="fixed inset-0 z-[100] bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-bold mb-4">تعديل المنتج</h3>
            <form onSubmit={handleUpdate} className="flex flex-col gap-3">
              <input type="text" name="name_en" placeholder="الاسم EN" value={formData.name_en} onChange={handleChange} className="border p-2 rounded" />
              <input type="text" name="name_ar" placeholder="الاسم AR" value={formData.name_ar} onChange={handleChange} className="border p-2 rounded" />
              <input type="number" name="price" placeholder="السعر" value={formData.price} onChange={handleChange} className="border p-2 rounded" />
              <input type="file" accept="image/*" onChange={handleImageChange} className="border p-2 rounded" />
              <textarea name="description_en" placeholder="الوصف EN" value={formData.description_en} onChange={handleChange} className="border p-2 rounded" />
              <textarea name="description_ar" placeholder="الوصف AR" value={formData.description_ar} onChange={handleChange} className="border p-2 rounded" />

              <select name="categoryId" value={formData.categoryId} onChange={handleChange} className="border p-2 rounded">
                <option value="" hidden>اختر القسم</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name_ar}</option>
                ))}
              </select>

              <select name="brandId" value={formData.brandId} onChange={handleChange} className="border p-2 rounded">
                <option value="" hidden>اختر البراند</option>
                {brand.map((b) => (
                  <option key={b.id} value={b.id}>{b.name_ar}</option>
                ))}
              </select>

              <select name="hasOffer" value={formData.hasOffer} onChange={handleChange} className="border p-2 rounded">
                <option value="false">بدون عرض</option>
                <option value="true">مع عرض</option>
              </select>

              <div className="flex justify-between mt-4">
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">حفظ التعديلات</button>
                <button type="button" onClick={() => setEditProduct(null)} className="bg-gray-400 text-white px-4 py-2 rounded">إلغاء</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
