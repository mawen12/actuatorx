import { Conditions } from '@/features/conditions';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/conditions/')({
  component: Conditions,
})
