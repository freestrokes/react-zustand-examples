import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css'
import App from './App.tsx'

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      console.log('queryCache > onError > error', error);
      console.log('queryCache > onError > query', query);
      // if (query.state.data !== undefined) {
      // 	toast.error(`Query Error: ${error.message}`);
      // }
    },
    onSuccess: (data) => {
      console.log('queryCache > onSuccess', data);
    }
  }),
  defaultOptions: {
    queries: {
      retry: 0,
      // cacheTime: 0,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <React.Suspense fallback={<div>Loading...</div>}>
        <App />
      </React.Suspense>
    </QueryClientProvider>
  </StrictMode>,
)
