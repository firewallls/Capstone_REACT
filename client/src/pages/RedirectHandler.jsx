import { Navigate, useSearchParams } from "react-router";

export default function RedirectHandler() {
    const [searchParams] = useSearchParams();
    const redirect = searchParams.get("p");
    
    if (redirect) {
        const newPath = redirect.replace("/Capstone_REACT", "") || "/";
        return <Navigate to={newPath} replace />;
    }
    
    return <Navigate to="/" replace />;
}