// app/layout.tsx
'use client';

import { Provider } from 'react-redux';
import { store } from '@/lib/redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>My Notes</title>
        <meta name="description" content="A Next.js application for learning Redux Toolkit and other technologies" />
        {/* Optional: Bootstrap Icons CDN */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css"
        />
      </head>
      <body>
        <Provider store={store}>
          {children}
        </Provider>
      </body>
    </html>
  );
}