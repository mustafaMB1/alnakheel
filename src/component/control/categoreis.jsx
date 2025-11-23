// src/components/Products.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
// import { baseUrl } from "../../../baseUrl";

const categories = () => {
  const baseUrl = import.meta.env.VITE_API_URL
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [err , setErr] = useState('')
  const [formData, setFormData] = useState({
    name_en: "",
    name_ar: "",
    description_en: "",
    description_ar: "",
    image: "",
    // categoryId: "",
  }); 

  const [editProduct, setEditProduct] = useState(null); // ✅ المنتج الذي نعدله



  // ✅ جلب الأقسام
  useEffect(() => {
    const fetchCat = async () => {
      try {
        setLoading(true)
        const res = await axios.get(`${baseUrl}/categories`);
        const mainCat = res.data.filter((i) => i.parentId == null);
        setCategories(mainCat);
      } catch (err) {
        console.log(err);
        setErr(err.message)
      }finally{
        setLoading(false)
      }
    };
    fetchCat();
  }, []);



  // ✅ تحديث الحقول النصية
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ رفع الصورة وتحويلها إلى Base64
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

  // ✅ إرسال البيانات لإضافة منتج جديد
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const payload = {
        ...formData,
        // categoryId: parseFloat(formData.categoryId),
      };

      await axios.post(`${baseUrl}/categories`, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      alert("✅ تم إضافة القسم بنجاح");
      window.location = "/control";
    } catch (err) {
      console.error("❌ خطأ في الإرسال:", err);
      alert("حدث خطأ أثناء القسم المنتج");
    }finally{
      setLoading(false)
    }
  };

  // ✅ حذف المنتج مع تأكيد
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("هل أنت متأكد أنك تريد حذف هذا القسم؟");
    if (!confirmDelete) return;

    try {
      setLoading(true)
      await axios.delete(`${baseUrl}/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setCategories((prev) => prev.filter((product) => product.id !== id));

      alert("✅ تم حذف القسم بنجاح");
    } catch (err) {
      console.error("❌ خطأ أثناء الحذف:", err);
      alert("حدث خطأ أثناء الحذف");
    }finally{
      setLoading(false)
    }
  };

  // ✅ فتح نافذة التعديل
  const handleEdit = (product) => {
    setEditProduct(product);
    setFormData({
      name_en: product.name_en,
      name_ar: product.name_ar,
      description_en: product.description_en,
      description_ar: product.description_ar,
      image: product.image,
      // categoryId: product.categoryId,
    });
  };

  // ✅ حفظ التعديلات
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const payload = {
        ...formData,
        // categoryId: parseFloat(formData.categoryId),
      };

      await axios.patch(`${baseUrl}/categories/${editProduct.id}`, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // تحديث القائمة في الواجهة
      setCategories((prev) =>
        prev.map((p) => (p.id === editProduct.id ? { ...p, ...formData } : p))
      );

      alert("✅ تم تعديل القسم بنجاح");
      setEditProduct(null);
    } catch (err) {
      console.error("❌ خطأ أثناء التعديل:", err);
      alert("حدث خطأ أثناء تعديل القسم");
    }finally{
      setLoading(false)
    }
  };


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
  

  return (
    <div>
                  {loading && (
        <div className="fixed  inset-0 bg-black/60 flex justify-center items-center z-[1000]">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-[#c10007] rounded-full animate-spin"></div>
        </div>
      )}
      <h2 className="text-2xl font-bold text-[#c10007] mb-4 text-center">إضافة قسم جديد</h2>

      {/* ✅ نموذج إضافة منتج جديد */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded-xl shadow-md mb-8"
      >
        <input type="text" name="name_en" placeholder="الاسم بالانكليزية *" value={formData.name_en} onChange={handleChange} className="border p-2 rounded" />
        <input type="text" name="name_ar" placeholder="الاسم بالعربية *" value={formData.name_ar} onChange={handleChange} className="border p-2 rounded" />
        <textarea name="description_en" placeholder="الوصف بالانكليزية" value={formData.description_en} onChange={handleChange} className="border p-2 rounded col-span-2" />
        <textarea name="description_ar" placeholder="الوصف بالعربية" value={formData.description_ar} onChange={handleChange} className="border p-2 rounded col-span-2" />

        <input type="file" accept="image/*" onChange={handleImageChange} className="border p-2 rounded" />

        {/* <select name="categoryId" value={formData.categoryId} onChange={handleChange} className="border p-2 rounded">
          <option value="" hidden>اختر القسم</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name_ar}</option>
          ))}
        </select> */}



        <button type="submit" className="bg-[#c10007] text-white py-2 px-4 rounded hover:bg-red-800 transition col-span-2">إضافة القسم</button>
      </form>

      {/* ✅ جدول المنتجات */}
      <h3 className="text-xl font-semibold mb-2">الاقسام</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">#</th>
              <th className="border p-2">الاسم (EN)</th>
              <th className="border p-2">الاسم (AR)</th>
              <th className="border p-2">الصورة</th>
              <th className="border p-2">العمليات</th>
            </tr>
          </thead>
          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center p-4 text-red-500">لا يوجد اقسام بعد</td>
              </tr>
            ) : (
              categories.map((p, i) => (
                <tr key={p.id}>
                  <td className="border p-2">{i + 1}</td>
                  <td className="border p-2">{p.name_en}</td>
                  <td className="border p-2">{p.name_ar}</td>
                  <td className="border p-2">
                    {p.image ? <img src={getImageSrc(p.image)} alt={p.name_en} className="w-12 h-12 object-cover" /> : "—"}
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
              <input type="file" accept="image/*" onChange={handleImageChange} className="border p-2 rounded" />
              <textarea name="description_en" placeholder="الوصف EN" value={formData.description_en} onChange={handleChange} className="border p-2 rounded" />
              <textarea name="description_ar" placeholder="الوصف AR" value={formData.description_ar} onChange={handleChange} className="border p-2 rounded" />
              {/* <select name="categoryId" value={formData.categoryId} onChange={handleChange} className="border p-2 rounded">
                <option value="" hidden>اختر القسم</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name_ar}</option>
                ))}
              </select> */}
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

export default categories;
