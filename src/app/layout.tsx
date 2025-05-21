import type { Metadata } from "next";
import { Roboto /*, Fira_Sans_Condensed*/ } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import { QueryProvider } from "@/providers";
import { Suspense } from "react";
import { Loader } from "@/components/Loader";

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

export default function RootIndexLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.className}>
      <body>
        <Suspense fallback={
            <div className='p-[16px] md:p-[25px] w-full h-screen flex flex-col items-center justify-center '>
              <Loader size="big" />
            </div>
          }
        >
          <QueryProvider>
            <ToastContainer autoClose={5000} position="top-right" closeOnClick />
            <div className='w-full h-full'>
              {children}
            </div>
          </QueryProvider>
        </Suspense>
      </body>
    </html>
  );
}
