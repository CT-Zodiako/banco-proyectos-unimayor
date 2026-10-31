import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const Contact = () => {
    return (
        <div className="py-12 px-4 max-w-5xl mx-auto">
            <div className="text-center mb-16 space-y-4">
                <h1 className="text-4xl font-black text-gray-900">Contacto</h1>
                <p className="text-gray-500 max-w-2xl mx-auto">
                    ¿Tienes dudas sobre algún proyecto o quieres colaborar con el Laboratorio? Estamos aquí para escucharte.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-8">
                    <div className="flex gap-4">
                        <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-institutional-blue flex-shrink-0">
                            <MapPin size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900">Ubicación</h3>
                            <p className="text-gray-500 text-sm">Carrera 5 No. 5-40, Popayán, Cauca</p>
                            <p className="text-gray-400 text-xs">Claustro de la Encarnación</p>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 flex-shrink-0">
                            <Mail size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900">Correo Electrónico</h3>
                            <p className="text-gray-500 text-sm">sdionizio@unimayor.edu.co</p>
                            <p className="text-gray-400 text-xs">Atención a docentes y estudiantes</p>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600 flex-shrink-0">
                            <Phone size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900">Teléfono</h3>
                            <p className="text-gray-500 text-sm">(+57) 602 824 1109</p>
                            <p className="text-gray-400 text-xs">Ext. 123 - Laboratorios</p>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 flex flex-col justify-center items-center text-center space-y-6">
                    <div className="w-20 h-20 bg-white rounded-full shadow-sm flex items-center justify-center text-institutional-blue">
                        <Clock size={40} />
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-xl font-bold text-gray-900">Horarios de Atención</h3>
                        <p className="text-gray-500">Lunes a Viernes</p>
                        <p className="text-institutional-blue font-bold text-lg">8:00 AM - 12:00 PM</p>
                        <p className="text-institutional-blue font-bold text-lg">2:00 PM - 6:00 PM</p>
                    </div>
                    <p className="text-xs text-gray-400 italic">
                        * El acceso al laboratorio físico requiere cita previa.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Contact;
