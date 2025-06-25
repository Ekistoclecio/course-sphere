import { useErrorHandler } from '@/hooks/useErrorHandler';
import { paginationResultsReducer } from '@/reducers/paginationResults';
import { PaginationRequest, PaginationResponse } from '@/services/interfaces';
import { useEffect, useMemo, useReducer, useState } from 'react';

interface UsePaginationProps<T> {
  fetchFunction: (
    params: PaginationRequest
  ) => Promise<{ results: T[]; pagination: PaginationResponse }>;
  initialOffset?: number;
  initialLimit?: number;
}

export const usePagination = <T extends { id: number | string }>({
  fetchFunction,
  initialOffset = 0,
  initialLimit = 12,
}: UsePaginationProps<T>) => {
  const { errorHandler } = useErrorHandler();
  const [offset, setOffset] = useState(initialOffset);
  const [limit, setLimit] = useState(initialLimit);
  const [total, setTotal] = useState(0);
  const [results, dispatchResults] = useReducer(paginationResultsReducer<T>, []);
  const [isLoading, setIsLoading] = useState(true);

  const page = useMemo(() => Math.floor(offset / limit) + 1, [offset, limit]);
  const totalPages = useMemo(() => Math.ceil(total / limit), [total, limit]);

  const fetchData = async (offset: number, limit: number, resetResults = true) => {
    try {
      setIsLoading(true);
      const response = await fetchFunction({ offset, limit });
      if (resetResults) {
        dispatchResults({ type: 'SET_ALL', payload: response.results });
      } else {
        dispatchResults({ type: 'APPEND', payload: response.results });
      }
      setTotal(response.pagination.total || 0);
      setOffset(response.pagination.offset || 0);
      setLimit(limit);
    } catch (error) {
      errorHandler(error);
    } finally {
      setIsLoading(false);
    }
  };

  const goToPage = async (pageNumber: number) => {
    const newOffset = (pageNumber - 1) * limit;
    await fetchData(newOffset, limit);
  };

  const goToOffset = async ({
    offset: newOffset,
    limit: newLimit = limit,
  }: {
    offset: number;
    limit?: number;
  }) => {
    await fetchData(newOffset, newLimit, false);
  };

  const removeItemResult = (id: number | string) => {
    dispatchResults({ type: 'REMOVE', id });
  };

  const updateItemResult = (item: T) => {
    dispatchResults({ type: 'UPDATE', payload: item });
  };

  useEffect(() => {
    fetchData(offset, limit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    results,
    page,
    limit,
    total,
    offset,
    isLoading,
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
    fetchData,
    goToPage,
    goToOffset,
    removeItemResult,
    updateItemResult,
  };
};
