import { Configprops } from '@/features/configprops';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/configprops/')({
  component: Configprops,
})
