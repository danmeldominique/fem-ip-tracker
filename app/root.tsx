import type { LinksFunction } from "@remix-run/node";
import styles from './global.css'
import "leaflet/dist/leaflet.css";

import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { cssBundleHref } from "@remix-run/css-bundle";

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref },
  {rel: "stylesheet", href: styles },
  {rel: "stylesheet", href: "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css", integrity:"sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="}] : [])
] ;

export default function App() {
  console.log(cssBundleHref)
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />

      </head>
      <body className="font-sans">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
