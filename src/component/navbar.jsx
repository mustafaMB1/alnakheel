import React, { useEffect, useState } from "react";
import { FaPhoneAlt, FaSearch, FaBars } from "react-icons/fa";
import { MdApps } from "react-icons/md";
import logo from "../assets/image/logo.png";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageDropdown from "./btnforlang";
import {baseUrl} from '../../baseUrl'
import axios from "axios";
import MegaMenu from "./megaMenu";
import MegaMenuMob from "./megaMenuMob";
export default function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [mainCat , setMainCat] = useState([])
  const { t , i18n } = useTranslation("common");
  const [token , setToken] = useState(null)
  const [keyWord , setKeyWord] = useState('')
  useEffect(() =>{
    if(localStorage.getItem('token')){
      const myToken = JSON.stringify(localStorage.getItem('token')) 
      setToken(myToken)
    }

    const fetchCat = async () =>{
      try{
         const res = await axios.get(`${baseUrl}/categories`)
        const mainCat= res.data.filter((cat) => cat.parentId === null)
        setMainCat(mainCat)
      }catch(err){
          console.log(err);
      }
    }
    fetchCat()
   
  },[])

  const navLinks = [
    { path: "/", label: t('navbar.home') },
    { path: "/products", label: t("navbar.shop") },
    { path: "/brands", label: t("navbar.shop-by-prand") },
    { path: "/about", label: t('navbar.about') },
    { path: "/contact", label: t('navbar.contact-us') },
  
  ];
  {    if(!token){
     navLinks.push({  path: "/login", label: t('navbar.login') }) 
  }else{
    navLinks.push({  path: "/control", label: t('navbar.control') })
  }}


  const handelLogout = () =>{
    localStorage.removeItem('token')
    window.location = '/login'
  }
  

  const Search = () =>{
      if(!keyWord == ''){
           window.location = `/products?search=${keyWord}`
      }
  }

  return (
    <header className="w-full z-50 fixed top-0 left-0 bg-white  shadow-md">
      {/* --- Top Bar --- */}
      <div className="flex items-center justify-between px-4 py-3 md:px-8">
        {/* Logo */}
        <NavLink to="/">
          <img src={logo} width={60} height={60} alt="logo" draggable="false" />
        </NavLink>

        {/* Search Bar */}
        <div className="hidden flex-1 flex-col items-center px-4 md:flex">
          <div className="flex w-full max-w-2xl items-center rounded-lg border border-gray-300 overflow-hidden shadow-sm">
            <input
              type="text"
              placeholder={t('search-placeholder')}
              className="w-full px-3 py-2 text-sm outline-none"
              value={keyWord}
              onChange={(e) => setKeyWord(e.target.value)}
            />
            <button className="bg-[var(--main-color)] px-4 py-2 text-white hover:bg-[var(--secondary-color)] transition" onClick={Search}>
              <FaSearch />
            </button> 
          </div>
          <div className="mt-1 flex gap-3 text-xs text-gray-500">
            {mainCat.slice(0,5).map((cat) =>{
              return <NavLink key={cat.id} className={'hover:translate-y-[-0.5px] transition hover:font-[500]'} to={`/products?catId=${cat.id}`}>{i18n.language === 'en' ? cat.name_en : cat.name_ar}</NavLink>
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-2 rounded-md border px-3 py-1 text-sm md:flex">
            <FaPhoneAlt className="text-[var(--main-color)]" />
            <span>+971 55 784 7654</span>
          </div>
          <button
            className="block rounded-md border p-2 md:hidden"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            <FaBars />
          </button>
        </div>
      </div>

      {/* --- Bottom Nav --- */}
      <nav className="hidden bg-white md:block">
        <ul className="flex items-center justify-center gap-6 px-6 py-3 text-sm font-medium">
          <li className="flex items-center gap-1  text-gray-700">
            <MdApps className="text-[var(--main-color)]" />
            <MegaMenu/>
            {token && (
              <button onClick={handelLogout} className="bg-[#c10007] cursor-pointer text-white px-4 py-2 rounded-md">{i18n.language === 'en' ? "Log out" : "تسجيل خروج"}</button>
            )}
          </li>
          {navLinks.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `px-3 py-1 rounded-md transition ${
                    isActive
                      ? "bg-[var(--main-color)] text-white shadow"
                      : "text-gray-700 hover:text-[var(--main-color)]"
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
          <li>
            <LanguageDropdown />
          </li>
        </ul>
      </nav>

      {/* --- Mobile Menu --- */}
      {mobileMenu && (
        <div className="bg-white text-gray-700 md:hidden border-t shadow-md shadow-red-200">
          <ul className="flex flex-col gap-3 px-4 py-4 text-sm">
            <li className="flex items-center gap-1 justify-center text-gray-700">
              <MdApps className="text-[var(--main-color)]" />
              <MegaMenuMob/>
              {token && (
              <button onClick={handelLogout} className="bg-[#c10007] cursor-pointer text-white px-4 py-2 rounded-md">{i18n.language === 'en' ? "Log out" : "تسجيل خروج"}</button>
            )}
            </li>
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md ${
                      isActive
                        ? "bg-[var(--main-color)] text-white"
                        : "hover:bg-[var(--secondary-color)] text-gray-700"
                    }`
                  }
                  onClick={() => setMobileMenu(false)}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
            <li>
              <LanguageDropdown />
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
