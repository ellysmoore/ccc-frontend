import type { Metadata } from "next";
import { Roboto /*, Fira_Sans_Condensed*/ } from "next/font/google";
import "./globals.css";
import MainLayout from "@/layouts/MainLayout";
import { QueryProvider } from "@/providers";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-roboto",
});

// const firaSansCondensed = Fira_Sans_Condensed({
//   subsets: ["latin"],
//   weight: ["400", "500", "600", "700", "800"],
//   variable: "--font-fira-sans-condensed",
// });

export const metadata: Metadata = {
  title: "Insights For Living | Powered by Covenant Christian Centre",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.className}>
      <body>
        <QueryProvider>
          <MainLayout>
            {children}
          </MainLayout>
        </QueryProvider>
      </body>
    </html>
  );
}
