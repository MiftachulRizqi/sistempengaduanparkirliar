import "@/styles/global.css";
import "leaflet/dist/leaflet.css";

import { Suspense } from "react";
import AppShell from "../components/AppShell";
import RouteChangeSkeleton from "@/components/RouteChangeSkeleton";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&family=Roboto&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
          rel="stylesheet"
        />
      </head>

      <body>
        <Suspense fallback={null}>
          <RouteChangeSkeleton />
        </Suspense>

        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}