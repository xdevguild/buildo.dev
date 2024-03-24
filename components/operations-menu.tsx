import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { OperationMenuItem } from '@/components/operations-menu-item';

// TODO: dynamic menu + open active section logic based on pathname
export const OperationsMenu = () => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1" className="border-0">
        <AccordionTrigger className="py-1 text-sm">General</AccordionTrigger>
        <AccordionContent className="p-1 pr-[2px]">
          <ul>
            <OperationMenuItem href="/general/send-egld">
              dasdasdas
            </OperationMenuItem>
            <OperationMenuItem href="#">dasdasdas</OperationMenuItem>
            <OperationMenuItem href="#">dasdasdas</OperationMenuItem>
            <OperationMenuItem href="#">dasdasdas</OperationMenuItem>
          </ul>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2" className="border-0">
        <AccordionTrigger className="py-1 text-sm">
          Fungible ESDT
        </AccordionTrigger>
        <AccordionContent className="p-1 pr-[2px]">
          <ul>
            <OperationMenuItem href="#">dasdasdas</OperationMenuItem>
            <OperationMenuItem href="#">dasdasdas</OperationMenuItem>
            <OperationMenuItem href="#">dasdasdas</OperationMenuItem>
            <OperationMenuItem href="#">dasdasdas</OperationMenuItem>
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
