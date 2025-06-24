// lib/queryAdapter.ts
import { queryClient } from '@/queries/client';
import {
  useQuery as rqUseQuery,
  useMutation as rqUseMutation,
  UseQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query';

export const useQuery = <TData, TError = Error>(
  key: string[],
  fn: () => Promise<TData>,
  options?: UseQueryOptions<TData, TError>
) => {
  return rqUseQuery<TData, TError>({ queryKey: key, queryFn: fn, ...options });
};

export const useMutation = <TData, TError = Error, TVariables = void>(
  fn: (variables: TVariables) => Promise<TData>,
  options?: UseMutationOptions<TData, TError, TVariables>
) => {
  return rqUseMutation<TData, TError, TVariables>({ mutationFn: fn, ...options });
};

export const fetchQuery = <TData, TError = Error>(key: string[], fn: () => Promise<TData>) => {
  return queryClient.fetchQuery<TData, TError>({ queryKey: key, queryFn: fn });
};

export const invalidateCache = async (key: string[]) => {
  return queryClient.invalidateQueries({ queryKey: key });
};
