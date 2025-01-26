import Header from "../components/header"
import ProductServices from "../components/products-services"
import Footer from "../components/footer"


export default function Home(){
    return(
        <>
            <div className="flex flex-col min-h-screen">
                <main className="flex-grow container mx-auto px-4 py-8">
                    <ProductServices/>
                </main>
            </div>
        </>
    )
}