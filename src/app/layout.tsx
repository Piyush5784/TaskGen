import { SessionP } from "@/components/providers/session-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { StoreProvider } from "@/providers/store-provider";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "TaskGen",
  description:
    "A modern and responsive dashboard application to manage organizations, projects, and tasks.",
  openGraph: {
    title: "TaskGen",
    description:
      "Manage organizations, projects, and tasks efficiently with our modern dashboard application.",
    url: "https://task-gen.netlify.app/",
    siteName: "TaskGen",
    images: [
      {
        url: "https://task-gen.netlify.app/image.png",
        width: 1200,
        height: 630,
        alt: "TaskGen - Manage your projects and tasks",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TaskGen",
    description:
      "Manage organizations, projects, and tasks efficiently with our modern dashboard application.",
    images: ["https://task-gen.netlify.app/image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <StoreProvider>
          <SessionP>
            <Toaster richColors />
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </SessionP>
        </StoreProvider>
      </body>
    </html>
  );
}
