import { Navigate, useLocation } from 'react-router-dom';

// Old static page URL (e.g. /eventos/index.html?p=proj_001) -> its React route, keeping the query and hash
// so bookmarks and links already shared still land on the same view with the same project preselected.
const LegacyRedirect = ({ to }) => {
    const { search, hash } = useLocation();
    return <Navigate to={{ pathname: to, search, hash }} replace />;
};

export default LegacyRedirect;
