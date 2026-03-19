import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { Recipient } from '@/types';

export const useRecipients = (filters?: { status?: string }) => {
  return useQuery<Recipient[]>({
    queryKey: ['recipients', filters],
    queryFn: () => api.get('/recipients', { params: filters }).then((r) => r.data),
  });
};

export const useCreateRecipient = () => {
  const qc = useQueryClient();
  return useMutation<Recipient, Error, Partial<Recipient>>({
    mutationFn: (payload) => api.post('/recipients', payload).then((r) => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['recipients'] }),
  });
};

export const useUpdateRecipient = () => {
  const qc = useQueryClient();
  return useMutation<
    Recipient,
    Error,
    { id: string; data: Partial<Recipient> & { status?: string } }
  >({
    mutationFn: ({ id, data }) => api.patch(`/recipients/${id}`, data).then((r) => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['recipients'] }),
  });
};
