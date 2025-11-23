// src/components/RelatedProducts.jsx
import React, { useState, useEffect } from "react";
// import { baseUrl } from "../../../baseUrl";
import axios from "axios";

const RelatedProducts = () => {
  const baseUrl = import.meta.env.VITE_API_URL
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [formData, setFormData] = useState({
    productId: "",
    relatedId: "",
  });

  // جلب المنتجات
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${baseUrl}/products/filter`,{
          params:{
            take : 1000,
            skip : 0, 
            hasOffer__eq : false
          },
        });
        setProducts(res.data.data);
      } catch (err) {
        console.log(err);
        setErr(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleSelect = (type, id) => {
    setFormData({ ...formData, [type]: id });
  };


  const handleSubmit = (e) => {
    e.preventDefault();

     const addRelated = async () =>{
      if (!formData.productId || !formData.relatedId) {
        alert("الرجاء اختيار منتج أب ومنتج ابن");
        return;
      }
      try{
         setLoading(true)
         const res =  await axios.post(`${baseUrl}/RelatedProducts/related` , formData)
         console.log(res.data);
         alert('تمت العملية ب نجاح')
         window.location = '/control'
      }catch(err){
         console.log(err);
         setErr(err.message)
         alert(err.message)
      }finally{
         setLoading(false)
      }
     }
     addRelated()
  };

        // Helper to get correct image src
        const getImageSrc = (img) => {
          if (!img) return "https://via.placeholder.com/300x300?text=No+Image";
          if (img.startsWith("data:image")) return img;
          if (img.length > 300) return `data:image/jpeg;base64,${img}`;
          if (img.startsWith("http")) return img;
          return `${baseUrl}/${img}`;
        };

  return (
    <div>
      <h2 className="text-2xl text-center font-bold text-[#c10007] mb-4">
        إدارة المنتجات المرتبطة
      </h2>

      {loading && <p>جاري تحميل المنتجات...</p>}
      {err && <p className="text-red-500">{err}</p>}

      {!loading && products.length > 0 && (
        <form
          onSubmit={handleSubmit}
          className="grid gap-6 bg-white p-6 rounded-xl shadow-md mb-8"
        >
          {/* اختيار المنتج الأب */}
          <div>
            <h3 className="text-center text-2xl font-bold mb-2">اختر المنتج الأب</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {products.map((p) => (
                <div
                  key={p.id}
                  onClick={() => handleSelect("productId", p.id)}
                  className={`cursor-pointer border rounded-xl p-3 shadow-sm hover:shadow-md transition ${
                    formData.productId === p.id
                      ? "border-red-600 ring-2 ring-red-400"
                      : "border-gray-200"
                  }`}
                >
                  <img
                    src={getImageSrc(p.image) || "https://via.placeholder.com/150"}
                    alt={p.name}
                    className="w-full h-32 object-contain mb-2"
                  />
                  <p className="text-center text-sm font-medium">{p.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* اختيار المنتج الابن */}
          <div>
            <h3 className="text-center text-2xl font-bold mb-2">اختر المنتج الابن</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {products.map((p) => (
                <div
                  key={p.id}
                  onClick={() => handleSelect("relatedId", p.id)}
                  className={`cursor-pointer border rounded-xl p-3 shadow-sm hover:shadow-md transition ${
                    formData.relatedId === p.id
                      ? "border-blue-600 ring-2 ring-blue-400"
                      : "border-gray-200"
                  }`}
                >
                  <img
                    src={getImageSrc(p.image) || "https://via.placeholder.com/150"}
                    alt={p.name}
                    className="w-full h-32 object-contain mb-2"
                  />
                  <p className="text-center text-sm font-medium">{p.name}</p>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="bg-[#c10007] text-white py-2 px-4 rounded hover:bg-red-800 transition"
          >
            إضافة العلاقة
          </button>
        </form>
      )}
    </div>
  );
};

export default RelatedProducts;
