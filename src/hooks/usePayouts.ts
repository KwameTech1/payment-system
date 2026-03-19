import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { PayoutRequest } from '@/types';

export const usePayouts = (filters?: { status?: string }) => {
  return useQuery<PayoutRequest[]>({
    queryKey: ['payouts', filters],
    queryFn: () => api.get('/payouts', { params: filters }).then((r) => r.data),
  });
};

export const usePayout = (id: string) => {
  return useQuery<PayoutRequest>({
    queryKey: ['payouts', id],
    queryFn: () => api.get(`/payouts/${id}`).then((r) => r.data),
    refetchInterval: (query) => {
      const data = query.state.data;
      if (data && ['submitted', 'pending'].includes(data.status)) {
        return 30000;
      }
      return false;
    },
    enabled: !!id,
  });
};

export const useCreatePayout = () => {
  const qc = useQueryClient();
  return useMutation<
    PayoutRequest,
    Error,
    { recipientId: string; amount: number; currency?: string; reason?: string }
  >({
    mutationFn: (payload) => api.post('/payouts', payload).then((r) => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['payouts'] }),
  });
};

export const useRetryPayout = () => {
  const qc = useQueryClient();
  return useMutation<PayoutRequest, Error, string>({
    mutationFn: (id) => api.post(`/payouts/${id}/retry`).then((r) => r.data),
    onSuccess: (data) => qc.invalidateQueries({ queryKey: ['payouts', data.id] }),
  });
};

export const useSyncPayoutStatus = () => {
  const qc = useQueryClient();
  return useMutation<PayoutRequest, Error, string>({
    mutationFn: (id) => api.get(`/payouts/${id}/status-sync`).then((r) => r.data),
    onSuccess: (data) => qc.invalidateQueries({ queryKey: ['payouts', data.id] }),
  });
};
