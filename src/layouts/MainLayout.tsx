'use client'

import { Footer, Navbar } from '@/components';
import React, { ReactNode, useEffect } from 'react'

const MainLayout = ({
  children
} : MainLayoutProps) => {
  // TODO: GET USER
  const user = undefined;

  useEffect(() => {
    // LOAD Tawk.to CHAT SCRIPT DYNAMICALLY
    const s1 = document.createElement("script");
    s1.src = "https://embed.tawk.to/603b4cf1385de407571ada35/1evjq93tt";
    s1.async = true;
    s1.charset = "UTF-8";
    s1.setAttribute("crossorigin", "*");

    const s0 = document.getElementsByTagName("script")[0];
    if (s0 && s0.parentNode) {
      s0.parentNode.insertBefore(s1, s0);
    }
  }, []);

  // PAYSTACK SCRIPT
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className='bg-white overflow-y-auto min-h-screen w-full flex flex-col items-center justify-between'>
      <Navbar user={user} />
      <main className='px-[16px] lg:px-[32px] w-full max-w-[1500px] grow-1 h-full md:h-[calc(100vh-208px)] mt-[90px] lg:mt-[138px] flex flex-col'>
        {children}
      </main>
      <Footer />
    </div>
  )
}

export interface MainLayoutProps {
  children: ReactNode;
}

export default MainLayout