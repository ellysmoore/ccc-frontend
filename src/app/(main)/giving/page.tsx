'use client'

import { Loader } from "@/components/Loader";
import { useEffect } from "react";

const GivingIndexPage = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.replace('https://www.insightsforliving.org/giving/');
    }, 2000);
  
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-full flex items-center justify-center w-full">
      <Loader size="big" />
    </div>

    // <section className="pt-5">
    //   <div className="mb-4 animate-fadeIn">
    //     <div id="accordion">
    //       <div className="flex">
    //         <h4 className="text-xl font-semibold">Giving</h4>
    //       </div>
    //       <hr className="my-4 border-gray-300" />

    //       <div className="mb-3">
    //         <p className="text-lg font-medium mb-4">In order to give locally, here are the account details</p>
    //         <dl className="space-y-4">
    //           <div>
    //             <dt className="font-semibold">Guaranty Trust Bank</dt>
    //             <dd>Account Name: Covenant Christian World Assembly (Covenant Christian Centre)</dd>
    //             <dd>Account Number: 0010471264</dd>
    //             <dd>Branch: Alagomeji, Yaba</dd>
    //           </div>

    //           <div>
    //             <dt className="font-semibold">Zenith Bank</dt>
    //             <dd>Account Name: Covenant Christian World Assembly (Covenant Christian Centre)</dd>
    //             <dd>Account Number: 1010845720</dd>
    //             <dd>Sort Code: 057150424</dd>
    //             <dd>Branch: Alagomeji, Yaba</dd>
    //           </div>

    //           <div>
    //             <dt className="font-semibold">Stanbic IBTC Bank</dt>
    //             <dd>Account Name: Covenant Christian World Assembly</dd>
    //             <dd>Account Number: 0003699923</dd>
    //             <dd>Branch: Alagomeji, Yaba</dd>
    //           </div>
    //         </dl>

    //         <p className="text-lg font-medium mt-6 mb-4">In order to give internationally, here are the account details</p>
    //         <dl className="space-y-4">
    //           <div>
    //             <dt className="font-semibold">US DOLLARS</dt>
    //             <dd>Intermediary Bank: CitiBank, New York.</dd>
    //             <dd>Swift Code: CITIUS33</dd>
    //             <dd>FED WIRE/ABA Number: 021000089</dd>
    //             <dd>For Credit of Guaranty Trust Bank, Plc, Lagos Nigeria. Swift Code: GTBINGLA. Account Number: 36129295</dd>
    //             <dd>For Credit of Covenant Christian World Assembly (Covenant Christian Centre) Beneficiary Account Number: 0114030385</dd>
    //           </div>

    //           <div>
    //             <dt className="font-semibold">GBP POUNDS</dt>
    //             <dd>Intermediary Bank: CitiBank, London</dd>
    //             <dd>Swift Code: CITIGB2L</dd>
    //             <dd>Sort Code: 185008</dd>
    //             <dd>For Credit of Guaranty Trust Bank, Plc, Lagos Nigeria.</dd>
    //             <dd>Swift Code: GTBINGLA</dd>
    //             <dd>GTBank’s Account No with CITIBANK, London/IBAN: GB67 CITI 1850 0805 5116 15</dd>
    //             <dd>For Credit of Covenant Christian World Assembly (Covenant Christian Centre) Beneficiary Account Number: 0115566627</dd>
    //           </div>

    //           <div>
    //             <dt className="font-semibold">EURO</dt>
    //             <dd>Intermediary Bank: CitiBank, Europe Plc.</dd>
    //             <dd>Swift Code: CITIIE2X</dd>
    //             <dd>Correspondent Bank: CITI London</dd>
    //             <dd>Swift Code: CITIGB2L</dd>
    //             <dd>Sort Code: 185008</dd>
    //             <dd>For Credit of Guaranty Trust Bank, Plc, Lagos Nigeria.</dd>
    //             <dd>Swift Code: GTBINGLA</dd>
    //             <dd>GTBank’s Account No with CITIBANK, Europe Plc./IBAN: GB05 CITI 1850 0810 8205 71</dd>
    //             <dd>For Credit of Covenant Christian World Assembly (Covenant Christian Centre) Beneficiary Account Number: 0220881228</dd>
    //           </div>
    //         </dl>
    //       </div>
    //     </div>
    //   </div>
    // </section>
  )
}

export default GivingIndexPage