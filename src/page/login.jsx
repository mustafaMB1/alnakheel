import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useTranslation } from "react-i18next";
// import {baseUrl} from '../../baseUrl'
// ✅ Zod Schema
const schema = z.object({
  email: z.string().email("البريد الإلكتروني غير صحيح"),
  password: z.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
});

const Login = () => {
  const baseUrl = import.meta.env.VITE_API_URL
  const { t } = useTranslation("login");
  const [loading, setLoading] = useState(false)
  const [serverMeesage , setServerMeesage] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });
 
  const onSubmit = async (data) => {
    try {
      setLoading(true)
      const res = await axios.post(`${baseUrl}/auth/login`, data);
      localStorage.setItem("token" , res.data.token)
       window.location = '/'
      console.log(res);
    } catch (err) {
      if (err.response.data) {
        const serverData = err.response.data
 if (serverData.message) {
            setServerMeesage(serverData.message)
        }
      } else {
        console.log("Error:", err.message);
      }
    }finally{
      setLoading(false)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[var(--main-color)] to-[var(--secondary-color)]">
            {loading && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-[#c10007] rounded-full animate-spin"></div>
        </div>
      )}
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-[var(--main-color)]">
          {t("login")}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-gray-600 mb-1">{t("email")}</label>
            <input
              type="email"
              {...register("email")}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--secondary-color)]"
              placeholder={t("enterEmail")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-600 mb-1">{t("password")}</label>
            <input
              type="password"
              {...register("password")}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--secondary-color)]"
              placeholder={t("enterPassword")}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 bg-[var(--main-color)] hover:bg-[var(--secondary-color)] text-white rounded-lg transition duration-300"
          >
            {isSubmitting ? t("submitting") : t("submit")}
          </button>
          <p className="text-red-500 text-center text-sm">{serverMeesage}</p>
        </form>
      </div>
    </div>
  );
};

export default Login;
