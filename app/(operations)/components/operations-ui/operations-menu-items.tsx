'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { OperationMenuItem } from './operations-menu-item';
import { operationsMenuConfig } from '@/lib/operations-menu-config';
import { usePathname } from 'next/navigation';

export const OperationsMenuItems = ({
  onItemClick,
}: {
  onItemClick?: () => void;
}) => {
  const pathname = usePathname();

  return (
    <Accordion
      type="single"
      collapsible
      defaultValue={pathname.split('/')?.[1]}
    >
      {Object.keys(operationsMenuConfig).map((item) => (
        <AccordionItem value={item} className="border-0" key={item}>
          <AccordionTrigger className="text-foreground py-1 text-sm capitalize">
            {item.replaceAll('-', ' ')}
          </AccordionTrigger>
          <AccordionContent className="p-1 pr-[2px]">
            <ul>
              {operationsMenuConfig[item]
                .filter((item) => !item.disabled)
                .map((item, index) => (
                  <OperationMenuItem
                    href={item.path}
                    key={index}
                    pathname={pathname}
                    onItemClick={onItemClick}
                  >
                    {item.title}
                  </OperationMenuItem>
                ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
