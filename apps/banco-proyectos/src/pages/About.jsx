import { Info, Target, ShieldCheck } from 'lucide-react';

const About = () => {
    return (
        <div className="py-12 px-4 max-w-4xl mx-auto space-y-16">
            <section className="text-center space-y-4">
                <h1 className="text-4xl font-black text-gray-900">Sobre el Banco de Proyectos</h1>
                <p className="text-xl text-gray-700">
                    Impulsando la innovación tecnológica desde el corazón del Cauca.
                </p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                    <div className="w-12 h-12 bg-sem-area-bg rounded-xl flex items-center justify-center text-institutional-blue" aria-hidden="true">
                        <Target size={24} />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Nuestra Misión</h2>
                    <p className="text-gray-700 leading-relaxed">
                        Proveer un repositorio centralizado de conocimiento técnico y académico que sirva como base para futuros investigadores y estudiantes en el área de IoT y Sistemas Embebidos.
                    </p>
                </div>

                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                    <div className="w-12 h-12 bg-sem-attention-bg border border-institutional-yellow rounded-xl flex items-center justify-center text-institutional-dark" aria-hidden="true">
                        <ShieldCheck size={24} />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Calidad Académica</h2>
                    <p className="text-gray-700 leading-relaxed">
                        Cada proyecto listado ha pasado por un proceso de validación técnica en nuestros laboratorios, asegurando que los pasos de implementación y resultados sean replicables.
                    </p>
                </div>
            </div>

            <section className="bg-institutional-blue rounded-3xl p-6 sm:p-10 text-white flex flex-col md:flex-row items-center gap-8">
                <div className="space-y-4 flex-grow">
                    <h2 className="text-2xl font-bold">Institución Universitaria Colegio Mayor del Cauca</h2>
                    <p className="text-blue-50">
                        Con más de 50 años de historia, UNIMAYOR se destaca por su compromiso social y su enfoque en la tecnología aplicada al desarrollo regional.
                    </p>
                </div>
                <div className="flex-shrink-0 bg-white/10 p-6 rounded-full" aria-hidden="true">
                    <Info size={48} className="text-institutional-yellow" />
                </div>
            </section>
        </div>
    );
};

export default About;
