import React, { Suspense, lazy } from "react";
import { useSelector } from "react-redux";
import HeroBanner from "../Components/HeroPage/HeroBanner";
import Carousel from "../Components/HeroPage/Carousel";
import HeroProducts from "../Components/HeroPage/HeroProducts";
import TopBrand from "../Components/HeroPage/TopBrand";
import Loading from "../Components/Loading.jsx";

// Lazy load the Category component
const Category = lazy(() => import("../Components/HeroPage/Category"));

const HomePage = () => {
  const products = useSelector((store) => store.Product.products);
  
  return (
    <div className="mt-6">
      <Carousel />
      <HeroBanner />

      {/* Lazy load Category with a fallback */}
      <Suspense fallback={<Loading />}>
        <Category products={products} />
      </Suspense>

      <HeroProducts products={products} />
      <TopBrand />
    </div>
  );
};

export default HomePage;
