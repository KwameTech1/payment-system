'use client';

import { useState } from 'react';
import ProtectedRoute from '@/components/layout/ProtectedRoute';
import AppShell from '@/components/layout/AppShell';
import { useUnattributedTransactions, useAttributeTransaction, useClients } from '@/hooks/useClients';

export default function UnattributedPage() {
  const { data: transactions, isLoading, refetch } = useUnattributedTransactions();
  const { data: clients } = useClients();
  const { mutateAsync: attributeTransaction } = useAttributeTransaction();
  const [assignMap, setAssignMap] = useState<Record<string, string>>({});
  const [attributing, setAttributing] = useState<string | null>(null);

  const handleAssign = async (transactionId: string) => {
    const clientId = assignMap[transactionId];
    if (!clientId) { return; }
    setAttributing(transactionId);
    try {
      await attributeTransaction({ transactionId, clientId });
      await refetch();
    } finally {
      setAttributing(null);
    }
  };

  return (
    <ProtectedRoute>
      <AppShell>
        <div style={{ maxWidth: 900 }}>
          <h1 style={{ margin: '0 0 8px', fontSize: 24, fontWeight: 700, color: '#1a1a2e' }}>Unattributed Payments</h1>
          <p style={{ margin: '0 0 24px', color: '#6b7280', fontSize: 14 }}>
            Pay-ins that could not be matched to a client code. Assign them manually below.
          </p>

          <div style={{ background: '#fff', borderRadius: 8, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
            {isLoading ? (
              <div style={{ padding: '24px 20px', color: '#666', fontSize: 14 }}>Loading...</div>
            ) : !transactions || transactions.length === 0 ? (
              <div style={{ padding: '24px 20px', color: '#6b7280', fontSize: 14 }}>
                No unattributed payments.
              </div>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                <thead>
                  <tr style={{ background: '#f9fafb' }}>
                    {['DATE', 'REFERENCE', 'AMOUNT', 'RAW CODE', 'ASSIGN TO'].map((h) => (
                      <th
                        key={h}
                        style={{ padding: '10px 20px', textAlign: 'left', color: '#6b7280', fontWeight: 600, fontSize: 12 }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((t) => (
                    <tr key={t.id} style={{ borderTop: '1px solid #f3f4f6' }}>
                      <td style={{ padding: '12px 20px', color: '#6b7280' }}>
                        {new Date(t.createdAt).toLocaleDateString()}
                      </td>
                      <td style={{ padding: '12px 20px', fontFamily: 'monospace', fontSize: 12, color: '#374151' }}>
                        {t.customerReference ?? t.fincraReference ?? t.id.slice(0, 8)}
                      </td>
                      <td style={{ padding: '12px 20px' }}>
                        {Number(t.amount).toLocaleString()} {t.currency}
                      </td>
                      <td style={{ padding: '12px 20px', fontFamily: 'monospace', fontSize: 12, color: '#ef4444' }}>
                        {t.clientCode ?? '—'}
                      </td>
                      <td style={{ padding: '12px 20px' }}>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                          <select
                            value={assignMap[t.id] ?? ''}
                            onChange={(e) => setAssignMap((prev) => ({ ...prev, [t.id]: e.target.value }))}
                            style={{
                              padding: '6px 10px',
                              border: '1px solid #d1d5db',
                              borderRadius: 4,
                              fontSize: 13,
                            }}
                          >
                            <option value="">Select client...</option>
                            {clients?.map((c) => (
                              <option key={c.id} value={c.id}>
                                {c.businessName} ({c.clientCode})
                              </option>
                            ))}
                          </select>
                          <button
                            onClick={() => handleAssign(t.id)}
                            disabled={!assignMap[t.id] || attributing === t.id}
                            style={{
                              padding: '6px 14px',
                              background: '#1a1a2e',
                              color: '#fff',
                              border: 'none',
                              borderRadius: 4,
                              fontSize: 13,
                              cursor: !assignMap[t.id] || attributing === t.id ? 'not-allowed' : 'pointer',
                              opacity: !assignMap[t.id] || attributing === t.id ? 0.6 : 1,
                            }}
                          >
                            {attributing === t.id ? 'Assigning...' : 'Assign'}
                          </button>
                        </div>
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
