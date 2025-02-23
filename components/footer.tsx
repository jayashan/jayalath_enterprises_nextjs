import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h2 className="text-2xl font-bold mb-4">JAYALATH Enterprises Lanka Filling Station</h2>
            <p className="text-gray-400"></p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-blue-400">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-blue-400">
                  About
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-blue-400">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-blue-400">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-gray-400">75 Mankuliya Road</p>
            <p className="text-gray-400">Negombo, Sri Lanka</p>
            <p className="text-gray-400">Phone: (031) 2238529</p>
            <p className="text-gray-400">Email: jayalathenterprises1572@live.com</p>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-400">
          <p>&copy; 2025 Jayalath Enterprises All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

