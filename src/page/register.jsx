import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { baseUrl } from "../../baseUrl";

// ✅ نمرر t إلى zod عشان الرسائل تطلع بالترجمة
const useSchema = (t) =>
  z.object({
    name: z.string().min(3, t("errors.nameMin")),
    email: z.string().email(t("errors.invalidEmail")),
    password: z.string().min(6, t("errors.passwordMin")),
    role: z.enum(["CUSTOMER", "ADMIN"], {
      errorMap: () => ({ message: t("errors.roleRequired") }),
    }),
  });

const Register = () => {
  const { t } = useTranslation("register");
  const [loading, setLoading] = useState(false);
  const [serverMeesage , setServerMeesage] = useState('')
  const schema = useSchema(t);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await axios.post(`${baseUrl}/auth/register`, data, {
        headers: { "Content-Type": "application/json" },
      });
      console.log("Success:", res.data);
      localStorage.setItem("token" , res.data.token)
      localStorage.setItem('user' , res.data.user)
      window.location = '/login'
    } catch (err) {
      if (err.response.data) {
        const serverData = err.response.data
 if (serverData.message) {
            setServerMeesage(serverData.message)
        }
      } else {
        console.log("Error:", err.message);
      }
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[var(--main-color)] to-[var(--secondary-color)] relative">
      {/* Overlay Loader */}
      {loading && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-[#c10007] rounded-full animate-spin"></div>
        </div>
      )}

      {/* Form */}
      <div
        className={`bg-white shadow-lg w-[80%] md:w-full rounded-2xl p-8 max-w-md z-10 ${
          loading ? "pointer-events-none opacity-50" : ""
        }`} // منع التفاعل مع النموذج أثناء التحميل
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-[var(--main-color)]">
          {t("register")}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Username */}
          <div>
            <label className="block text-gray-600 mb-1">{t("username")}</label>
            <input
              type="text"
              {...register("name")}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--secondary-color)]"
              placeholder={t("enterUsername")}
              disabled={loading}
            />
            <p className="text-red-500 text-sm mt-1">
              {errors.name?.message}
            </p>
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-600 mb-1">{t("email")}</label>
            <input
              type="email"
              {...register("email")}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--secondary-color)]"
              placeholder={t("enterEmail")}
              disabled={loading}
            />
            <p className="text-red-500 text-sm mt-1">
              {errors.email?.message}
            </p>
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-600 mb-1">{t("password")}</label>
            <input
              type="password"
              {...register("password")}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--secondary-color)]"
              placeholder={t("enterPassword")}
              disabled={loading}
            />
            <p className="text-red-500 text-sm mt-1">
              {errors.password?.message}
            </p>
          </div>

          {/* Role */}
          <div>
            <label className="block text-gray-600 mb-1">{t("role")}</label>
            <select
              {...register("role")}
              className="w-full px-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[var(--secondary-color)]"
              disabled={loading}
            >
              <option value="">{t("selectRole")}</option>
              <option value="CUSTOMER">{t("customer")}</option>
              <option value="ADMIN">{t("admin")}</option>
            </select>
            <p className="text-red-500 text-sm mt-1">
              {errors.role?.message}
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting || loading}
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

export default Register;
