import { useState } from 'react';
import { ApiResponse } from '@/types/api';

type ReturnType<T> = {
  isLoading: boolean;
  fetchData: (url: string, options: object) => Promise<(ApiResponse & T) | null>;
  error: string | null;
};

export function useFetch<T>(): ReturnType<T> {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const fetchData = async (url: string, options = {}): Promise<(ApiResponse & T) | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(url, options);

      const result = (await response.json()) as ApiResponse & T;
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
