import React, { Suspense } from "react";
import NotFoundContent from "./NotFoundContent"; // Adjust the path as needed

export default function NotFoundPage() {
  return (
    <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
      <NotFoundContent />
    </Suspense>
  );
}
