import { Loggers } from '@/features/loggers';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/loggers/')({
  component: Loggers,
})
