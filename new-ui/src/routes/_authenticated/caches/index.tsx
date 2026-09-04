import { Caches } from '@/features/caches';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/caches/')({
  component: Caches,
})
