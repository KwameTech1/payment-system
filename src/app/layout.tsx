import type { Metadata, Viewport } from 'next';
import Providers from './providers';

export const metadata: Metadata = {
  title: 'Payout Operations',
  description: 'Private mobile money payout operations platform',
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  themeColor: '#1a1a2e',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, boxSizing: 'border-box' }}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
