import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createRouter, RouterProvider } from '@tanstack/react-router';
// import { queryClient } from './apis/query-client';
import { QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './context/theme-context';
import { TooltipProvider } from './components/ui/tooltip';
import { SnackbarProvider } from './context/snackbar-context';
import { routeTree } from './routeTree.gen';
import { useCreateQueryClient } from './apis/useCreateQueryClient';

const queryClient = useCreateQueryClient()

const router = createRouter({
  routeTree,
  context: { queryClient },
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <SnackbarProvider>
            <RouterProvider router={router} />
          </SnackbarProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
)
