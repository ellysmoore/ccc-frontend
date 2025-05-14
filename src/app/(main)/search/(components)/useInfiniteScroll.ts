'use client'

import { useEffect } from "react";

export function useInfiniteScroll(
  callback: () => void, 
  hasMore: boolean, 
  loading: boolean
) {
  useEffect(() => {
    function onScroll() {
      if (loading || !hasMore) return;

      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      if (scrollTop + windowHeight + 100 >= docHeight) {
        callback();
      }
    }

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [callback, hasMore, loading]);
}
