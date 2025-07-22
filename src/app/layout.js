import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Ebidit",
  description: "A product by Inno Cursor",
};

// 👇 Import the i18n provider
import { dir } from 'i18next';
import { languages } from '../../i18n/settings'; // We'll define this next
import { I18nProvider } from '../../i18n/provider'; // You’ll create this file

export function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export default function RootLayout({ children, params }) {
  const { lng } = params;

  return (
    <html lang={lng}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <I18nProvider lang={lng}>{children}</I18nProvider>
      </body>
    </html>
  );
}
