import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from './context/AuthContext.jsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        // Jika error 401 atau 404, 403(forbiden) jangan lakukan retry (langsung stop)
        if (error.response?.status === 401 || error.response?.status === 404 || error.response?.status === 403) return false;

        // Untuk error lain, coba maksimal 3 kali
        return failureCount < 3;
      },
      refetchOnWindowFocus: false,
    }
  }
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode >,
)
