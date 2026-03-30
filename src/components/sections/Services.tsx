import { motion } from "motion/react";
import { HeartHandshake, BookOpen, Users, Globe, Utensils, GraduationCap } from 'lucide-react';

const services = [
  {
    title: "Apoyo Comunitario",
    description: "Asistencia para recién llegados, orientación en trámites básicos y conexión con recursos locales en Manitoba.",
    icon: HeartHandshake,
    color: "bg-blue-100 text-blue-600"
  },
  {
    title: "Eventos Culturales",
    description: "Organización de Fiestas Patrias, peñas folclóricas y celebraciones tradicionales para mantener vivas nuestras raíces.",
    icon: Globe,
    color: "bg-red-100 text-red-600"
  },
  {
    title: "Talleres y Educación",
    description: "Clases de español para niños, talleres de cueca, historia y cultura chilena para las nuevas generaciones.",
    icon: BookOpen,
    color: "bg-green-100 text-green-600"
  },
  {
    title: "Red de Profesionales",
    description: "Conexión entre profesionales chilenos en Manitoba para networking, mentoría y oportunidades laborales.",
    icon: Users,
    color: "bg-purple-100 text-purple-600"
  },
  {
    title: "Gastronomía",
    description: "Promoción de la comida típica chilena, venta de empanadas y productos tradicionales en eventos comunitarios.",
    icon: Utensils,
    color: "bg-orange-100 text-orange-600"
  },
  {
    title: "Becas y Apoyo Estudiantil",
    description: "Programas de apoyo y orientación para estudiantes chilenos que llegan a las universidades de Manitoba.",
    icon: GraduationCap,
    color: "bg-teal-100 text-teal-600"
  }
];

export function Services() {
  return (
    <section id="servicios" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold tracking-widest text-blue-600 uppercase mb-3">Nuestros Servicios</h2>
          <h3 className="text-4xl font-bold text-gray-900 mb-6">¿Cómo Ayudamos a la Comunidad?</h3>
          <p className="text-lg text-gray-600">
            Nuestro objetivo es ser un punto de encuentro y apoyo para todos los chilenos y amigos de Chile en la provincia de Manitoba.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-shadow border border-gray-100"
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${service.color}`}>
                <service.icon size={28} />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h4>
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
