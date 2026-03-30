import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">MC</span>
              </div>
              <span className="font-bold text-xl">
                Manitoba Chilean Association
              </span>
            </div>
            <p className="text-gray-400 max-w-md mb-6">
              Promoviendo la cultura chilena, apoyando a nuestra comunidad y construyendo puentes de solidaridad en Manitoba desde 1974.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={24} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Enlaces Rápidos</h3>
            <ul className="space-y-4">
              <li><a href="#nosotros" className="text-gray-400 hover:text-white transition-colors">Quiénes Somos</a></li>
              <li><a href="#servicios" className="text-gray-400 hover:text-white transition-colors">Servicios</a></li>
              <li><a href="#eventos" className="text-gray-400 hover:text-white transition-colors">Eventos</a></li>
              <li><a href="#contacto" className="text-gray-400 hover:text-white transition-colors">Contacto</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Contacto</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin className="shrink-0 mt-1" size={20} />
                <span>Winnipeg, Manitoba, Canadá</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Phone className="shrink-0" size={20} />
                <span>+1 (204) 000-0000</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Mail className="shrink-0" size={20} />
                <span>contacto@manitobachilean.ca</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Manitoba Chilean Association. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Política de Privacidad</a>
            <a href="#" className="hover:text-white transition-colors">Términos de Servicio</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
