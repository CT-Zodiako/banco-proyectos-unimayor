import { LoadError } from './proyecto-panel/PanelParts';
import PanelSkeleton from './proyecto-panel/PanelSkeleton';
import useLazyData from '../hooks/useLazyData';

// Renders children(data) once the data file is downloaded; meanwhile the page skeleton, or the error with retry.
export default function DataGate({ file, what, rows, children }) {
    const { status, data, retry } = useLazyData(file, true);
    if (status === 'error') return <div className="py-8"><LoadError what={what} onRetry={retry} /></div>;
    // Header block plus rows, tall enough that the footer does not jump when the page arrives.
    if (status !== 'ready') return <div className="min-h-[70vh] py-8"><PanelSkeleton rows={rows} withHeader /></div>;
    return children(data);
}
