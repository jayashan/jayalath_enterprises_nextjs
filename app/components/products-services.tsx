import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  


const products=[
    {name:'Petrol 92 Octane',description:''},
    {name:'Petrol 95 Octane',description:''},
    {name:'Auto Diesel',description:''},
    {name:'Lanka Kerosine',description:''},


]

const services=[
    {name:'Car Wash',description:''},
    {name:'Air',description:''},
    {name:'Water',description:''},
    {name:'Convinient Store',description:''},
]





export default function ProductServices(){
    return(
        <div className="space-y-12">
            <section id="products">
                <h2 className="text-3xl font-semibold mb-4">Our Products</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product)=>(
                        <Card key={product.name}>
                            <CardHeader>
                                <CardTitle>{product.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>
                                    {product.description}
                                </CardDescription>
                            </CardContent>
                            <CardFooter>

                            </CardFooter>
                        </Card>
                    ))}

                </div>
            </section>
            <section id="services">
                <h2 className="text-3xl font-semibold mb-4">Our Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((services)=>(
                        <Card key={services.name}>
                        <CardHeader>
                            <CardTitle>{services.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>
                                {services.description}
                            </CardDescription>
                        </CardContent>
                            <CardFooter>

                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </section>

        </div>
    )
}