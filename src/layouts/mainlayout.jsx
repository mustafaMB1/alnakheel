import { Outlet } from "react-router-dom";
import Navbar from "../component/navbar";
import Footer from "../component/footer";
import SocialSidebar from "../component/socialmedia";


export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar/>
      <main className="flex-1">
        <Outlet />
      </main>
      <SocialSidebar/>
      <Footer />
    </div>
  );
}
