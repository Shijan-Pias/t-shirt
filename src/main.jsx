import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import { RouterProvider } from 'react-router';
import router from './router/router.jsx';

import AuthProvider from './AuthContext/AuthProvider.jsx';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const client = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={client}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
