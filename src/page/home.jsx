import React from 'react'
import CategoryGrid from '../component/categoryImage'
import Advantages from '../component/advanteges'
import CategoriesSlider from '../component/catSlider'
import ProductsSlider from '../component/productaSlider'
import { useTranslation } from "react-i18next";
 

import foodeq from '../assets/image/unnamed.png'
import BrandSection from '../component/productSlidr2'
import refrigerationequipment from '../assets/image/unnamed1.png'
import bakeryequipment from '../assets/image/unnamed2.png'
import Coffeeandteamachines from '../assets/image/unnamed3.png'
import juicemakingmachines from '../assets/image/unnamed4.png'
import Foodprocessors from '../assets/image/unnamed5.png'
import Foodheatingappliances from '../assets/image/unnamed6.png'
import snackequipment from '../assets/image/unnamed7.png'
import Dishwashers from '../assets/image/Dishwashers.jpg'
import Brand from '../component/brandsTrend'
import ContactSection from '../component/contactSection'
import ProductsOffer from '../component/producsOffer'
export default function Home() {
  const { t } = useTranslation("home");




  return (
    <div className='mt-[103px] md:mt-[163px]'>
      <CategoryGrid/> 
      <Advantages/> 
      <CategoriesSlider/>
      <ProductsOffer/>
      <ProductsSlider image={foodeq} id={4} title={t("cooking equipment")}/>
      <BrandSection image={refrigerationequipment} id={3} title={t("refrigeration equipment")}/>
      <ProductsSlider image={bakeryequipment} id={1} title={t("bakery equipment")}/>
      <BrandSection image={Coffeeandteamachines} id={2} title={t("Coffee and tea machines")}/>
      <ProductsSlider image={juicemakingmachines} id={9} title={t("juice making machines")}/>
      <BrandSection image={Foodprocessors} id={7} title={t("Food processors")}/>
      <ProductsSlider image={Foodheatingappliances} id={8} title={t("Food heating appliances")}/>
      <BrandSection image={snackequipment} id={11} title={t("snack equipment")}/>
      <ProductsSlider image={Dishwashers} id={5} title={t("Dishwashers")}/>
      <Brand/>
      <ContactSection/>
    </div>
  )
}
 