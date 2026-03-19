'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const navItems = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/recipients', label: 'Recipients' },
  { href: '/payouts', label: 'Payouts' },
  { href: '/clients', label: 'Clients' },
  { href: '/unattributed', label: 'Unattributed' },
];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'system-ui, sans-serif' }}>
      <nav
        style={{
          width: 220,
          background: '#1a1a2e',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          padding: '24px 0',
          flexShrink: 0,
        }}
      >
        <div style={{ padding: '0 20px 24px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ fontSize: 16, fontWeight: 700 }}>Payout Ops</div>
          <div style={{ fontSize: 12, color: '#aaa', marginTop: 4 }}>{user?.email}</div>
        </div>
        <ul style={{ listStyle: 'none', margin: 0, padding: '16px 0', flex: 1 }}>
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                style={{
                  display: 'block',
                  padding: '10px 20px',
                  color: pathname.startsWith(item.href) ? '#fff' : '#bbb',
                  background: pathname.startsWith(item.href)
                    ? 'rgba(255,255,255,0.1)'
                    : 'transparent',
                  textDecoration: 'none',
                  fontSize: 14,
                  borderLeft: pathname.startsWith(item.href)
                    ? '3px solid #4f8ef7'
                    : '3px solid transparent',
                }}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <button
            onClick={logout}
            style={{
              background: 'none',
              border: 'none',
              color: '#bbb',
              cursor: 'pointer',
              fontSize: 14,
              padding: 0,
            }}
          >
            Sign out
          </button>
        </div>
      </nav>
      <main style={{ flex: 1, padding: '32px', background: '#f5f6fa', overflowY: 'auto' }}>
        {children}
      </main>
    </div>
  );
}
