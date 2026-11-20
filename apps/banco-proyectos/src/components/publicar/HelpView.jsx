import { BookOpen, CalendarDays, CheckCircle2, XCircle } from 'lucide-react';
import { JournalBadge } from './JournalBadges';
import { QuartileBadge } from './JournalLinks';
import { AFFINITY_CLASS } from './classes';
import { WEEKS_FAST, WEEKS_MEDIUM, dataSourcesText, journalBadges, QUARTILE_NOTES } from '../../lib/publicar/display';
import { AFFINITY_THRESHOLDS } from '../../lib/publicar/table';

const CARD = 'bg-white border border-gray-200 rounded-2xl shadow-sm px-[18px] py-4 [&_li]:mb-1.5 [&_a]:text-institutional-blue [&_a]:underline';
const H2 = 'mt-0 mb-2 text-lg font-extrabold text-gray-900';
const EXTERNAL = { target: '_blank', rel: 'noopener' };

const QUARTILES = [['Q1', 'A1'], ['Q2', 'A2'], ['Q3', 'B'], ['Q4', 'C']];

const SAMPLE = { languages: ['Spanish'], review: 'Double anonymous peer review', license: 'CC BY' };
const sample = (id, weeks = 6) => journalBadges({ ...SAMPLE, weeks_to_publication: weeks }).find((badge) => badge.id === id);
const { high, mid } = AFFINITY_THRESHOLDS;

// One row of «Qué significa cada color»: the swatch (the same badge the results use) and its meaning in words.
function ColorRow({ children, text }) {
    return (
        <li className="m-0 grid grid-cols-[minmax(0,22rem)_minmax(0,1fr)] items-center gap-x-3 gap-y-1 !mb-0 border-b border-gray-100 py-2 last:border-b-0 max-[560px]:grid-cols-1">
            <span className="flex flex-wrap items-center gap-1.5">{children}</span>
            <span>{text}</span>
        </li>
    );
}
const AffinitySwatch = ({ level, word }) => <span className={`aff-word aff-word-inline ${AFFINITY_CLASS[level]}`}>Afinidad {word}</span>;

// Every color of the page with its swatch and meaning. One hue = one meaning; the text of each badge says it too.
function ColorsCard() {
    return (
        <div className={`${CARD} col-span-full`}>
            <h2 className={H2}>Qué significa cada color</h2>
            <p className="mt-0 text-[13.5px] text-gray-700">Cada color tiene un solo significado y siempre va con una palabra, un icono o barras: no hace falta distinguir colores para entender los resultados.</p>
            <ul className="m-0 list-none p-0 text-[13.5px] [&_a]:no-underline">
                <ColorRow text="Los botones de las dos herramientas: revistas en verde azulado, eventos en violeta."><span className="badge badge-tone tn-journals" data-hue="journals"><BookOpen size={14} aria-hidden="true" className="flex-none" />Dónde publicar</span><span className="badge badge-tone tn-events" data-hue="events"><CalendarDays size={14} aria-hidden="true" className="flex-none" />Ver eventos</span></ColorRow>
                <ColorRow text="Cuartil de SCImago, del mejor al cuarto, con su categoría Publindex: Q1 verde (A1), Q2 índigo (A2), Q3 ámbar (B) y Q4 rosa (C). Las barras también lo dicen: más barras, mejor cuartil.">
                    {QUARTILES.map(([quartile]) => <QuartileBadge key={quartile} quartile={quartile} showPublindex={false} />)}
                </ColorRow>
                <ColorRow text={`Afinidad con el proyecto: alta ${high} % o más (verde), media de ${mid} a ${high - 1} % (ámbar) y baja menos de ${mid} % (rosa). El anillo, el número y la palabra comparten color.`}>
                    <AffinitySwatch level="high" word="alta" /><AffinitySwatch level="mid" word="media" /><AffinitySwatch level="low" word="baja" />
                </ColorRow>
                <ColorRow text="Sin costo (verde): DOAJ indica que la revista no cobra APC ni otros cargos a los autores."><JournalBadge badge={sample('free')} /></ColorRow>
                <ColorRow text="Acepta español (azul): puedes enviar el artículo en español."><JournalBadge badge={sample('spanish')} /></ColorRow>
                <ColorRow text="Tipo de revisión por pares (gris azulado): doble ciego, simple ciego, abierta o editorial."><JournalBadge badge={sample('review')} /></ColorRow>
                <ColorRow text={`Velocidad de publicación: rápida ${WEEKS_FAST} semanas o menos (verde), media hasta ${WEEKS_MEDIUM} (ámbar) y lenta más de ${WEEKS_MEDIUM} (rosa).`}>
                    <JournalBadge badge={sample('speed', WEEKS_FAST)} /><JournalBadge badge={sample('speed', WEEKS_MEDIUM)} /><JournalBadge badge={sample('speed', WEEKS_MEDIUM + 4)} />
                </ColorRow>
                <ColorRow text="Licencia de uso de los artículos (verde azulado), por ejemplo CC BY."><JournalBadge badge={sample('license')} /></ColorRow>
                <ColorRow text="Cumple (verde) y No cumple (rosa): lo que la revista pide frente a lo que el proyecto tiene; llevan ✓ y ✗."><span className="badge badge-tone tn-good"><CheckCircle2 size={14} aria-hidden="true" className="flex-none" />Cumple</span><span className="badge badge-tone tn-low"><XCircle size={14} aria-hidden="true" className="flex-none" />No cumple</span></ColorRow>
            </ul>
        </div>
    );
}

