import { Env } from '@/features/env';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/env/')({
  component: Env,
})
