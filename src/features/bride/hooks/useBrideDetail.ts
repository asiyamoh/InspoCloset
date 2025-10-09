import { useState, useCallback, useEffect } from "react";
import { API_URL } from "../../../utils/constants";
import type { Bride } from "../types";

export function useBrideDetail(brideId: string) {
  const [bride, setBride] = useState<Bride | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const fetchBrideDetail = useCallback(async () => {
    if (!brideId) {
      setBride(null);
      setError(undefined);
      return;
    }
    
    try {
      setIsLoading(true);
      setError(undefined);
      
      const response = await fetch(`${API_URL}/brides/${brideId}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch bride details');
      }
      
      const data = await response.json();
      setBride(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load bride details");
    } finally {
      setIsLoading(false);
    }
  }, [brideId]);

  // Reset bride when brideId becomes empty
  useEffect(() => {
    if (!brideId) {
      setBride(null);
      setError(undefined);
    }
  }, [brideId]);

  return { bride, isLoading, error, fetchBrideDetail } as const;
}
