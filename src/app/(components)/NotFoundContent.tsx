'use client';

import { Button } from "@/components/Button";
// import { useSearchParams } from "next/navigation";
import React from "react";

const NotFoundContent = () => {
  // const searchParams = useSearchParams();
  // const error = searchParams.get("error");

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col items-center justify-center text-center space-y-6">
        <h1 className="text-3xl font-bold text-primary">Page Not Found</h1>
        {/* {error && (
          <p className="text-red-600 text-sm">
            Reason: <span className="font-medium">{error}</span>
          </p>
        )} */}
        <Button href="/" label="GO HOME" containerClassName="!w-fit" />
      </div>
    </div>
  );
};

export default NotFoundContent;
