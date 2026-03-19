'use client';

import Link from 'next/link';
import ProtectedRoute from '@/components/layout/ProtectedRoute';
import AppShell from '@/components/layout/AppShell';
import Badge from '@/components/ui/Badge';
import { usePayouts } from '@/hooks/usePayouts';
import { useAuth } from '@/context/AuthContext';

export default function DashboardPage() {
  const { user } = useAuth();
  const { data: payouts, isLoading } = usePayouts();

  const recent = payouts?.slice(0, 5) ?? [];

  return (
    <ProtectedRoute>
      <AppShell>
        <div style={{ maxWidth: 800 }}>
          <h1 style={{ margin: '0 0 4px', fontSize: 24, fontWeight: 700, color: '#1a1a2e' }}>
            Dashboard
          </h1>
          <p style={{ margin: '0 0 32px', color: '#666', fontSize: 14 }}>
            Welcome back, {user?.fullName}
          </p>

          <div style={{ display: 'flex', gap: 16, marginBottom: 32 }}>
            <Link
              href="/payouts/new"
              style={{
                display: 'inline-block',
                padding: '10px 20px',
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
            <Link
              href="/recipients"
              style={{
                display: 'inline-block',
                padding: '10px 20px',
                background: '#fff',
                color: '#1a1a2e',
                borderRadius: 6,
                textDecoration: 'none',
                fontSize: 14,
                fontWeight: 600,
                border: '1px solid #d1d5db',
              }}
            >
              Manage Recipients
            </Link>
          </div>

          <div
            style={{
              background: '#fff',
              borderRadius: 8,
              border: '1px solid #e5e7eb',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                padding: '16px 20px',
                borderBottom: '1px solid #e5e7eb',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <h2 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: '#1a1a2e' }}>
                Recent Payouts
              </h2>
              <Link
                href="/payouts"
                style={{ fontSize: 13, color: '#4f8ef7', textDecoration: 'none' }}
              >
                View all
              </Link>
            </div>

            {isLoading ? (
              <div style={{ padding: '24px 20px', color: '#666', fontSize: 14 }}>Loading...</div>
            ) : recent.length === 0 ? (
              <div style={{ padding: '24px 20px', color: '#666', fontSize: 14 }}>
                No payouts yet.{' '}
                <Link href="/payouts/new" style={{ color: '#4f8ef7' }}>
                  Create one
                </Link>
                .
              </div>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                <thead>
                  <tr style={{ background: '#f9fafb' }}>
                    <th
                      style={{
                        padding: '10px 20px',
                        textAlign: 'left',
                        color: '#6b7280',
                        fontWeight: 600,
                        fontSize: 12,
                      }}
                    >
                      RECIPIENT
                    </th>
                    <th
                      style={{
                        padding: '10px 20px',
                        textAlign: 'left',
                        color: '#6b7280',
                        fontWeight: 600,
                        fontSize: 12,
                      }}
                    >
                      AMOUNT
                    </th>
                    <th
                      style={{
                        padding: '10px 20px',
                        textAlign: 'left',
                        color: '#6b7280',
                        fontWeight: 600,
                        fontSize: 12,
                      }}
                    >
                      STATUS
                    </th>
                    <th
                      style={{
                        padding: '10px 20px',
                        textAlign: 'left',
                        color: '#6b7280',
                        fontWeight: 600,
                        fontSize: 12,
                      }}
                    >
                      DATE
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recent.map((p) => (
                    <tr key={p.id} style={{ borderTop: '1px solid #f3f4f6' }}>
                      <td style={{ padding: '12px 20px', color: '#111' }}>
                        <Link
                          href={`/payouts/${p.id}`}
                          style={{ color: '#1a1a2e', textDecoration: 'none', fontWeight: 500 }}
                        >
                          {p.recipient?.fullName ?? '—'}
                        </Link>
                      </td>
                      <td style={{ padding: '12px 20px', color: '#374151' }}>
                        {Number(p.amount).toLocaleString()} {p.currency}
                      </td>
                      <td style={{ padding: '12px 20px' }}>
                        <Badge status={p.status} />
                      </td>
                      <td style={{ padding: '12px 20px', color: '#6b7280' }}>
                        {new Date(p.createdAt).toLocaleDateString()}
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
