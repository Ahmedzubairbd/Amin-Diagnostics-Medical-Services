import { useState, useEffect } from 'react';

interface UsePayloadOptions {
  collection: string;
  id?: string;
  limit?: number;
  page?: number;
  where?: any;
}

interface PayloadResponse<T> {
  docs?: T[];
  doc?: T;
  totalDocs?: number;
  totalPages?: number;
  page?: number;
  hasNextPage?: boolean;
  hasPrevPage?: boolean;
}

export function usePayload<T = any>({ collection, id, limit = 10, page = 1, where }: UsePayloadOptions) {
  const [data, setData] = useState<PayloadResponse<T> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams({
        collection,
        ...(id && { id }),
        ...(limit && { limit: limit.toString() }),
        ...(page && { page: page.toString() }),
        ...(where && { where: JSON.stringify(where) }),
      });

      const response = await fetch(`/api/payload?${params}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [collection, id, limit, page, JSON.stringify(where)]);

  const create = async (newData: Partial<T>) => {
    try {
      const response = await fetch('/api/payload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          collection,
          data: newData,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      await fetchData(); // Refresh data
      return result;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Create failed');
    }
  };

  const update = async (updateId: string, updateData: Partial<T>) => {
    try {
      const response = await fetch('/api/payload', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          collection,
          id: updateId,
          data: updateData,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      await fetchData(); // Refresh data
      return result;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Update failed');
    }
  };

  const remove = async (deleteId: string) => {
    try {
      const response = await fetch(`/api/payload?collection=${collection}&id=${deleteId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      await fetchData(); // Refresh data
      return result;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Delete failed');
    }
  };

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    create,
    update,
    remove,
  };
}