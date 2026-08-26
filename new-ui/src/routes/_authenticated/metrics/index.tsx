import { Metrics } from '@/features/metrics';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/metrics/')({
  component: Metrics,
})
