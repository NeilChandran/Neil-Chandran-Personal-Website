import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Libre_Baskerville } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"], variable: "--font-geist" })
const _geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })
const libreBaskerville = Libre_Baskerville({ 
  subsets: ["latin"], 
  weight: ["400", "700"],
  variable: "--font-serif"
})

export const metadata: Metadata = {
  title: "Neil Chandran - Stanford Student",
  description: "Personal website of Neil Chandran, Stanford Class of 2029",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  // If the owl flyover is about to play (first open this
                  // session), paint the Gotham night from the very first
                  // frame instead of the normal theme.
                  var flightPending = false;
                  try {
                    flightPending = sessionStorage.getItem('hedwig-owl-flown') !== '1' &&
                      !(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
                  } catch (e) {}
                  if (flightPending) {
                    document.documentElement.classList.add('dark', 'hedwig-night');
                    return;
                  }
                  var theme = localStorage.getItem('theme');
                  if (theme === 'light') {
                    document.documentElement.classList.remove('dark');
                  } else {
                    document.documentElement.classList.add('dark');
                    if (!theme) {
                      localStorage.setItem('theme', 'dark');
                    }
                  }
                } catch (e) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className={`${libreBaskerville.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
