import { motion } from "motion/react";
import { Users, Target, Heart } from "lucide-react";

export function About() {
  return (
    <section id="nosotros" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-sm font-bold tracking-widest text-red-600 uppercase mb-3">Quiénes Somos</h2>
              <h3 className="text-4xl font-bold text-gray-900 mb-6">Nuestra Historia y Misión en Canadá</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Fundada en 1974, la Manitoba Chilean Association nació del esfuerzo de los primeros inmigrantes chilenos que llegaron a Winnipeg buscando nuevas oportunidades. Desde entonces, hemos sido un puente cultural y un pilar de apoyo para nuestra comunidad.
              </p>
            </div>

            <div className="grid gap-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                  <Target size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Misión</h4>
                  <p className="text-gray-600">Preservar y promover la cultura chilena en Manitoba, facilitando la integración de los recién llegados y fomentando la solidaridad.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-red-100 text-red-600 rounded-xl flex items-center justify-center">
                  <Heart size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Valores</h4>
                  <p className="text-gray-600">Solidaridad, respeto, inclusión, preservación cultural y apoyo mutuo entre todos los miembros de nuestra comunidad.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2070&auto=format&fit=crop" 
                alt="Comunidad reunida" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-blue-600 rounded-3xl -z-0 opacity-10 blur-2xl"></div>
            <div className="absolute -top-8 -right-8 w-64 h-64 bg-red-600 rounded-3xl -z-0 opacity-10 blur-2xl"></div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
