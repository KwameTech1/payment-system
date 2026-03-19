'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/layout/ProtectedRoute';
import AppShell from '@/components/layout/AppShell';
import { useCreateClient } from '@/hooks/useClients';

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '8px 12px',
  border: '1px solid #d1d5db',
  borderRadius: 6,
  fontSize: 14,
  boxSizing: 'border-box',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 13,
  fontWeight: 600,
  color: '#374151',
  marginBottom: 6,
};

export default function NewClientPage() {
  const router = useRouter();
  const { mutateAsync: createClient, isPending, error } = useCreateClient();

  const [form, setForm] = useState({
    businessName: '',
    email: '',
    password: '',
    clientCode: '',
    mobileNumber: '',
    mobileOperator: '',
    countryCode: '',
    currency: '',
  });

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createClient(form);
    router.push('/clients');
  };

  const apiError = error as { response?: { data?: { error?: string } } } | null;

  return (
    <ProtectedRoute>
      <AppShell>
        <div style={{ maxWidth: 540 }}>
          <h1 style={{ margin: '0 0 24px', fontSize: 24, fontWeight: 700, color: '#1a1a2e' }}>Add Client</h1>

          {apiError && (
            <div
              style={{
                marginBottom: 16,
                padding: '12px 16px',
                background: '#fee2e2',
                border: '1px solid #fca5a5',
                borderRadius: 6,
                color: '#991b1b',
                fontSize: 14,
              }}
            >
              {apiError.response?.data?.error ?? 'Something went wrong'}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            style={{ background: '#fff', borderRadius: 8, border: '1px solid #e5e7eb', padding: 24 }}
          >
            {[
              { label: 'Business Name', field: 'businessName', type: 'text' },
              { label: 'Email', field: 'email', type: 'email' },
              { label: 'Password', field: 'password', type: 'password' },
              { label: 'Client Code (e.g. BIZ001)', field: 'clientCode', type: 'text' },
              { label: 'Mobile Number', field: 'mobileNumber', type: 'text' },
              { label: 'Mobile Operator (e.g. MTN)', field: 'mobileOperator', type: 'text' },
              { label: 'Country Code (e.g. GH)', field: 'countryCode', type: 'text' },
              { label: 'Currency (e.g. GHS)', field: 'currency', type: 'text' },
            ].map(({ label, field, type }) => (
              <div key={field} style={{ marginBottom: 16 }}>
                <label style={labelStyle}>{label}</label>
                <input
                  type={type}
                  value={form[field as keyof typeof form]}
                  onChange={set(field)}
                  required
                  style={inputStyle}
                />
              </div>
            ))}

            <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
              <button
                type="submit"
                disabled={isPending}
                style={{
                  padding: '10px 24px',
                  background: '#1a1a2e',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 6,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: isPending ? 'not-allowed' : 'pointer',
                  opacity: isPending ? 0.7 : 1,
                }}
              >
                {isPending ? 'Creating...' : 'Create Client'}
              </button>
              <button
                type="button"
                onClick={() => router.back()}
                style={{
                  padding: '10px 24px',
                  background: '#fff',
                  color: '#374151',
                  border: '1px solid #d1d5db',
                  borderRadius: 6,
                  fontSize: 14,
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </AppShell>
    </ProtectedRoute>
  );
}
