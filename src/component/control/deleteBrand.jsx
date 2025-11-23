import React, { useEffect, useState } from 'react'
import axios from 'axios';
// import { baseUrl } from '../../../baseUrl';
export default function DeleteBrand({id , style}) {
  const baseUrl = import.meta.env.VITE_API_URL
    const [display , setDisplay] = useState(style)


    useEffect(() =>{
     setDisplay(style)
    },[style])


    
    const deleteBrand = async (e) => {
        e.preventDefault();
        try {
          
    
            
            await axios.delete(`${baseUrl}/brands/${id}`,{
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            });
            
            alert('تم حذف البراند')
            window.location='/control'
       
            setDisplay(false)
        } catch (err) {
          console.error(err);
          alert("حدث خطأ أثناء حذف البراند");
          setDisplay(false)
        }finally{
            setDisplay(false)
        }
      };

  return (
    <div className={`fixed top-[50%] ${display ? "block" : "hidden"}  p-5 bg-white rounded-md border-2 border-[var(--main-color)] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50 w-[80%] md:w-[40%]`}>
        <button onClick={deleteBrand} className='bg-[var(--main-color)] block text-white p-2.5 mx-auto my-4 cursor-pointer font-bold'>تأكيد الحذف</button>
    </div>
  )
}
