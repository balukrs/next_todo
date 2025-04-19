import { useState } from 'react';
import { ApiResponse } from '@/types/api';

type ReturnType = {
  isLoading: boolean;
  fetchData: (url: string, options: object) => Promise<ApiResponse | null>;
  error: string | null;
};

export function useFetch(): ReturnType {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const fetchData = async (url: string, options = {}): Promise<ApiResponse | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(url, options);

      const result = (await response.json()) as ApiResponse;
      return result;
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, fetchData };
}
