'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { persistQueryClient } from '@tanstack/react-query-persist-client';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import React, { ReactNode, useEffect, useState } from 'react';
import { HydrationBoundary } from '@tanstack/react-query';

export const QueryProvider = ({ children, dehydratedState }: QueryProviderProps) => {
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const localStoragePersister = createSyncStoragePersister({
        storage: window.localStorage,
      });

      persistQueryClient({
        queryClient,
        persister: localStoragePersister,
      });
    }
  }, [queryClient]);

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
    </QueryClientProvider>
  );
};

export interface QueryProviderProps {
  children: ReactNode;
  dehydratedState?: unknown;
}
