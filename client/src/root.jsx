import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import {ThemeProvider} from "./components/theme-provider.jsx";

export function Layout({ children }) {
    return (
        <html lang="en">
        <head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>My App</title>
            <Meta />
            <Links />
        </head>
        <body>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            {children}
        </ThemeProvider>
        <ScrollRestoration />
        <Scripts />
        </body>
        </html>
    );
}

export default function Root() {
    return <Outlet />;
}