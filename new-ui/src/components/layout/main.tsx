import { cn } from '@/lib/utils';

type MainProps = React.HTMLAttributes<HTMLElement> & {
  compact?: boolean,
  fluid?: boolean,
  fixed?: boolean,
  ref?: React.Ref<HTMLElement>
}

export function Main({ className, compact, fixed, ...props }: MainProps) {
  return (
    <main
      data-layout={fixed ? 'fixed' : 'auto'}
      className={cn(
        'px-4 py-6',
        // fixed && 'flex grow flex-col overflow-hidden',
        // !fluid && '@7xl/content:mx-auto @7xl/content:w-full @7xl/content:max-w-7xl',
        
        'w-full',
        compact && 'max-w-7xl mx-auto',
        fixed && 'h-svh p-4',
        className
      )}
      {...props}
    />
  )
}
