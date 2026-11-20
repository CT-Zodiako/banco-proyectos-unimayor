import { LoadError } from './proyecto-panel/PanelParts';
import PanelSkeleton from './proyecto-panel/PanelSkeleton';
import useLazyData from '../hooks/useLazyData';

// Renders children(data) once the data file is downloaded; meanwhile the loading skeleton, or the error with retry.
export default function DataGate({ file, what, rows, children }) {
    const { status, data, retry } = useLazyData(file, true);
    if (status === 'error') return <div className="py-8"><LoadError what={what} onRetry={retry} /></div>;
    if (status !== 'ready') return <div className="py-8"><PanelSkeleton rows={rows} /></div>;
    return children(data);
}
