import { Health } from '@/features/health';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/health/')({
  component: Health,
})
