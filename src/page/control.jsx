// src/components/Dashboard.jsx
import React, { useState } from "react";
import Products from "../component/control/products"
import Categories from "../component/control/categoreis";
import Brands from "../component/control/brands";
import RelatedProducts from "../component/control/relatedProducts";

const Control = () => {
  const [activeTab, setActiveTab] = useState("products");

  const tabs = [
    { id: "products", label: "المنتجات" },
    { id: "categories", label: "الأقسام" },
    { id: "brands", label: "البراندات" }, 
    { id: "related", label: "منتجات مرتبطة" },
  ];

  return (
    <div className="min-h-screen mt-[103px] md:mt-[163px] bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#c10007] text-white p-4">
        <h2 className="text-2xl font-bold mb-6">لوحة التحكم</h2>
        <ul className="space-y-2">
          {tabs.map((tab) => (
            <li
              key={tab.id}
              className={`cursor-pointer p-2 rounded-lg ${
                activeTab === tab.id ? "bg-white text-[#c10007]" : "hover:bg-red-800"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </li>
          ))}
        </ul>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6">
        {activeTab === "products" && <Products />}
        {activeTab === "categories" && <Categories />}
        {activeTab === "brands" && <Brands />}
        {activeTab === "related" && <RelatedProducts />}
      </main>
    </div>
  );
};

export default Control;
