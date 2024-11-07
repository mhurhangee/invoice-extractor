import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { GitBranchIcon } from "lucide-react";

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
  title: "Invoice Extractor",
  description: "Extract information from PDF invoices using AI",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📄</text></svg>", type: "image/svg+xml" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100`}
      >
        {children}
        <footer className="mt-8 text-center text-sm text-gray-500">
          <p>
            Open source project available on{" "}
            <a
              href="https://github.com/mhurhangee/invoice-extractor"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            > Github
              <GitBranchIcon className="w-4 h-4 inline-block" />
            </a>
          </p>
        </footer>
      </body>
    </html>
  );
}