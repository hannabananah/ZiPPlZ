import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import AppContextProvider from '@components/hooks/context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import App from './App';
import './index.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </BrowserRouter>
  </QueryClientProvider>
);
