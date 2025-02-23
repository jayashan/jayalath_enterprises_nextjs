import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const products = [
  { name: "Regular Gasoline", description: "87 octane fuel for most vehicles" },
  { name: "Premium Gasoline", description: "93 octane fuel for high-performance engines" },
  { name: "Diesel", description: "For diesel engines" },
  { name: "Motor Oil", description: "Various grades available" },
]

const services = [
  { name: "Car Wash", description: "Automatic and self-serve options" },
  { name: "Air Pump", description: "Free air for your tires" },
  { name: "Convenience Store", description: "Snacks, drinks, and essentials" },
  { name: "ATM", description: "24/7 cash withdrawal" },
]

export default function ProductsServices() {
  return (
    <div className="space-y-12 pt-10">
      <section id="products">
        <h2 className="text-3xl font-semibold mb-4">Our Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{product.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      
      <section id="services">
        <h2 className="text-3xl font-semibold mb-4">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{service.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}

