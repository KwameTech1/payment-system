'use client';

import Link from 'next/link';
import ProtectedRoute from '@/components/layout/ProtectedRoute';
import AppShell from '@/components/layout/AppShell';
import { useClients } from '@/hooks/useClients';

export default function ClientsPage() {
  const { data: clients, isLoading } = useClients();

  return (
    <ProtectedRoute>
      <AppShell>
        <div style={{ maxWidth: 900 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700, color: '#1a1a2e' }}>Clients</h1>
            <Link
              href="/clients/new"
              style={{
                padding: '10px 20px',
                background: '#1a1a2e',
                color: '#fff',
                borderRadius: 6,
                textDecoration: 'none',
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              + Add Client
            </Link>
          </div>

          <div style={{ background: '#fff', borderRadius: 8, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
            {isLoading ? (
              <div style={{ padding: '24px 20px', color: '#666', fontSize: 14 }}>Loading...</div>
            ) : !clients || clients.length === 0 ? (
              <div style={{ padding: '24px 20px', color: '#666', fontSize: 14 }}>
                No clients yet.{' '}
                <Link href="/clients/new" style={{ color: '#4f8ef7' }}>
                  Add one
                </Link>
                .
              </div>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                <thead>
                  <tr style={{ background: '#f9fafb' }}>
                    {['BUSINESS', 'CODE', 'EMAIL', 'OPERATOR', 'CURRENCY', 'STATUS', ''].map((h) => (
                      <th
                        key={h}
                        style={{
                          padding: '10px 20px',
                          textAlign: 'left',
                          color: '#6b7280',
                          fontWeight: 600,
                          fontSize: 12,
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {clients.map((c) => (
                    <tr key={c.id} style={{ borderTop: '1px solid #f3f4f6' }}>
                      <td style={{ padding: '12px 20px', fontWeight: 500, color: '#111' }}>{c.businessName}</td>
                      <td style={{ padding: '12px 20px', color: '#374151', fontFamily: 'monospace' }}>
                        {c.clientCode}
                      </td>
                      <td style={{ padding: '12px 20px', color: '#374151' }}>{c.email}</td>
                      <td style={{ padding: '12px 20px', color: '#374151' }}>{c.mobileOperator}</td>
                      <td style={{ padding: '12px 20px', color: '#374151' }}>{c.currency}</td>
                      <td style={{ padding: '12px 20px' }}>
                        <span
                          style={{
                            padding: '2px 8px',
                            borderRadius: 12,
                            fontSize: 12,
                            fontWeight: 600,
                            background: c.isActive ? '#d1fae5' : '#fee2e2',
                            color: c.isActive ? '#065f46' : '#991b1b',
                          }}
                        >
                          {c.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td style={{ padding: '12px 20px' }}>
                        <Link href={`/clients/${c.id}`} style={{ color: '#4f8ef7', textDecoration: 'none', fontSize: 13 }}>
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
