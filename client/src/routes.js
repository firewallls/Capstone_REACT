import {
    route,
    layout,
    index,
} from "@react-router/dev/routes";

export default [
    // Layout route – wraps all child routes with AppLayout (sidebar)
    layout("./components/app/layout.jsx", [
        index("./pages/Dashboard.jsx"),               // "/"
        route("attendance", "./pages/Attendance.jsx"),
        route("marks", "./pages/Marks.jsx"),
        route("learning", "./pages/Learning.jsx"),
        route("platforms", "./pages/Platforms.jsx"),
        route("settings", "./pages/Settings.jsx"),
    ]),
];