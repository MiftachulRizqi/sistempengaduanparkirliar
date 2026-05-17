import "@/styles/global.css";
import "leaflet/dist/leaflet.css";

import { Suspense } from "react";
import AppShell from "../components/AppShell";
import RouteChangeSkeleton from "@/components/RouteChangeSkeleton";
import { Poppins, Roboto } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-poppins",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-roboto",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
          rel="stylesheet"
        />
      </head>

      <body className={`${poppins.variable} ${roboto.variable}`}>
        <Suspense fallback={null}>
          <RouteChangeSkeleton />
        </Suspense>

        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}