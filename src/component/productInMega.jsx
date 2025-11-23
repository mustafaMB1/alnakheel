import React, { useEffect, useState } from 'react'
import axios from 'axios'
// import { baseUrl } from '../../baseUrl'
import { useTranslation } from "react-i18next";
import { Link } from 'react-router-dom';
export default function ProductInMega({id}) {
  const baseUrl = import.meta.env.VITE_API_URL
   const [products , setProducts] = useState([])
   const [loading , setLoading] = useState(false)
   const [err , setErr] = useState(null)
   const { t , i18n} = useTranslation("home");


   useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const res = await axios.get(`${baseUrl}/products/filter`, {
          params: {
            categoryId__in: id, // هنا البارامتر
            hasOffer__eq : false
          },
        });
        setProducts(res.data.data);
      } catch (err) {
        console.log(err);
        setErr(err.message)
      }finally{
        setLoading(false) 
      }
    };
    fetchProducts();
  }, [id]);

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
    <div className='flex flex-col gap-1'>
        <h2>{i18n.language === 'en' ? "Popular Products" :"منتجات رائجة"}</h2> 
        {products.length != 0 ? (        products.slice(0,2).map((pro) =>{
            return        <div className="flex-1 min-w-0">
                <img src={getImageSrc(pro.image)} alt="" width={70} height={70}/>
            <h3 className="text-[15px] leading-5 text-gray-900 line-clamp-2">
              {i18n.language === 'en'  ?pro.name_en : pro.name_ar}
            </h3>
  

            <p
              className="mt-2 font-semibold"
              style={{ color: "#c10007" }}
            >
              {pro.price} AED
            </p>
  
         <div className='flex items-center gap-1'>
         <a
  href={`https://wa.me/+971557847654?text=${encodeURIComponent(
    `مرحباً، أنا مهتم بهذا المنتج: ${i18n.language === 'en' ? pro.name_en : pro.name_ar}.\nرابط المنتج: ${window.location.origin}/products/${pro.id}`
  )}`}
  target="_blank"  
  rel="noopener noreferrer"
  className="bg-[var(--main-color)] p-1 text-xs text-white cursor-pointer rounded-md font-bold block text-center"
>
  {i18n.language === 'en' ? "shop by whatsapp" : "تواصل عبر واتساب"}
</a>
<Link to={`/products/${pro.id}`} className="bg-[var(--main-color)] p-1 text-white cursor-pointer text-xs rounded-md font-bold block text-center">{i18n.language === 'en' ? "Show more" : "عرض التفاصيل"}</Link>
         </div>
          </div>
        })) : (<h2 className='text-[var(--main-color)] text-center'>{i18n.language === 'en' ? "not found" : "لا يوجد"}</h2>)}

    </div>
  )
}
