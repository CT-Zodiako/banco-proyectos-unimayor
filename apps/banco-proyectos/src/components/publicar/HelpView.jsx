import { dataSourcesText, QUARTILE_NOTES } from '../../lib/publicar/display';
import { QuartileBadge } from './JournalLinks';
import { AFFINITY_THRESHOLDS } from '../../lib/publicar/table';

const CARD = 'bg-white border border-gray-200 rounded-2xl shadow-sm px-[18px] py-4 [&_li]:mb-1.5 [&_a]:text-institutional-blue [&_a]:underline';
const H2 = 'mt-0 mb-2 text-lg font-extrabold text-gray-900';
const EXTERNAL = { target: '_blank', rel: 'noopener' };

const QUARTILES = [['Q1', 'A1'], ['Q2', 'A2'], ['Q3', 'B'], ['Q4', 'C']];

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
