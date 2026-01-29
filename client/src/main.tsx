import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const queryClient = new QueryClient()

const rootElement = document.getElementById('root')!

if (!rootElement.innerHTML) {
  const root = createRoot(rootElement)
  root.render(
    <StrictMode>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </Provider>
    </StrictMode>,
  )
}
