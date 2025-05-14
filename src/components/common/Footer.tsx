"use client";

import Image from "next/image";
import Link from "next/link";
import { FaTwitter, FaFacebookF, FaYoutube } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className="w-full bg-white">
      <div className="w-full flex flex-col items-center pb-[10px]">
        <div className="w-full max-w-[1500px] px-[16px] lg:px-[32px] flex flex-wrap py-[30px]">
          {/* LOGO AND SOCIAL LINKS */}
          <div className="w-full md:w-1/2 lg:w-1/4 mb-8 lg:mb-0">
            <Image
              src="/images/logo.png"
              alt="Covenant Christian Centre Logo"
              width={96}
              height={100}
              className="mb-4 w-24"
            />
            <ul className="flex gap-4 mt-6">
              <li>
                <Link
                  href="https://www.twitter.com/CovenantCCentre"
                  target="_blank"
                  rel="noreferrer"
                  title="Twitter"
                  className="text-[#666D80] hover:text-[#0D0D12] text-[20px]"
                >
                  <FaTwitter />
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.facebook.com/CovenantChristianCentre"
                  target="_blank"
                  rel="noreferrer"
                  title="Facebook"
                  className="text-[#666D80] hover:text-[#0D0D12] text-[20px]"
                >
                  <FaFacebookF />
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.youtube.com/theplatformng"
                  target="_blank"
                  rel="noreferrer"
                  title="YouTube"
                  className="text-[#666D80] hover:text-[#0D0D12] text-[20px]"
                >
                  <FaYoutube />
                </Link>
              </li>
            </ul>
          </div>

          {/* MAINLAND SERVICE INFO */}
          <div className="w-full md:w-1/2 lg:w-1/4 mb-8 lg:mb-0">
            <h6 className="text-f14 text-[#0D0D12] font-bold uppercase mb-4">Mainland Sunday & Midweek Service</h6>
            <small className="text-[#666D80] text-f14">
              400, Herbert Macaulay Way, Yaba Lagos - 6:30am & 9:30am The Covenant Place, Iganmu, Lagos - 7:45am &
              10:30am. Midweek Service - Wednesday: 6:30pm @ 400, Herbert Macaulay Road, Yaba Lagos.
            </small>
          </div>

          {/* ISLAND SERVICE INFO */}
          <div className="w-full md:w-1/2 lg:w-1/4 mb-8 lg:mb-0">
            <h6 className="text-f14 text-[#0D0D12] font-bold uppercase mb-4">Island Sunday & Midweek Service</h6>
            <small className="text-[#666D80] text-f14">
              Former 4th roundabout behind Enyo filling station, Chisco Busstop, Lekki - 8:00am & 10:30am. Midweek
              Service - Thursday: 6:30pm.
            </small>
          </div>

          {/* CONTACT INFO */}
          <div className="w-full md:w-1/2 lg:w-1/4">
            <h6 className="text-f14 text-[#0D0D12] font-bold uppercase mb-4">Contact Info</h6>
            <small className="text-[#666D80] text-f14">
              0818 600 0021, 0818-841-1111 (9:00am - 5:00pm) <br />
              enquiries@covenantchristiancentre.org <br />
              WhatsApp: +2348186000027
            </small>
          </div>
        </div>

        <hr className="w-full py-[35px] border-[#E4E7EC]" />
      </div>
    </footer>
  );
}
