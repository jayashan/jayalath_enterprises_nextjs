"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown } from "lucide-react"

const menuItems = [
  { title: "Home", href: "/" },
  {
    title: "Services",
    href: "#",
    submenu: [
      { title: "Consulting", href: "/services/consulting" },
      { title: "Development", href: "/services/development" },
      { title: "Marketing", href: "/services/marketing" },
    ],
  },
  { title: "About", href: "/about" },
  { title: "Contact", href: "/contact" },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)

  const toggleMenu = () => setIsOpen(!isOpen)
  const toggleSubmenu = (title: string) => {
    setActiveSubmenu(activeSubmenu === title ? null : title)
  }

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-red-600">
          <h1>JAYALATH ENTERPRISES LANKA FILLING STATION</h1>
        </Link>
        <div className="hidden md:flex space-x-4">
          {menuItems.map((item) => (
            <div key={item.title} className="relative group">
              {item.submenu ? (
                <>
                  <button
                    className="text-gray-600 hover:text-blue-600 flex items-center"
                    onClick={() => toggleSubmenu(item.title)}
                  >
                    {item.title}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                  {activeSubmenu === item.title && (
                    <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                      {item.submenu.map((subitem) => (
                        <Link
                          key={subitem.title}
                          href={subitem.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          {subitem.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link href={item.href} className="text-gray-600 hover:text-blue-600">
                  {item.title}
                </Link>
              )}
            </div>
          ))}
        </div>
        <button className="md:hidden" onClick={toggleMenu}>
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>
      {isOpen && (
        <div className="md:hidden">
          {menuItems.map((item) => (
            <div key={item.title} className="px-4 py-2">
              {item.submenu ? (
                <>
                  <button
                    className="text-gray-600 hover:text-blue-600 flex items-center justify-between w-full"
                    onClick={() => toggleSubmenu(item.title)}
                  >
                    {item.title}
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  {activeSubmenu === item.title && (
                    <div className="mt-2 space-y-2">
                      {item.submenu.map((subitem) => (
                        <Link
                          key={subitem.title}
                          href={subitem.href}
                          className="block pl-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          {subitem.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link href={item.href} className="block text-gray-600 hover:text-blue-600">
                  {item.title}
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
    </header>
  )
}

