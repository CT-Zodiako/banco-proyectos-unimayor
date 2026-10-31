import React from 'react';
import { Info, Target, Eye, ShieldCheck } from 'lucide-react';

const About = () => {
    return (
        <div className="py-12 px-4 max-w-4xl mx-auto space-y-16">
            <section className="text-center space-y-4">
                <h1 className="text-4xl font-black text-gray-900">Sobre el Banco de Proyectos</h1>
                <p className="text-xl text-gray-600 font-light">
                    Impulsando la innovación tecnológica desde el corazón del Cauca.
                </p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-institutional-blue">
                        <Target size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Nuestra Misión</h3>
                    <p className="text-gray-600 leading-relaxed text-sm">
                        Proveer un repositorio centralizado de conocimiento técnico y académico que sirva como base para futuros investigadores y estudiantes en el área de IoT y Sistemas Embebidos.
                    </p>
                </div>

                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                    <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center text-institutional-yellow">
                        <ShieldCheck size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Calidad Académica</h3>
                    <p className="text-gray-600 leading-relaxed text-sm">
                        Cada proyecto listado ha pasado por un proceso de validación técnica en nuestros laboratorios, asegurando que los pasos de implementación y resultados sean replicables.
                    </p>
                </div>
            </div>

            <section className="bg-institutional-blue rounded-3xl p-10 text-white flex flex-col md:flex-row items-center gap-8">
                <div className="space-y-4 flex-grow">
                    <h2 className="text-2xl font-bold">Institución Universitaria Colegio Mayor del Cauca</h2>
                    <p className="opacity-80 font-light">
                        Con más de 50 años de historia, UNIMAYOR se destaca por su compromiso social y su enfoque en la tecnología aplicada al desarrollo regional.
                    </p>
                </div>
                <div className="flex-shrink-0 bg-white/10 p-6 rounded-full">
                    <Info size={48} className="text-institutional-yellow" />
                </div>
            </section>
        </div>
    );
};

export default About;
