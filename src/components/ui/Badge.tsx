import { PayoutStatus, RecipientStatus } from '@/types';

const statusColors: Record<string, { bg: string; color: string }> = {
  successful: { bg: '#d1fae5', color: '#065f46' },
  approved: { bg: '#d1fae5', color: '#065f46' },
  failed: { bg: '#fee2e2', color: '#991b1b' },
  rejected: { bg: '#fee2e2', color: '#991b1b' },
  pending: { bg: '#fef3c7', color: '#92400e' },
  submitted: { bg: '#fef3c7', color: '#92400e' },
  queued: { bg: '#e5e7eb', color: '#374151' },
  draft: { bg: '#e5e7eb', color: '#374151' },
  suspended: { bg: '#fee2e2', color: '#991b1b' },
};

interface BadgeProps {
  status: PayoutStatus | RecipientStatus | string;
}

export default function Badge({ status }: BadgeProps) {
  const colors = statusColors[status] || { bg: '#e5e7eb', color: '#374151' };
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '2px 8px',
        borderRadius: 12,
        fontSize: 12,
        fontWeight: 600,
        background: colors.bg,
        color: colors.color,
        textTransform: 'capitalize',
      }}
    >
      {status}
    </span>
  );
}
