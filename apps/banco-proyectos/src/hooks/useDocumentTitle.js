import { useEffect } from 'react';
import { DEFAULT_TITLE, pageTitle } from '../lib/page-title';

// Sets document.title to «<part> · Banco de Proyectos UNIMAYOR» while the page is mounted and gives the site title back
// when it unmounts (the next page sets its own in the same commit). It announces nothing (no live region): the route
// change reaches screen reader users through the page structure and focus handling the app already has, untouched here.
export default function useDocumentTitle(part) {
    useEffect(() => {
        document.title = pageTitle(part);
        return () => { document.title = DEFAULT_TITLE; };
    }, [part]);
}
