'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { CircleDot } from 'lucide-react';

type OperationMenuItemProps = {
  children: string;
  href: string;
};

export const OperationMenuItem = ({
  children,
  href,
}: OperationMenuItemProps) => {
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <li className="flex items-center justify-between py-[2px]">
      <Link
        href={href}
        className={cn(
          'hover:underline ',
          isActive ? 'font-medium text-foreground' : 'text-muted-foreground'
        )}
      >
        {children}
      </Link>
      {isActive && <CircleDot className="h-3 w-3 shrink-0" />}
    </li>
  );
};
