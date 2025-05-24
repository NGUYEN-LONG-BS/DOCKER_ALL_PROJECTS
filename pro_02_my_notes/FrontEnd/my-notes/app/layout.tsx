// app/layout.tsx
'use client';

import { Provider } from 'react-redux';
import { store } from '@/lib/redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import Script from 'next/script'; // Dùng next/script để tải JS an toàn

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>My Notes</title>
        <meta name="description" content="A Next.js application for learning Redux Toolkit and other technologies" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css"
        />
      </head>
      <body>
        <Provider store={store}>
          {children}
        </Provider>
        {/* Tải Bootstrap JS sau khi trang render */}
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}