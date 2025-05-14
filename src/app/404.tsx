// app/404.tsx or wherever this is being used

import React, { Suspense } from "react";
import NotFoundContent from "./NotFoundContent"; // Adjust the path as needed

export default function NotFoundPage() {
  return (
    <Suspense fallback={null}>
      <NotFoundContent />
    </Suspense>
  );
}
