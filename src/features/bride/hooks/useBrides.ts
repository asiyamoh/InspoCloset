import { useEffect, useState } from "react";
import type { Bride } from "../types";
import { mockBrides } from "../data/mockBrides";

export function useBrides() {
  const [brides, setBrides] = useState<Bride[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    let isMounted = true;
    try {
      // Simulate async fetch for now
      const timer = setTimeout(() => {
        if (!isMounted) return;
        setBrides(mockBrides);
        setIsLoading(false);
      }, 100);
      return () => {
        isMounted = false;
        clearTimeout(timer);
      };
    } catch (e) {
      setError("Failed to load brides");
      setIsLoading(false);
    }
  }, []);

  return { brides, isLoading, error } as const;
} 