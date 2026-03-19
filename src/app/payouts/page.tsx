'use client';

import { useState } from 'react';
import Link from 'next/link';
import ProtectedRoute from '@/components/layout/ProtectedRoute';
import AppShell from '@/components/layout/AppShell';
import Badge from '@/components/ui/Badge';
import { usePayouts } from '@/hooks/usePayouts';
import { PayoutStatus } from '@/types';

const STATUS_OPTIONS: Array<{ label: string; value: string }> = [
  { label: 'All', value: '' },
  { label: 'Queued', value: 'queued' },
  { label: 'Submitted', value: 'submitted' },
  { label: 'Pending', value: 'pending' },
  { label: 'Successful', value: 'successful' },
  { label: 'Failed', value: 'failed' },
];

export default function PayoutsPage() {
  const [statusFilter, setStatusFilter] = useState('');
  const { data: payouts, isLoading } = usePayouts(
    statusFilter ? { status: statusFilter as PayoutStatus } : undefined
  );

  return (
    <ProtectedRoute>
      <AppShell>
        <div style={{ maxWidth: 1000 }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 24,
            }}
          >
            <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: '#1a1a2e' }}>Payouts</h1>
            <Link
              href="/payouts/new"
              style={{
                padding: '9px 18px',
                background: '#1a1a2e',
                color: '#fff',
                borderRadius: 6,
                textDecoration: 'none',
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              + New Payout
            </Link>
          </div>

          <div style={{ marginBottom: 16, display: 'flex', gap: 8 }}>
            {STATUS_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setStatusFilter(opt.value)}
                style={{
                  padding: '5px 12px',
                  borderRadius: 16,
                  fontSize: 13,
                  cursor: 'pointer',
                  border: '1px solid',
                  borderColor: statusFilter === opt.value ? '#1a1a2e' : '#d1d5db',
                  background: statusFilter === opt.value ? '#1a1a2e' : '#fff',
                  color: statusFilter === opt.value ? '#fff' : '#374151',
                  fontWeight: statusFilter === opt.value ? 600 : 400,
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <div
            style={{
              background: '#fff',
              borderRadius: 8,
              border: '1px solid #e5e7eb',
              overflow: 'hidden',
            }}
          >
            {isLoading ? (
              <div style={{ padding: 24, color: '#666' }}>Loading...</div>
            ) : !payouts?.length ? (
              <div style={{ padding: 24, color: '#666', fontSize: 14 }}>
                No payouts found.{' '}
                <Link href="/payouts/new" style={{ color: '#4f8ef7' }}>
                  Create one
                </Link>
                .
              </div>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                <thead>
                  <tr style={{ background: '#f9fafb' }}>
                    {['Reference', 'Recipient', 'Amount', 'Status', 'Date', ''].map((h) => (
                      <th
                        key={h}
                        style={{
                          padding: '10px 16px',
                          textAlign: 'left',
                          color: '#6b7280',
                          fontWeight: 600,
                          fontSize: 12,
                        }}
                      >
                        {h.toUpperCase()}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {payouts.map((p) => (
                    <tr key={p.id} style={{ borderTop: '1px solid #f3f4f6', cursor: 'pointer' }}>
                      <td
                        style={{
                          padding: '12px 16px',
                          fontFamily: 'monospace',
                          fontSize: 12,
                          color: '#6b7280',
                        }}
                      >
                        {p.clientReference.slice(0, 8)}…
                      </td>
                      <td style={{ padding: '12px 16px', fontWeight: 500 }}>
                        {p.recipient?.fullName ?? '—'}
                      </td>
                      <td style={{ padding: '12px 16px', color: '#374151' }}>
                        {Number(p.amount).toLocaleString()} {p.currency}
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <Badge status={p.status} />
                      </td>
                      <td style={{ padding: '12px 16px', color: '#6b7280' }}>
                        {new Date(p.createdAt).toLocaleDateString()}
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <Link
                          href={`/payouts/${p.id}`}
                          style={{ color: '#4f8ef7', fontSize: 13, textDecoration: 'none' }}
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </AppShell>
    </ProtectedRoute>
  );
}
