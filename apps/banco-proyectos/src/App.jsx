import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetail from './pages/ProjectDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import logo from './assets/logo.png';
import { EVENTS_URL } from './lib/links';
import { Mail, Globe, MapPin } from 'lucide-react';

const Footer = () => (
    <footer className="bg-institutional-dark text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4">
                <div className="bg-white rounded-xl p-2 inline-block">
                    <img src={logo} alt="Escudo de la Institución Universitaria Colegio Mayor del Cauca" className="h-24 w-auto" />
                </div>
                <h3 className="text-xl font-bold text-gray-200">UNIMAYOR</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Comprometidos con la excelencia académica y el desarrollo tecnológico del departamento del Cauca.
                </p>
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-200">Enlaces Rápidos</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                    <li><Link to="/" className="hover:text-institutional-yellow transition-colors">Inicio</Link></li>
                    <li><Link to="/proyectos" className="hover:text-institutional-yellow transition-colors">Catálogo de Proyectos</Link></li>
                    <li><a href={EVENTS_URL} className="hover:text-institutional-yellow transition-colors">Eventos Académicos</a></li>
                    <li><Link to="/acerca" className="hover:text-institutional-yellow transition-colors">Sobre el Banco</Link></li>
                    <li><Link to="/contacto" className="hover:text-institutional-yellow transition-colors">Contacto</Link></li>
                </ul>
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-bold">Contacto</h3>
                <div className="space-y-3 text-sm text-gray-400">
                    <p className="flex items-start gap-2">
                        <MapPin size={18} className="text-institutional-yellow flex-shrink-0" />
                        Carrera 5 No. 5-40, Claustro de la Encarnación, Popayán
                    </p>
                    <p className="flex items-start gap-2">
                        <Mail size={18} className="text-institutional-yellow flex-shrink-0" />
                        <span className="flex flex-col">
                            <span>sdionizio@unimayor.edu.co</span>
                            <span>cristiantovar@unimayor.edu.co</span>
                        </span>
                    </p>
                    <p className="flex items-center gap-2">
                        <Globe size={18} className="text-institutional-yellow" />
                        www.unimayor.edu.co
                    </p>
                </div>
            </div>
        </div>
        <div className="mt-16 pt-8 border-t border-gray-800 text-center text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Institución Universitaria Colegio Mayor del Cauca. Todos los derechos reservados.
        </div>
    </footer>
);

function App() {
    return (
        <Router>
            <ScrollToTop />
            <div className="min-h-screen flex flex-col bg-institutional-light">
                <Navbar />
                <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/proyectos" element={<ProjectsPage />} />
                        <Route path="/proyecto/:id" element={<ProjectDetail />} />
                        <Route path="/acerca" element={<About />} />
                        <Route path="/contacto" element={<Contact />} />
                        <Route path="*" element={<div className="py-20 text-center">Página no encontrada</div>} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
