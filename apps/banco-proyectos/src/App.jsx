import { LazyMotion, domAnimation } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import TapTips from './components/TapTips';
import Home from './pages/Home';
import RouteLoader from './components/RouteLoader';
import ProjectsPage from './pages/ProjectsPage';
import { ROUTE_PAGES } from './lib/routeChunks';
import useDocumentTitle from './hooks/useDocumentTitle';
import LegacyRedirect from './components/LegacyRedirect';
import logo from './assets/logo.png';
import { EVENTS_URL, LEGACY_EVENTS_PATH, LEGACY_PUBLISH_PATH, PUBLISH_URL } from './lib/links';
import { Mail, Globe, MapPin } from 'lucide-react';

// Every page but Home and the shell of /proyectos (title, summary, loading state; its results are a chunk) is its own chunk (src/lib/routeChunks.js), downloaded when its route opens. The event and journal
// data (hundreds of KB to a few MB of JSON) is only downloaded when each finder is opened.
const { Proyecto, Comparar, Acerca, Contacto, Oportunidades, Eventos, DondePublicar } = ROUTE_PAGES;

// Unknown address: its own title so the tab says it too.
const NotFound = () => {
    useDocumentTitle('Página no encontrada');
    return (
        <div className="py-20 text-center space-y-4">
            <h1 className="text-3xl font-extrabold text-gray-900">Página no encontrada</h1>
            <p className="text-gray-700">La dirección no existe en el banco de proyectos.</p>
            <Link to="/" className="btn btn-primary btn-lg">Ir al inicio</Link>
        </div>
    );
};

// First stop of the keyboard: moves the focus to <main> without changing the URL (no #hash is added).
const SkipLink = () => (
    <a
        href="#contenido"
        className="skip-link"
        onClick={(event) => {
            event.preventDefault();
            document.getElementById('contenido')?.focus();
        }}
    >
        Saltar al contenido
    </a>
);

const LINK = 'hover:text-institutional-yellow hover:underline underline-offset-4 transition-colors';

const Footer = () => (
    <footer className="bg-institutional-dark text-white pt-16 pb-8">
        <div className="page-container grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4">
                <div className="bg-white rounded-xl p-2 inline-block">
                    <img src={logo} alt="Escudo de la Institución Universitaria Colegio Mayor del Cauca" width="421" height="391" loading="lazy" decoding="async" className="h-24 w-auto" />
                </div>
                <h2 className="text-xl font-bold text-gray-200">UNIMAYOR</h2>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Comprometidos con la excelencia académica y el desarrollo tecnológico del departamento del Cauca.
                </p>
            </div>

            <div className="space-y-4">
                <h2 className="text-lg font-bold text-gray-200">Enlaces rápidos</h2>
                <ul className="space-y-2 text-sm text-gray-400">
                    <li><Link to="/" className={LINK}>Inicio</Link></li>
                    <li><Link to="/proyectos" className={LINK}>Catálogo de Proyectos</Link></li>
                    <li><Link to={EVENTS_URL} className={LINK}>Eventos Académicos</Link></li>
                    <li><Link to={PUBLISH_URL} className={LINK}>Dónde publicar</Link></li>
                    <li><Link to="/acerca" className={LINK}>Sobre el Banco</Link></li>
                    <li><Link to="/contacto" className={LINK}>Contacto</Link></li>
                </ul>
            </div>

            <div className="space-y-4">
                <h2 className="text-lg font-bold text-gray-200">Contacto</h2>
                <div className="space-y-3 text-sm text-gray-400">
                    <p className="flex items-start gap-2">
                        <MapPin size={18} aria-hidden="true" className="text-institutional-yellow flex-shrink-0" />
                        Carrera 5 No. 5-40, Claustro de la Encarnación, Popayán
                    </p>
                    <p className="flex items-start gap-2">
                        <Mail size={18} aria-hidden="true" className="text-institutional-yellow flex-shrink-0" />
                        <span className="flex flex-col">
                            <span>sdionizio@unimayor.edu.co</span>
                            <span>cristiantovar@unimayor.edu.co</span>
                        </span>
                    </p>
                    <p className="flex items-center gap-2">
                        <Globe size={18} aria-hidden="true" className="text-institutional-yellow flex-shrink-0" />
                        www.unimayor.edu.co
                    </p>
                </div>
            </div>
        </div>
        <div className="mt-16 pt-8 border-t border-gray-800 text-center text-xs text-gray-400">
            &copy; {new Date().getFullYear()} Institución Universitaria Colegio Mayor del Cauca. Todos los derechos reservados.
        </div>
    </footer>
);

// LazyMotion + the `m` components (Home, the figures, the project cards) load only the animation features the app uses
// (animate, hover) instead of the whole library.
function App() {
    return (
        <LazyMotion features={domAnimation}>
            <Router>
                <ScrollToTop />
                <div className="min-h-screen flex flex-col bg-institutional-light">
                    <SkipLink />
                    <TapTips />
                    <Navbar />
                    <main id="contenido" tabIndex={-1} className="flex-grow page-container">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/proyectos" element={<ProjectsPage />} />
                            <Route path="/proyectos/comparar" element={<RouteLoader what="la comparación"><Comparar /></RouteLoader>} />
                            <Route path="/proyecto/:id" element={<RouteLoader what="el proyecto"><Proyecto /></RouteLoader>} />
                            <Route path="/acerca" element={<RouteLoader what="la página"><Acerca /></RouteLoader>} />
                            <Route path="/contacto" element={<RouteLoader what="la página"><Contacto /></RouteLoader>} />
                            <Route path="/oportunidades" element={<RouteLoader what="sus oportunidades"><Oportunidades /></RouteLoader>} />
                            <Route path={EVENTS_URL} element={<RouteLoader what="los eventos"><Eventos /></RouteLoader>} />
                            <Route path={LEGACY_EVENTS_PATH} element={<LegacyRedirect to={EVENTS_URL} />} />
                            <Route path={PUBLISH_URL} element={<RouteLoader what="las revistas"><DondePublicar /></RouteLoader>} />
                            <Route path={LEGACY_PUBLISH_PATH} element={<LegacyRedirect to={PUBLISH_URL} />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </Router>
        </LazyMotion>
    );
}

export default App;
