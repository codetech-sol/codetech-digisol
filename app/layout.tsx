import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });

export const metadata: Metadata = {
  title: "CodeTech Digital Solutions | Advanced Security & IT Infrastructure",
  description: "Zambia's leading provider for Secure Web Development, HD CCTV Systems, and Robust IT Networking.",
  keywords: ["Web Development Zambia", "CCTV Installation Lusaka", "IT Infrastructure", "Networking Consultation"],
  authors: [{ name: "CodeTech Digital Solutions" }],
  icons: {
    icon: "/images/fav.ico",
  },
  openGraph: {
    title: "CodeTech Digital Solutions | Secure Technology",
    description: "Building and protecting your digital and physical infrastructure.",
    type: "website",
    locale: "en_ZM",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.variable} ${montserrat.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
