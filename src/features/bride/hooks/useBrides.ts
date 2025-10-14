import { useState, useCallback } from "react";
import type { Bride } from "../types";
import { API_URL } from "../../../utils/constants";
import { getAuthToken, buildAuthHeaders } from '../../../utils/api/auth-headers';

export function useBrides() {
  const [brides, setBrides] = useState<Bride[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const fetchBrides = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(undefined);
      
      const token = await getAuthToken();
      const authHeaders = buildAuthHeaders(token);

      const response = await fetch(`${API_URL}/brides`, {
        headers: authHeaders,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch brides');
      }
      
      const data = await response.json();
      setBrides(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load brides");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { brides, isLoading, error, fetchBrides } as const;
} 