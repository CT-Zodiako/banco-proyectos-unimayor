import { Mail, Phone, MapPin, Clock } from 'lucide-react';

// Icon tile: blue = place (the lab), gray = contact data; decorative, the heading names each block.
const Tile = ({ children }) => (
    <div className="w-12 h-12 bg-sem-area-bg border border-sem-area-line rounded-2xl flex items-center justify-center text-institutional-blue flex-shrink-0" aria-hidden="true">
        {children}
    </div>
);

const Contact = () => {
    return (
        <div className="py-12 px-4 max-w-5xl mx-auto">
            <div className="text-center mb-16 space-y-4">
                <h1 className="text-4xl font-black text-gray-900">Contacto</h1>
                <p className="text-gray-700 max-w-2xl mx-auto">
                    ¿Tienes dudas sobre algún proyecto o quieres colaborar con el Laboratorio? Estamos aquí para escucharte.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-8">
                    <div className="flex gap-4">
                        <Tile><MapPin size={24} /></Tile>
                        <div>
                            <h2 className="font-bold text-gray-900">Ubicación</h2>
                            <p className="text-gray-700 text-sm">Carrera 5 No. 5-40, Popayán, Cauca</p>
                            <p className="text-sem-text-2 text-sm">Claustro de la Encarnación</p>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <Tile><Mail size={24} /></Tile>
                        <div className="min-w-0">
                            <h2 className="font-bold text-gray-900">Correo Electrónico</h2>
                            <p className="text-gray-700 text-sm break-words">sdionizio@unimayor.edu.co</p>
                            <p className="text-gray-700 text-sm break-words">cristiantovar@unimayor.edu.co</p>
                            <p className="text-sem-text-2 text-sm">Atención a docentes y estudiantes</p>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <Tile><Phone size={24} /></Tile>
                        <div>
                            <h2 className="font-bold text-gray-900">Teléfono</h2>
                            <p className="text-gray-700 text-sm">(+57) 602 824 1109</p>
                            <p className="text-sem-text-2 text-sm">Ext. 123 - Laboratorios</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-3xl border border-gray-200 flex flex-col justify-center items-center text-center space-y-6">
                    <div className="w-20 h-20 bg-sem-area-bg rounded-full flex items-center justify-center text-institutional-blue" aria-hidden="true">
                        <Clock size={40} />
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-xl font-bold text-gray-900">Horarios de Atención</h2>
                        <p className="text-gray-700">Lunes a Viernes</p>
                        <p className="text-institutional-blue font-bold text-lg">8:00 AM - 12:00 PM</p>
                        <p className="text-institutional-blue font-bold text-lg">2:00 PM - 6:00 PM</p>
                    </div>
                    <p className="text-sm text-sem-text-2 italic">
                        * El acceso al laboratorio físico requiere cita previa.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Contact;
