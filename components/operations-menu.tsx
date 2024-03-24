import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { OperationMenuItem } from '@/components/operations-menu-item';
import { operationsMenuConfig } from '@/lib/operations-menu-config';

export const OperationsMenu = () => {
  return (
    <Accordion type="single" collapsible>
      {Object.keys(operationsMenuConfig).map((item, index) => (
        <AccordionItem
          value={`menu-item-${index}`}
          className="border-0"
          key={item}
        >
          <AccordionTrigger className="text-md py-1 capitalize">
            {item.replaceAll('-', ' ')}
          </AccordionTrigger>
          <AccordionContent className="p-1 pr-[2px]">
            <ul>
              {operationsMenuConfig[item].map((item, index) => (
                <OperationMenuItem href={item.path} key={index}>
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
