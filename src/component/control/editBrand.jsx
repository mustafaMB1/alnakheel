import React , {useEffect, useState} from 'react'
import imageCompression from "browser-image-compression";
// import { baseUrl } from '../../../baseUrl';
import axios from 'axios';
export default function EditBrand({id , style}) {
   const baseUrl = import.meta.env.VITE_API_URL
    const [display , setDislay] = useState(style)
    const [file, setFile] = useState(null);
    const [nameAr , setameAr] = useState('')
    const [nameEn, setameEn] = useState('')
    const [descAr , setDescAr] = useState('')
    const [descEn , setDescEn] = useState('')



    useEffect(() =>{
        setDislay(style)
    },[style])

    const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  
    const handleFileChange = async (e) => {
      const selectedFile = e.target.files[0];
      const options = {
        maxSizeMB: 1, 
        maxWidthOrHeight: 1024,
        useWebWorker: true,
      };
      const compressedFile = await imageCompression(selectedFile, options);
      setFile(compressedFile);
    };
   

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const base64Image = await toBase64(file);
          
    
            // إنشاء براند جديد
             await axios.patch(`${baseUrl}/brands/${id}`, JSON.stringify({
              image : base64Image,
              name_en : nameEn.toString(),
              name_ar :nameAr.toString() ,
              description_en : descEn,
              description_ar:descAr
            }), {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            });
            
            alert('تم تعديل البراند')
            window.location='/control'
    
    
        } catch (err) {
          console.error(err);
          alert("حدث خطأ أثناء تعديل البراند");
        }finally{
            setDislay(false)
        }
      };


  return (
    <div className={`fixed top-[50%] ${display ? "block" : "hidden"}  p-5 bg-white rounded-md border-2 border-[var(--main-color)] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50 w-[80%] md:w-[40%]`}>
          <h2 className='text-center font-bold'>تعديل المنتج</h2>


          <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded-xl shadow-md mb-8"
      >
        <input
          type="text"
          name="name_en"
          placeholder="الاسم بالانكليزية *"
          onChange={e => setameEn(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="name_ar"
          placeholder="الاسم بالعربية *"
          onChange={e => setameAr(e.target.value)}
          className="border p-2 rounded"
        />
        <textarea
          name="description_en"
          placeholder="الوصف بالانكليزية"
          onChange={e => setDescEn(e.target.value)}
          className="border p-2 rounded col-span-1 md:col-span-2"
        />
        <textarea
          name="description_ar"
          placeholder="الوصف بالعربية"
          onChange={e =>setDescAr(e.target.value)}
          className="border p-2 rounded col-span-1 md:col-span-2"
        />


        <input type="file" accept="image/*"
         onChange={handleFileChange}
          className="border p-2 rounded col-span-1 md:col-span-2"/>

        <button
          type="submit"
          className="bg-[#c10007] text-white py-2 px-4 rounded hover:bg-red-800 transition col-span-1 md:col-span-2"
        >
        تحديث البراند 
        </button>
      </form>
          
    </div>
  )
}
