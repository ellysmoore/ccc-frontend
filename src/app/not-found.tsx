"use client";

import React, { Suspense } from "react";
import NotFoundContent from "./NotFoundContent";

const NotFoundPage = () => {
  return (
    // <Suspense fallback={null}>
      <NotFoundContent />
    // </Suspense>
  );
};

export default NotFoundPage;