// "Cómo leer esta página": what the journals are, how quartiles map to Publindex, how they are chosen and what the
// affinity means.
export default function HelpView({ data }) {
    return (
        <>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] gap-3.5">
                <div className={CARD}>
                    <h2 className={H2}>¿Qué revistas aparecen?</h2>
                    <p>Solo revistas que cumplen las tres condiciones a la vez:</p>
                    <ol className="pl-5 list-decimal">
                        <li><strong>Indexadas:</strong> tienen cuartil (Q1, Q2, Q3 o Q4) en <a href="https://www.scimagojr.com/" {...EXTERNAL}>SCImago Journal Rank</a>.</li>
                        <li><strong>Sin costo para publicar:</strong> <a href="https://doaj.org/" {...EXTERNAL}>DOAJ</a> indica que no cobran APC ni otros cargos.</li>
                        <li><strong>Lectura gratuita:</strong> están en DOAJ, es decir, publican en acceso abierto diamante.</li>
                    </ol>
                </div>
                <div className={CARD}>
                    <h2 className={H2}>Cuartil y categoría Publindex</h2>
                    <table className="w-full border-collapse">
                        <caption className="sr-only">Cuartil SCImago y su homologación Publindex</caption>
                        <thead><tr><th className="text-left text-sm p-2 border-b border-gray-200">Cuartil SCImago</th><th className="text-left text-sm p-2 border-b border-gray-200">Qué significa</th><th className="text-left text-sm p-2 border-b border-gray-200">Homologación Publindex</th></tr></thead>
                        <tbody>
                            {QUARTILES.map(([quartile, publindex]) => (
                                <tr key={quartile}>
                                    <td className="text-sm p-2 border-b border-gray-200"><QuartileBadge quartile={quartile} showPublindex={false} /></td>
                                    <td className="text-sm p-2 border-b border-gray-200">{QUARTILE_NOTES[quartile]}</td>
                                    <td className="text-sm p-2 border-b border-gray-200">{publindex}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p className="text-[13px] text-sem-text-2">Se muestra el mejor cuartil de la revista. Minciencias toma el cuartil vigente en el año de publicación.</p>
                </div>
                <div className={CARD}>
                    <h2 className={H2}>¿Cómo se eligen las revistas?</h2>
                    <p>Cada proyecto se describe con temas de <strong>sector</strong> y de <strong>tecnología</strong> (área, sector y título); cada revista, con sus categorías de SCImago y sus palabras clave de DOAJ.</p>
                    <ul className="pl-5 list-disc">
                        <li><span className="badge border-green-200 bg-sem-success-bg text-sem-success-fg">Sector + tecnología</span> cubre el sector del proyecto y publica trabajos tecnológicos.</li>
                        <li><span className="badge badge-area">Tecnología</span> revista de computación o ingeniería que acepta aplicaciones de cualquier sector.</li>
                    </ul>
                </div>
                <div className={CARD}>
                    <h2 className={H2}>¿Qué es la afinidad?</h2>
                    <p>Una estimación de 0 a 100 % de qué tan bien encaja el proyecto con la revista. Se dice también con palabras: <strong>alta</strong> ({AFFINITY_THRESHOLDS.high} % o más), <strong>media</strong> ({AFFINITY_THRESHOLDS.mid} a {AFFINITY_THRESHOLDS.high - 1} %) y <strong>baja</strong> (menos de {AFFINITY_THRESHOLDS.mid} %). <strong>No es una probabilidad de aceptación</strong>: ninguna fuente pública informa tasas de aceptación, y la decisión depende de la calidad del artículo y de la revisión por pares.</p>
                    <ul className="pl-5 list-disc">
                        <li><strong>Encaje temático (40):</strong> temas de sector y de tecnología del proyecto que cubre la revista.</li>
                        <li><strong>Exigencia según el nivel (25):</strong> una Q1 es más exigente para un proyecto Intermedio que para uno Avanzado.</li>
                        <li><strong>Tiempo de publicación (15):</strong> menos semanas, más puntos.</li>
                        <li><strong>Idioma (10):</strong> acepta español (10), portugués (7) o inglés (5).</li>
                        <li><strong>Región (10):</strong> revista iberoamericana (10) u otra (5).</li>
                    </ul>
                </div>
                <ColorsCard />
                <div className={`${CARD} border-l-4 border-l-institutional-yellow`}>
                    <h2 className={H2}>Antes de enviar un artículo</h2>
                    <ul className="pl-5 list-disc">
                        <li>La sugerencia es automática: lea el alcance de la revista y artículos recientes.</li>
                        <li>Confirme en su sitio que no cobra nada; las políticas cambian.</li>
                        <li>Verifique el cuartil en SCImago y la categoría en <a href="https://scienti.minciencias.gov.co/publindex/" {...EXTERNAL}>Publindex</a> por ISSN.</li>
                        <li>Desconfíe de correos que ofrecen publicar rápido.</li>
                    </ul>
                </div>
            </div>
            <p className="mt-3.5 text-[13px] text-sem-text-2">{dataSourcesText(data)}</p>
        </>
    );
}
