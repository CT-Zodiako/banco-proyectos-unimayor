import { Link } from 'react-router-dom';

// Header card shared by /eventos and /donde-publicar (T15): hue top border, icon tile, eyebrow, the page's only h1,
// optional description, and an actions area on the right with the optional back button and the link to the saved
// opportunities. `hue` is 'events' or 'journals' (the tone class that colors the top border and the tile).
const HUES = { events: 'tn-events', journals: 'tn-journals' };

export default function PageHeader({ hue, icon, eyebrow, title, children, back }) {
    return (
        <div className={`page-header hue-card ${HUES[hue] ?? HUES.journals}`}>
            <div className="page-header-main">
                <div className="page-header-icon type-chip" aria-hidden="true">{icon}</div>
                <div className="min-w-0">
                    <p className="page-header-eyebrow">{eyebrow}</p>
                    <h1 className="page-header-title">{title}</h1>
                    {children && <p className="page-header-desc">{children}</p>}
                </div>
            </div>
            <div className="page-header-actions">
                {back && <Link to={back.to} className="btn btn-secondary focus-ring">{back.children}</Link>}
                <Link to="/oportunidades" className="link-action focus-ring rounded">Mis oportunidades guardadas →</Link>
            </div>
        </div>
    );
}
