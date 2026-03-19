'use client';

import { useParams } from 'next/navigation';
import ProtectedRoute from '@/components/layout/ProtectedRoute';
import AppShell from '@/components/layout/AppShell';
import Badge from '@/components/ui/Badge';
import {
  useClient,
  useClientBalance,
  useClientTransactions,
  useClientSettlements,
  useRetrySettlement,
} from '@/hooks/useClients';

function BalanceCard({ label, value, currency }: { label: string; value: number; currency: string }) {
  return (
    <div
      style={{
        background: '#fff',
        borderRadius: 8,
        border: '1px solid #e5e7eb',
        padding: '20px 24px',
        flex: 1,
        minWidth: 160,
      }}
    >
      <div style={{ fontSize: 12, color: '#6b7280', fontWeight: 600, marginBottom: 8 }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 700, color: '#1a1a2e' }}>
        {value.toLocaleString(undefined, { minimumFractionDigits: 2 })} {currency}
      </div>
    </div>
  );
}

export default function ClientDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: client, isLoading: clientLoading } = useClient(id);
  const { data: balance } = useClientBalance(id);
  const { data: transactions } = useClientTransactions(id);
  const { data: settlements } = useClientSettlements(id);
  const { mutateAsync: retrySettlement, isPending: retrying } = useRetrySettlement();

  if (clientLoading) {
    return (
      <ProtectedRoute>
        <AppShell>
          <div style={{ color: '#666', fontSize: 14 }}>Loading...</div>
        </AppShell>
      </ProtectedRoute>
    );
  }

  if (!client) {
    return (
      <ProtectedRoute>
        <AppShell>
          <div style={{ color: '#991b1b', fontSize: 14 }}>Client not found</div>
        </AppShell>
      </ProtectedRoute>
    );
  }

  const currency = client.currency;

  return (
    <ProtectedRoute>
      <AppShell>
        <div style={{ maxWidth: 900 }}>
          <div style={{ marginBottom: 24 }}>
            <h1 style={{ margin: '0 0 4px', fontSize: 24, fontWeight: 700, color: '#1a1a2e' }}>
              {client.businessName}
            </h1>
            <div style={{ fontSize: 13, color: '#6b7280' }}>
              {client.clientCode} &middot; {client.email} &middot; {client.mobileOperator}
            </div>
          </div>

          {balance && (
            <div style={{ display: 'flex', gap: 16, marginBottom: 32, flexWrap: 'wrap' }}>
              <BalanceCard label="GROSS RECEIVED" value={balance.grossReceived} currency={currency} />
              <BalanceCard label="TOTAL FEES (2%)" value={balance.totalFees} currency={currency} />
              <BalanceCard label="TOTAL SETTLED" value={balance.totalSettled} currency={currency} />
              <BalanceCard label="AVAILABLE BALANCE" value={balance.availableBalance} currency={currency} />
            </div>
          )}

          {/* Settlements */}
          <div style={{ background: '#fff', borderRadius: 8, border: '1px solid #e5e7eb', marginBottom: 24, overflow: 'hidden' }}>
            <div style={{ padding: '14px 20px', borderBottom: '1px solid #e5e7eb', fontSize: 15, fontWeight: 600 }}>
              Settlements
            </div>
            {!settlements || settlements.length === 0 ? (
              <div style={{ padding: '20px', color: '#666', fontSize: 14 }}>No settlements yet.</div>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                <thead>
                  <tr style={{ background: '#f9fafb' }}>
                    {['DATE', 'GROSS', 'FEE', 'NET', 'STATUS', ''].map((h) => (
                      <th key={h} style={{ padding: '10px 20px', textAlign: 'left', color: '#6b7280', fontWeight: 600, fontSize: 12 }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {settlements.map((s) => (
                    <tr key={s.id} style={{ borderTop: '1px solid #f3f4f6' }}>
                      <td style={{ padding: '12px 20px', color: '#6b7280' }}>{new Date(s.createdAt).toLocaleDateString()}</td>
                      <td style={{ padding: '12px 20px' }}>{Number(s.grossAmount).toLocaleString()} {currency}</td>
                      <td style={{ padding: '12px 20px', color: '#ef4444' }}>{Number(s.feeAmount).toLocaleString()} {currency}</td>
                      <td style={{ padding: '12px 20px', fontWeight: 600 }}>{Number(s.netAmount).toLocaleString()} {currency}</td>
                      <td style={{ padding: '12px 20px' }}><Badge status={s.status} /></td>
                      <td style={{ padding: '12px 20px' }}>
                        {s.status === 'failed' && (
                          <button
                            onClick={() => retrySettlement(s.id)}
                            disabled={retrying}
                            style={{
                              padding: '4px 12px',
                              background: '#1a1a2e',
                              color: '#fff',
                              border: 'none',
                              borderRadius: 4,
                              fontSize: 12,
                              cursor: retrying ? 'not-allowed' : 'pointer',
                              opacity: retrying ? 0.7 : 1,
                            }}
                          >
                            Retry
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Transactions */}
          <div style={{ background: '#fff', borderRadius: 8, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
            <div style={{ padding: '14px 20px', borderBottom: '1px solid #e5e7eb', fontSize: 15, fontWeight: 600 }}>
              Pay-in Transactions
            </div>
            {!transactions || transactions.length === 0 ? (
              <div style={{ padding: '20px', color: '#666', fontSize: 14 }}>No transactions yet.</div>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                <thead>
                  <tr style={{ background: '#f9fafb' }}>
                    {['DATE', 'REFERENCE', 'AMOUNT', 'STATUS'].map((h) => (
                      <th key={h} style={{ padding: '10px 20px', textAlign: 'left', color: '#6b7280', fontWeight: 600, fontSize: 12 }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((t) => (
                    <tr key={t.id} style={{ borderTop: '1px solid #f3f4f6' }}>
                      <td style={{ padding: '12px 20px', color: '#6b7280' }}>{new Date(t.createdAt).toLocaleDateString()}</td>
                      <td style={{ padding: '12px 20px', color: '#374151', fontFamily: 'monospace', fontSize: 12 }}>
                        {t.customerReference ?? t.fincraReference ?? t.id.slice(0, 8)}
                      </td>
                      <td style={{ padding: '12px 20px' }}>{Number(t.amount).toLocaleString()} {t.currency}</td>
                      <td style={{ padding: '12px 20px' }}><Badge status={t.status} /></td>
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
