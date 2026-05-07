import {route, layout, index} from "@react-router/dev/routes";

export default [
    layout("./components/app/layout.jsx", [
        index("./pages/Dashboard.jsx"),
        route("attendance", "./pages/Attendance.jsx"),
        route("marks", "./pages/Marks.jsx"),
        route("platforms", "./pages/Platforms.jsx"),
        route("settings", "./pages/Settings.jsx"),
    ]),
    // Catch-all to handle GitHub Pages redirects
    route("*", "./pages/RedirectHandler.jsx"),
];