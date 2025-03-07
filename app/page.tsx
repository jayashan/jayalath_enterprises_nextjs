import ProductsServices from "@/components/product-services";
import Hero from "@/components/hero";
import Footer from "@/components/footer";



export default function Home() {
  return (
      <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-white to-blue-50">
        
          <>  
            <div className="min-h-screen flex flex-col">
              <Hero/>
              <ProductsServices/>
              <Footer/>
            </div>
            
          </>
        
      </main>
  );
}
