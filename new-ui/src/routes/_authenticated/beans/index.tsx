import { Beans } from '@/features/beans';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/beans/')({
  component: Beans,
})
