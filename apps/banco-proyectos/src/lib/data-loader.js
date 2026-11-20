// The finder data (publicar-data.json ~2.4 MB, publicar-catalog.json ~2.6 MB, eventos.json ~0.3 MB) is not bundled in
// the JS: it lives in public/data/ and is fetched at runtime from <base>/data/<file>, where nginx compresses it.
export const DATA_FILES = {
    publicar: 'publicar-data.json',
    catalog: 'publicar-catalog.json',
    eventos: 'eventos.json',
};

export function dataUrl(baseUrl, file) {
    const base = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
    return `${base}data/${file}`;
}

// One download per file shared by everyone who asks for it (a page and the project panel). A failed download is not
// kept, so asking again retries it.
export function createDataLoader(fetchImpl, baseUrl) {
    const cache = new Map();

    function load(file) {
        if (cache.has(file)) return cache.get(file);
        const promise = fetchImpl(dataUrl(baseUrl, file))
            .then((response) => {
                if (!response.ok) throw new Error(`HTTP ${response.status} loading ${file}`);
                return response.json();
            })
            .catch((error) => {
                if (cache.get(file) === promise) cache.delete(file);
                throw error;
            });
        cache.set(file, promise);
        return promise;
    }

    return { load };
}

const loader = createDataLoader((url) => fetch(url), import.meta.env?.BASE_URL ?? '/');

export const loadData = loader.load;
