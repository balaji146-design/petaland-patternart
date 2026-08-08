import { Outlet } from "react-router-dom";
import Header from "../components/header/Header.jsx";
import Navbar from "../components/header/Navbar.jsx";
import Footer from "../components/footer/Footer.jsx";

function MainLayout() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-cream text-coffee-brown">
      <Header />
      <Navbar />
      <main className="flex-1 w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;