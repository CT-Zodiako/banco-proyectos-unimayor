import { Link, useLocation } from 'react-router-dom';
import GlobalSearch from './GlobalSearch';
import logo from '../assets/logo.png';
import { EVENTS_URL, PUBLISH_URL } from '../lib/links';

// `match` lists the paths that belong to each item, so the item stays marked on its sub-pages too
// (a project page belongs to "Proyectos").
const ITEMS = [
    { to: '/proyectos', label: 'Proyectos', match: ['/proyectos', '/proyecto'] },
    { to: EVENTS_URL, label: 'Eventos académicos', match: [EVENTS_URL] },
    { to: PUBLISH_URL, label: 'Dónde publicar', match: [PUBLISH_URL] },
    { to: '/oportunidades', label: 'Mis oportunidades', match: ['/oportunidades'] },
];

const isOn = (pathname, paths) => paths.some((path) => pathname === path || pathname.startsWith(`${path}/`));

const FOCUS = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-institutional-yellow';

const Navbar = () => {
    const { pathname } = useLocation();

    return (
        <header className="bg-institutional-blue text-white shadow-md sticky top-0 z-50">
            <nav aria-label="Principal">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-20 flex flex-wrap items-stretch justify-between gap-x-6">
                    <Link
                        to="/"
                        aria-current={pathname === '/' ? 'page' : undefined}
                        className={`flex items-center gap-4 py-2 rounded ${FOCUS}`}
                    >
                        <div className="bg-white p-1 rounded-sm flex-none">
                            <img src={logo} alt="" className="h-10 w-auto max-w-none" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[15px] sm:text-lg font-bold leading-tight">Institución Universitaria Colegio Mayor del Cauca</span>
                            <span className="text-sm font-light opacity-90">Laboratorio de Física y Sistemas Embebidos</span>
                            <span className="sr-only">. Ir al inicio</span>
                        </div>
                    </Link>

                    <ul className="flex flex-wrap items-stretch gap-1 text-[15px]">
                        {ITEMS.map(({ to, label, match }) => {
                            const current = isOn(pathname, match);
                            return (
                                <li key={to} className="flex">
                                    <Link
                                        to={to}
                                        aria-current={current ? 'page' : undefined}
                                        className={`flex items-center min-h-[44px] px-3.5 border-y-4 border-transparent transition-colors focus-visible:-outline-offset-4 ${FOCUS} ${current
                                            ? 'font-bold border-b-white bg-white/10'
                                            : 'font-medium hover:text-institutional-yellow'}`}
                                    >
                                        {label}
                                    </Link>
                                </li>
                            );
                        })}
                        <li className="flex items-center max-md:ml-auto md:ml-2">
                            <GlobalSearch />
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
