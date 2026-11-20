import { useMemo, useState } from 'react';
import { CatalogGridSkeleton, CatalogHeader } from '../components/CatalogSkeleton';
import RouteLoader, { DialogLoader } from '../components/RouteLoader';
import { LoadError } from '../components/proyecto-panel/PanelParts';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { useProjectsIndex } from '../hooks/useProjects';
import { NEW_AREAS } from '../data/projects/areas';
import { areaTags } from '../lib/catalog';
import { lazyRoute } from '../lib/lazyRoute';
import { ROUTE_PAGES } from '../lib/routeChunks';

// The catalog results (filters, cards, pages) are a chunk of their own (routeChunks.js), and «Proponer proyecto» is a
// form dialog whose code downloads the first time it is opened.
const ProjectsCatalog = ROUTE_PAGES.Catalogo;
const ProposalDialog = lazyRoute(() => import('../components/ProposalDialog'));

// Page shell of /proyectos, always in the entry bundle: the title, the intro and the summary are drawn from the first
// paint (placeholders where numbers will go), so the page never swaps its heading while the pieces download. The
// results chunk and the light projects index download in parallel; a failed index says so with «Reintentar».
const ProjectsPage = () => {
    useDocumentTitle('Explorar proyectos');
    const { projects, loading, error, retry } = useProjectsIndex();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const ready = !loading && !error;
    const areas = useMemo(() => [...new Set(projects.flatMap(areaTags))], [projects]);
    const proposalAreas = useMemo(() => [...areas].sort((a, b) => a.localeCompare(b, 'es')), [areas]);

    return (
        <div className="py-8">
            <CatalogHeader
                summary={ready ? <><strong className="text-institutional-blue">{projects.length} proyectos</strong> en {areas.length} áreas · {NEW_AREAS.length} áreas nuevas este semestre</> : null}
                onPropose={ready ? () => setIsModalOpen(true) : null}
            />
            {error && <LoadError what="los proyectos" onRetry={retry} />}
            {loading && <CatalogGridSkeleton />}
            {ready && (
                <RouteLoader what="los proyectos" fallback={<CatalogGridSkeleton route />}>
                    <ProjectsCatalog projects={projects} />
                </RouteLoader>
            )}
            {isModalOpen && (
                <DialogLoader what="el formulario" onClose={() => setIsModalOpen(false)}>
                    <ProposalDialog areas={proposalAreas} onClose={() => setIsModalOpen(false)} />
                </DialogLoader>
            )}
        </div>
    );
};

export default ProjectsPage;
