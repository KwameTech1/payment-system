'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import ProtectedRoute from '@/components/layout/ProtectedRoute';
import AppShell from '@/components/layout/AppShell';
import Badge from '@/components/ui/Badge';
import { usePayout, useRetryPayout, useSyncPayoutStatus } from '@/hooks/usePayouts';

export default function PayoutDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: payout, isLoading, isError } = usePayout(id);
  const retryMutation = useRetryPayout();
  const syncMutation = useSyncPayoutStatus();

  const handleRetry = async () => {
    await retryMutation.mutateAsync(id);
  };

  const handleSync = async () => {
    await syncMutation.mutateAsync(id);
  };

  return (
    <ProtectedRoute>
      <AppShell>
        <div style={{ maxWidth: 640 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <Link
              href="/payouts"
              style={{ color: '#4f8ef7', fontSize: 14, textDecoration: 'none' }}
            >
              ← Payouts
            </Link>
          </div>

          {isLoading && <div style={{ color: '#666', padding: 24 }}>Loading...</div>}
          {isError && <div style={{ color: '#991b1b', padding: 24 }}>Failed to load payout.</div>}

          {payout && (
            <>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: 24,
                }}
              >
                <div>
                  <h1
                    style={{ margin: '0 0 6px', fontSize: 20, fontWeight: 700, color: '#1a1a2e' }}
                  >
                    Payout Detail
                  </h1>
                  <code style={{ fontSize: 12, color: '#6b7280' }}>{payout.clientReference}</code>
                </div>
                <Badge status={payout.status} />
              </div>

              <div
                style={{
                  background: '#fff',
                  borderRadius: 8,
                  border: '1px solid #e5e7eb',
                  padding: 24,
                  marginBottom: 20,
                }}
              >
                <h2 style={{ margin: '0 0 16px', fontSize: 15, fontWeight: 600 }}>
                  Payout Details
                </h2>
                {[
                  ['Recipient', payout.recipient?.fullName],
                  [
                    'Phone',
                    `${payout.recipient?.phoneNumber} (${payout.recipient?.mobileOperator})`,
                  ],
                  ['Country', payout.recipient?.countryCode],
                  ['Amount', `${Number(payout.amount).toLocaleString()} ${payout.currency}`],
                  ['Reason', payout.reason || '—'],
                  ['Status', payout.status],
                  ['Fincra Reference', payout.fincraReference || '—'],
                  ['Fincra Status', payout.fincraStatus || '—'],
                  ['Retry Count', String(payout.retryCount)],
                  ['Created', new Date(payout.createdAt).toLocaleString()],
                  [
                    'Submitted',
                    payout.submittedAt ? new Date(payout.submittedAt).toLocaleString() : '—',
                  ],
                  ['Settled', payout.settledAt ? new Date(payout.settledAt).toLocaleString() : '—'],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '8px 0',
                      fontSize: 14,
                      borderBottom: '1px solid #f3f4f6',
                    }}
                  >
                    <span style={{ color: '#6b7280' }}>{label}</span>
                    <span
                      style={{
                        fontWeight: 500,
                        color: '#111',
                        maxWidth: '60%',
                        textAlign: 'right',
                      }}
                    >
                      {value}
                    </span>
                  </div>
                ))}
              </div>

              {payout.failureReason && (
                <div
                  style={{
                    background: '#fee2e2',
                    border: '1px solid #fca5a5',
                    borderRadius: 6,
                    padding: '12px 16px',
                    marginBottom: 20,
                    fontSize: 14,
                    color: '#991b1b',
                  }}
                >
                  <strong>Failure reason:</strong> {payout.failureReason}
                </div>
              )}

              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {payout.status === 'failed' && (
                  <button
                    onClick={handleRetry}
                    disabled={retryMutation.isPending}
                    style={{
                      padding: '9px 18px',
                      background: '#1a1a2e',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 6,
                      cursor: 'pointer',
                      fontSize: 14,
                      fontWeight: 600,
                    }}
                  >
                    {retryMutation.isPending ? 'Retrying...' : 'Retry Payout'}
                  </button>
                )}

                {['submitted', 'pending'].includes(payout.status) && (
                  <button
                    onClick={handleSync}
                    disabled={syncMutation.isPending}
                    style={{
                      padding: '9px 18px',
                      background: '#fff',
                      color: '#374151',
                      border: '1px solid #d1d5db',
                      borderRadius: 6,
                      cursor: 'pointer',
                      fontSize: 14,
                    }}
                  >
                    {syncMutation.isPending ? 'Syncing...' : 'Sync Status'}
                  </button>
                )}
              </div>

              {['submitted', 'pending'].includes(payout.status) && (
                <p style={{ marginTop: 12, fontSize: 12, color: '#6b7280' }}>
                  Status refreshes automatically every 30 seconds.
                </p>
              )}
            </>
          )}
        </div>
      </AppShell>
    </ProtectedRoute>
  );
}
