import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Inicio', href: '#inicio' },
  { name: 'Quiénes Somos', href: '#nosotros' },
  { name: 'Servicios', href: '#servicios' },
  { name: 'Eventos', href: '#eventos' },
  { name: 'Galería', href: '#galeria' },
  { name: 'Contacto', href: '#contacto' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <a href="#" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">MC</span>
              </div>
              <span className="font-bold text-xl text-gray-900 hidden sm:block">
                Manitoba Chilean Association
              </span>
            </a>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
              >
                {link.name}
              </a>
            ))}
            <button className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-full font-medium transition-colors">
              Donar
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              >
                {link.name}
              </a>
            ))}
            <button className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50">
              Donar
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
