//https://usehooks-ts.com/react-hook/use-media-query

import { useEffect, useState } from "react";
function useMediaQuery(query: string): boolean {
  const getMatches = (query: string): boolean => {
    // Prevents SSR issues
    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches;
    }
    // default render as mobile on the server
    return false;
  };

  const [matches, setMatches] = useState<boolean>(getMatches(query));

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function handleChange() {
    setMatches(getMatches(query));
  }

  const isSsr = typeof window === "undefined";

  useEffect(() => {
    const matchMedia = window.matchMedia(query);

    // Triggered at the first client-side load and if query changes
    handleChange();

    // Listen matchMedia
    matchMedia.addEventListener("change", handleChange);

    return () => {
      matchMedia.removeEventListener("change", handleChange);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, isSsr]);

  return matches;
}

export default useMediaQuery;
