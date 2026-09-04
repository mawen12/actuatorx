import { Mappings } from '@/features/mappings';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/mappings/')({
  component: Mappings,
})
