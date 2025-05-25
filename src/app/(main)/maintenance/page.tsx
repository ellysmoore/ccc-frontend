'use client'

import React, { useEffect, useState } from 'react'

const MaintenanceIndexPage = () => {
  const [timeLeft, setTimeLeft] = useState("Loading...");

  useEffect(() => {
    const countDownDate = new Date("2019-09-26T20:00:00.000Z").getTime();
    
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = countDownDate - now;
      if (distance < 0) {
        setTimeLeft("24 hours");
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft(`${days} Day(s) ${hours} Hours ${minutes} Mins ${seconds}s`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="md:h-full w-full flex items-center justify-center border-1 border-gray-200 shadow-md rounded-2xl bg-white text-gray-800">
      <article className="max-w-2xl flex flex-col gap-[2px] md:gap-[8px] h-fit">
        <h1 className="!text-f24 md:!text-f30 font-bold text-center mb-4 text-[#0D0D12]">
          We’ll be back in <span className="text-orange-600">{timeLeft}</span>!
        </h1>
        <div className="text-f16 md:!text-f18 text-center leading-relaxed text-[#667085]">
          Sorry for the inconvenience but we’re performing some maintenance at the moment. If you need to you can
          always{" "}
          <a
            href="mailto:enquiries@covenantchristiancentre.org"
            className="text-orange-600 hover:text-gray-800"
          >
            contact us
          </a>
          , otherwise we’ll be back online shortly!
        </div>
      </article>
    </section>
  );
}

export default MaintenanceIndexPage