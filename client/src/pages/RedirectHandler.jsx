import { Navigate } from "react-router";

export default function RedirectHandler() {
    const params = new URLSearchParams(window.location.search);
    const redirect = params.get("p");
    if (redirect) {
        const newPath = redirect.replace("/Capstone_REACT", "") || "/";
        return <Navigate to={newPath} replace />;
    }
    return <Navigate to="/" replace />;
}