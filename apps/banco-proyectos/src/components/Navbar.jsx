import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { EVENTS_URL } from '../lib/links';

const Navbar = () => {

    return (
        <nav className="bg-institutional-blue text-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <Link to="/" aria-label="Ir al inicio" className="flex items-center gap-4 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-institutional-yellow">
                        <div className="bg-white p-1 rounded-sm">
                            <img src={logo} alt="UNIMAYOR Logo" className="h-10 w-auto" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-lg font-bold leading-tight">Institución Universitaria Colegio Mayor del Cauca</span>
                            <span className="text-sm font-light opacity-90">Laboratorio de Física y Sistemas Embebidos</span>
                        </div>
                    </Link>

                    <div className="hidden md:flex items-center gap-6">
                        <a href={EVENTS_URL} className="font-semibold hover:text-institutional-yellow transition-colors">Eventos académicos</a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
