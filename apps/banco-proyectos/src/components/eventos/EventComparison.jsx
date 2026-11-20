import { comparisonRows } from '../../lib/eventos/display';

// Side-by-side table of up to three selected events.
const EventComparison = ({ events, selected, onClear }) => {
    const { chosen, rows } = comparisonRows(events, selected);
    if (chosen.length === 0) return null;
    return (
        <section aria-labelledby="comparison-title" className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4">
            <div className="flex items-center justify-between gap-3">
                <h2 id="comparison-title" className="m-0 text-[18px] font-extrabold text-gray-900">Comparar eventos</h2>
                <button type="button" onClick={onClear} className="link-action focus-ring rounded">Quitar todos</button>
            </div>
            <p className="my-2 text-[13px] text-sem-text-2">Seleccione hasta tres eventos. Los datos no informados aparecen como «No informado».</p>
            <div className="overflow-x-auto">
                <table className="w-full min-w-[540px] border-collapse text-[13px]">
                    <caption className="sr-only">Comparación de eventos seleccionados</caption>
                    <thead>
                        <tr>
                            <th scope="col" className="text-left align-top p-2 border-b border-gray-100 text-gray-700">Dato</th>
                            {chosen.map((event) => <th key={event.id} scope="col" className="text-left align-top p-2 border-b border-gray-100 text-gray-700">{event.title}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row) => (
                            <tr key={row.label}>
                                <th scope="row" className="text-left align-top p-2 border-b border-gray-100 text-gray-700">{row.label}</th>
                                {row.values.map((value, index) => <td key={chosen[index].id} className="text-left align-top p-2 border-b border-gray-100">{value}</td>)}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default EventComparison;
