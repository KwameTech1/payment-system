import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import type { Client, ClientBalance, PayinTransaction, Settlement } from '@/types';

export const useClients = () =>
  useQuery<Client[]>({
    queryKey: ['clients'],
    queryFn: () => api.get('/clients').then((r) => r.data),
  });

export const useClient = (id: string) =>
  useQuery<Client>({
    queryKey: ['clients', id],
    queryFn: () => api.get(`/clients/${id}`).then((r) => r.data),
    enabled: !!id,
  });

export const useClientBalance = (clientId: string) =>
  useQuery<ClientBalance>({
    queryKey: ['clients', clientId, 'balance'],
    queryFn: () => api.get(`/clients/${clientId}/balance`).then((r) => r.data),
    enabled: !!clientId,
  });

export const useClientTransactions = (clientId: string, params?: Record<string, string>) =>
  useQuery<PayinTransaction[]>({
    queryKey: ['clients', clientId, 'transactions', params],
    queryFn: () => api.get(`/clients/${clientId}/transactions`, { params }).then((r) => r.data),
    enabled: !!clientId,
  });

export const useClientSettlements = (clientId: string, params?: Record<string, string>) =>
  useQuery<Settlement[]>({
    queryKey: ['clients', clientId, 'settlements', params],
    queryFn: () => api.get(`/clients/${clientId}/settlements`, { params }).then((r) => r.data),
    enabled: !!clientId,
  });

export const useUnattributedTransactions = () =>
  useQuery<PayinTransaction[]>({
    queryKey: ['unattributed-transactions'],
    queryFn: () => api.get('/clients/unattributed-transactions').then((r) => r.data),
  });

export const useCreateClient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Client> & { password: string }) => api.post('/clients', data).then((r) => r.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
    },
  });
};

export const useUpdateClient = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (patch: Partial<Client>) => api.patch(`/clients/${id}`, patch).then((r) => r.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      queryClient.invalidateQueries({ queryKey: ['clients', id] });
    },
  });
};

export const useAttributeTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ transactionId, clientId }: { transactionId: string; clientId: string }) =>
      api.patch(`/clients/transactions/${transactionId}/attribute`, { clientId }).then((r) => r.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['unattributed-transactions'] });
    },
  });
};

export const useRetrySettlement = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (settlementId: string) =>
      api.post(`/clients/settlements/${settlementId}/retry`).then((r) => r.data),
    onSuccess: (_data, settlementId) => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      void settlementId;
    },
  });
};
