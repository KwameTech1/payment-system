'use client';

import { useState } from 'react';
import ProtectedRoute from '@/components/layout/ProtectedRoute';
import AppShell from '@/components/layout/AppShell';
import Badge from '@/components/ui/Badge';
import { useRecipients, useCreateRecipient, useUpdateRecipient } from '@/hooks/useRecipients';

interface RecipientForm {
  fullName: string;
  phoneNumber: string;
  mobileOperator: string;
  countryCode: string;
  currency: string;
  notes: string;
}

const defaultForm: RecipientForm = {
  fullName: '',
  phoneNumber: '',
  mobileOperator: '',
  countryCode: '',
  currency: '',
  notes: '',
};

export default function RecipientsPage() {
  const { data: recipients, isLoading } = useRecipients();
  const createMutation = useCreateRecipient();
  const updateMutation = useUpdateRecipient();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<RecipientForm>(defaultForm);
  const [formError, setFormError] = useState('');

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    try {
      await createMutation.mutateAsync(form);
      setShowModal(false);
      setForm(defaultForm);
    } catch (err: unknown) {
      setFormError(
        (err as { response?: { data?: { error?: string } } }).response?.data?.error ||
          'Failed to create recipient'
      );
    }
  };

  const handleApprove = async (id: string) => {
    try {
      await updateMutation.mutateAsync({ id, data: { status: 'approved' } });
    } catch {
      // handled silently — table will not update on failure
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '8px 10px',
    border: '1px solid #d1d5db',
    borderRadius: 5,
    fontSize: 14,
    boxSizing: 'border-box' as const,
  };

  return (
    <ProtectedRoute>
      <AppShell>
        <div style={{ maxWidth: 900 }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 24,
            }}
          >
            <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: '#1a1a2e' }}>
              Recipients
            </h1>
            <button
              onClick={() => setShowModal(true)}
              style={{
                padding: '9px 18px',
                background: '#1a1a2e',
                color: '#fff',
                border: 'none',
                borderRadius: 6,
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              + Add Recipient
            </button>
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
            ) : !recipients?.length ? (
              <div style={{ padding: 24, color: '#666', fontSize: 14 }}>No recipients yet.</div>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                <thead>
                  <tr style={{ background: '#f9fafb' }}>
                    {['Name', 'Phone', 'Operator', 'Country', 'Currency', 'Status', 'Actions'].map(
                      (h) => (
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
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {recipients.map((r) => (
                    <tr key={r.id} style={{ borderTop: '1px solid #f3f4f6' }}>
                      <td style={{ padding: '12px 16px', fontWeight: 500 }}>{r.fullName}</td>
                      <td style={{ padding: '12px 16px', color: '#374151' }}>{r.phoneNumber}</td>
                      <td style={{ padding: '12px 16px', color: '#374151' }}>{r.mobileOperator}</td>
                      <td style={{ padding: '12px 16px', color: '#374151' }}>{r.countryCode}</td>
                      <td style={{ padding: '12px 16px', color: '#374151' }}>{r.currency}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <Badge status={r.status} />
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        {r.status === 'pending' && (
                          <button
                            onClick={() => handleApprove(r.id)}
                            disabled={updateMutation.isPending}
                            style={{
                              padding: '4px 12px',
                              background: '#d1fae5',
                              color: '#065f46',
                              border: 'none',
                              borderRadius: 4,
                              fontSize: 12,
                              fontWeight: 600,
                              cursor: 'pointer',
                            }}
                          >
                            Approve
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {showModal && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 50,
            }}
          >
            <div
              style={{
                background: '#fff',
                borderRadius: 8,
                padding: 28,
                width: '100%',
                maxWidth: 460,
                boxShadow: '0 8px 32px rgba(0,0,0,0.16)',
              }}
            >
              <h2 style={{ margin: '0 0 20px', fontSize: 18, fontWeight: 700 }}>Add Recipient</h2>
              <form onSubmit={handleCreate}>
                {[
                  {
                    label: 'Full Name',
                    key: 'fullName',
                    required: true,
                    placeholder: 'e.g. Kwame Mensah',
                  },
                  {
                    label: 'Phone Number',
                    key: 'phoneNumber',
                    required: true,
                    placeholder: 'e.g. +233241234567',
                  },
                  {
                    label: 'Mobile Operator',
                    key: 'mobileOperator',
                    required: true,
                    placeholder: 'e.g. MTN, TELECEL',
                  },
                  {
                    label: 'Country Code',
                    key: 'countryCode',
                    required: true,
                    placeholder: 'e.g. GH, NG',
                  },
                  {
                    label: 'Currency',
                    key: 'currency',
                    required: true,
                    placeholder: 'e.g. GHS, NGN',
                  },
                  { label: 'Notes', key: 'notes', required: false, placeholder: 'Optional' },
                ].map((field) => (
                  <div key={field.key} style={{ marginBottom: 14 }}>
                    <label
                      style={{
                        display: 'block',
                        fontSize: 12,
                        fontWeight: 600,
                        marginBottom: 4,
                        color: '#374151',
                      }}
                    >
                      {field.label}
                      {field.required && ' *'}
                    </label>
                    <input
                      value={form[field.key as keyof RecipientForm]}
                      onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                      required={field.required}
                      placeholder={field.placeholder}
                      style={inputStyle}
                    />
                  </div>
                ))}

                {formError && (
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
                    {formError}
                  </div>
                )}

                <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 8 }}>
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setForm(defaultForm);
                      setFormError('');
                    }}
                    style={{
                      padding: '8px 16px',
                      background: '#f3f4f6',
                      border: 'none',
                      borderRadius: 5,
                      cursor: 'pointer',
                      fontSize: 14,
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={createMutation.isPending}
                    style={{
                      padding: '8px 16px',
                      background: '#1a1a2e',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 5,
                      cursor: 'pointer',
                      fontSize: 14,
                      fontWeight: 600,
                    }}
                  >
                    {createMutation.isPending ? 'Saving...' : 'Add Recipient'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </AppShell>
    </ProtectedRoute>
  );
}
