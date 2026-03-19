'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/layout/ProtectedRoute';
import AppShell from '@/components/layout/AppShell';
import { useRecipients } from '@/hooks/useRecipients';
import { useCreatePayout } from '@/hooks/usePayouts';
import { Recipient } from '@/types';

export default function NewPayoutPage() {
  const router = useRouter();
  const { data: recipients, isLoading: loadingRecipients } = useRecipients({ status: 'approved' });
  const createMutation = useCreatePayout();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedRecipient, setSelectedRecipient] = useState<Recipient | null>(null);
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');

  const inputStyle = {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #d1d5db',
    borderRadius: 6,
    fontSize: 14,
    boxSizing: 'border-box' as const,
  };

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRecipient) {
      return;
    }
    setStep(2);
  };

  const handleStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0) {
      setError('Enter a valid amount');
      return;
    }
    setError('');
    setStep(3);
  };

  const handleSubmit = async () => {
    if (!selectedRecipient) {
      return;
    }
    setError('');
    try {
      const payout = await createMutation.mutateAsync({
        recipientId: selectedRecipient.id,
        amount: Number(amount),
        currency: selectedRecipient.currency,
        reason: reason || undefined,
      });
      router.push(`/payouts/${payout.id}`);
    } catch (err: unknown) {
      setError(
        (err as { response?: { data?: { error?: string } } }).response?.data?.error ||
          'Failed to create payout'
      );
      setStep(2);
    }
  };

  return (
    <ProtectedRoute>
      <AppShell>
        <div style={{ maxWidth: 560 }}>
          <h1 style={{ margin: '0 0 8px', fontSize: 22, fontWeight: 700, color: '#1a1a2e' }}>
            New Payout
          </h1>
          <div style={{ display: 'flex', gap: 8, marginBottom: 28 }}>
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 13,
                  fontWeight: 600,
                  background: step === s ? '#1a1a2e' : step > s ? '#065f46' : '#e5e7eb',
                  color: step >= s ? '#fff' : '#6b7280',
                }}
              >
                {step > s ? '✓' : s}
              </div>
            ))}
          </div>

          <div
            style={{
              background: '#fff',
              borderRadius: 8,
              border: '1px solid #e5e7eb',
              padding: 28,
            }}
          >
            {step === 1 && (
              <form onSubmit={handleStep1}>
                <h2 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 600 }}>
                  Select Recipient
                </h2>
                {loadingRecipients ? (
                  <div style={{ color: '#666', fontSize: 14 }}>Loading approved recipients...</div>
                ) : !recipients?.length ? (
                  <div style={{ color: '#666', fontSize: 14 }}>
                    No approved recipients found. Approve a recipient first.
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {recipients.map((r) => (
                      <label
                        key={r.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 12,
                          padding: '12px 14px',
                          border: `2px solid ${selectedRecipient?.id === r.id ? '#1a1a2e' : '#e5e7eb'}`,
                          borderRadius: 6,
                          cursor: 'pointer',
                          background: selectedRecipient?.id === r.id ? '#f8f9ff' : '#fff',
                        }}
                      >
                        <input
                          type="radio"
                          name="recipient"
                          value={r.id}
                          checked={selectedRecipient?.id === r.id}
                          onChange={() => setSelectedRecipient(r)}
                        />
                        <div>
                          <div style={{ fontWeight: 600, fontSize: 14 }}>{r.fullName}</div>
                          <div style={{ fontSize: 12, color: '#6b7280' }}>
                            {r.phoneNumber} · {r.mobileOperator} · {r.currency}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={!selectedRecipient}
                  style={{
                    marginTop: 20,
                    padding: '10px 20px',
                    background: '#1a1a2e',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 6,
                    cursor: selectedRecipient ? 'pointer' : 'not-allowed',
                    fontSize: 14,
                    fontWeight: 600,
                    opacity: selectedRecipient ? 1 : 0.5,
                  }}
                >
                  Continue
                </button>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handleStep2}>
                <h2 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 600 }}>Enter Amount</h2>
                <div style={{ marginBottom: 16 }}>
                  <label
                    style={{
                      display: 'block',
                      fontSize: 12,
                      fontWeight: 600,
                      marginBottom: 6,
                      color: '#374151',
                    }}
                  >
                    Amount ({selectedRecipient?.currency}) *
                  </label>
                  <input
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                    autoFocus
                    placeholder="0.00"
                    style={inputStyle}
                  />
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label
                    style={{
                      display: 'block',
                      fontSize: 12,
                      fontWeight: 600,
                      marginBottom: 6,
                      color: '#374151',
                    }}
                  >
                    Reason (optional)
                  </label>
                  <textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    rows={3}
                    placeholder="e.g. Monthly stipend"
                    style={{ ...inputStyle, resize: 'vertical' }}
                  />
                </div>
                {error && (
                  <div
                    style={{
                      background: '#fee2e2',
                      color: '#991b1b',
                      padding: '8px 12px',
                      borderRadius: 5,
                      fontSize: 13,
                      marginBottom: 14,
                    }}
                  >
                    {error}
                  </div>
                )}
                <div style={{ display: 'flex', gap: 10 }}>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    style={{
                      padding: '10px 16px',
                      background: '#f3f4f6',
                      border: 'none',
                      borderRadius: 6,
                      cursor: 'pointer',
                      fontSize: 14,
                    }}
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    style={{
                      padding: '10px 20px',
                      background: '#1a1a2e',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 6,
                      cursor: 'pointer',
                      fontSize: 14,
                      fontWeight: 600,
                    }}
                  >
                    Review
                  </button>
                </div>
              </form>
            )}

            {step === 3 && (
              <div>
                <h2 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 600 }}>
                  Confirm Payout
                </h2>
                <div
                  style={{
                    background: '#f9fafb',
                    borderRadius: 6,
                    padding: '16px',
                    marginBottom: 20,
                  }}
                >
                  {[
                    ['Recipient', selectedRecipient?.fullName],
                    [
                      'Phone',
                      `${selectedRecipient?.phoneNumber} (${selectedRecipient?.mobileOperator})`,
                    ],
                    ['Amount', `${Number(amount).toLocaleString()} ${selectedRecipient?.currency}`],
                    ['Reason', reason || '—'],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '6px 0',
                        fontSize: 14,
                        borderBottom: '1px solid #e5e7eb',
                      }}
                    >
                      <span style={{ color: '#6b7280' }}>{label}</span>
                      <span style={{ fontWeight: 500 }}>{value}</span>
                    </div>
                  ))}
                </div>
                {error && (
                  <div
                    style={{
                      background: '#fee2e2',
                      color: '#991b1b',
                      padding: '8px 12px',
                      borderRadius: 5,
                      fontSize: 13,
                      marginBottom: 14,
                    }}
                  >
                    {error}
                  </div>
                )}
                <div style={{ display: 'flex', gap: 10 }}>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    style={{
                      padding: '10px 16px',
                      background: '#f3f4f6',
                      border: 'none',
                      borderRadius: 6,
                      cursor: 'pointer',
                      fontSize: 14,
                    }}
                  >
                    Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={createMutation.isPending}
                    style={{
                      padding: '10px 20px',
                      background: '#065f46',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 6,
                      cursor: createMutation.isPending ? 'not-allowed' : 'pointer',
                      fontSize: 14,
                      fontWeight: 600,
                      opacity: createMutation.isPending ? 0.7 : 1,
                    }}
                  >
                    {createMutation.isPending ? 'Sending...' : 'Confirm & Send'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </AppShell>
    </ProtectedRoute>
  );
}
