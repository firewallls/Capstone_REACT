import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "react-router";

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
        <div id="root">
            {children}
        </div>
        <ScrollRestoration />
        <Scripts />
        </body>
        </html>
    );
}

// This component is the root route – it renders your actual app layout
export default function Root() {
    return <Outlet />;
}