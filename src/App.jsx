import './App.css'
import { Route , Routes } from 'react-router-dom'
import MainLayout from './layouts/mainlayout'
import Home from './page/home'
import Login from './page/login'
import About from './page/about'
import ContactPage from './page/contacu'
import ShopByBrand from './page/shopByBrand'
import Products from './page/products'
import ProductDetails from './page/productDatails'
// import Register from './page/register'
import Control from './page/control'
function App() {

  return ( 
      <Routes>
        <Route element={<MainLayout/>}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path='/contact' element={<ContactPage/>}/>
            <Route path='/brands' element={<ShopByBrand/>}/>
            <Route path='/products' element={<Products/>}/>
            <Route path='/products/:id' element={<ProductDetails/>}/>
            <Route path='/control' element={<Control/>}/>
        </Route>
        <Route path='/login' element={<Login/>} />
        {/* <Route path='/register' element={<Register/>}/> */}
      </Routes>
    
  )
}

export default App
