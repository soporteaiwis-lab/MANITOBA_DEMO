import { motion } from "motion/react";
import { Calendar, MapPin, Clock } from 'lucide-react';

const events = [
  {
    id: 1,
    title: "Gran Fonda Dieciochera 2026",
    date: "18 de Septiembre, 2026",
    time: "18:00 - 02:00",
    location: "Centro Comunitario de Winnipeg",
    description: "Celebra las Fiestas Patrias con empanadas, anticuchos, terremotos y la mejor música en vivo. ¡No faltes a la gran fonda de Manitoba!",
    image: "https://images.unsplash.com/photo-1533174000273-e1c6640bef9c?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Taller de Cueca para Principiantes",
    date: "5 de Octubre, 2026",
    time: "10:00 - 12:00",
    location: "Gimnasio de la Asociación",
    description: "Aprende los pasos básicos de nuestro baile nacional. Clases gratuitas para todas las edades. Ven con ropa cómoda y pañuelo.",
    image: "https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Asamblea Anual de Socios",
    date: "15 de Noviembre, 2026",
    time: "19:00 - 21:00",
    location: "Sede Principal MCA",
    description: "Reunión anual para discutir los logros del año, elegir nueva directiva y planificar los eventos del próximo año. Solo para miembros activos.",
    image: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?q=80&w=2070&auto=format&fit=crop"
  }
];

export function Events() {
  return (
    <section id="eventos" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-sm font-bold tracking-widest text-red-600 uppercase mb-3">Próximos Eventos</h2>
            <h3 className="text-4xl font-bold text-gray-900 mb-6">Actividades de la Comunidad</h3>
            <p className="text-lg text-gray-600">
              Mantente informado sobre nuestras próximas reuniones, fiestas y talleres. ¡Todos son bienvenidos a participar!
            </p>
          </div>
          <button className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-full font-medium transition-colors whitespace-nowrap">
            Ver Calendario Completo
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-gray-100 flex flex-col"
            >
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-blue-600 shadow-sm">
                  {event.date.split(',')[0]}
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <h4 className="text-xl font-bold text-gray-900 mb-4 line-clamp-2">{event.title}</h4>
                
                <div className="space-y-3 mb-6 flex-grow">
                  <div className="flex items-center text-gray-600 text-sm">
                    <Calendar size={16} className="mr-2 text-red-500" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <Clock size={16} className="mr-2 text-red-500" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <MapPin size={16} className="mr-2 text-red-500" />
                    <span className="line-clamp-1">{event.location}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                  {event.description}
                </p>
                
                <button className="mt-auto w-full bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold py-3 rounded-xl transition-colors">
                  Más Información
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
