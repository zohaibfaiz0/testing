
import Hero from "@/components/Hero";
import FooterComp from "@/components/footer";
import ImgBelow from "@/components/ImgBelow";
import ProductList from "@/components/ProductList";
import BestProducts from "@/components/BestProducts";
export default function Home() {
  return (
   <main>
    <Hero/>
   <ProductList/>
   <BestProducts/>
    <ImgBelow/>
    <FooterComp/>
   </main> 
  );
}
