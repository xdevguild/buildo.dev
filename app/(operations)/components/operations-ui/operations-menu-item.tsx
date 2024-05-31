import Link from 'next/link';
import { cn } from '@/lib/utils';
import { CircleDot } from 'lucide-react';

type OperationMenuItemProps = {
  children: string;
  href: string;
  pathname: string;
  onItemClick?: () => void;
};

export const OperationMenuItem = ({
  children,
  href,
  pathname,
  onItemClick,
}: OperationMenuItemProps) => {
  const isActive = pathname === href;

  return (
    <li className="flex items-center justify-between py-[2px]">
      <Link
        href={href}
        {...(onItemClick ? { onClick: onItemClick } : {})}
        className={cn(
          'hover:underline',
          isActive ? 'text-foreground underline' : 'text-muted-foreground'
        )}
      >
        {children}
      </Link>
      {isActive && <CircleDot className="h-3 w-3 shrink-0" />}
    </li>
  );
};
