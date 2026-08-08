import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";

const Home = lazy(() => import("../pages/Home/Home.jsx"));
const Designs = lazy(() => import("../pages/Designs/Designs.jsx"));
const Categories = lazy(() => import("../pages/Categories/Categories.jsx"));
const About = lazy(() => import("../pages/About/About.jsx"));
const Contact = lazy(() => import("../pages/Contact/Contact.jsx"));
const NotFound = lazy(() => import("../pages/NotFound/NotFound.jsx"));

const RouteFallback = () => (
  <div className="flex min-h-screen items-center justify-center bg-cream">
    <span className="text-henna-brown font-serif text-lg tracking-wide">
      Loading...
    </span>
  </div>
);

function AppRoutes() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/designs" element={<Designs />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;