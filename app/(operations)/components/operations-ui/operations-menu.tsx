'use client';

import { useState } from 'react';
import { PanelLeft } from 'lucide-react';
import { OperationsMenuItems } from './operations-menu-items';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export const OperationsMenu = () => {
  const [open, setOpen] = useState(false);

  const closeSheet = () => setOpen(false);

  return (
    <>
      <div className="hidden lg:block">
        <OperationsMenuItems onItemClick={closeSheet} />
      </div>
      <Sheet open={open} onOpenChange={setOpen}>
        <div className="flex items-center">
          <SheetTrigger className="block lg:hidden" asChild>
            <Button
              variant="outline"
              size="icon"
              className="my-2 flex items-center justify-center"
            >
              <PanelLeft width={20} height={20} />
            </Button>
          </SheetTrigger>
        </div>
        <SheetContent side="left" className="w-full max-w-xs sm:max-w-xs">
          <div>
            <Image src="/logo.svg" alt={'Logo'} width={30} height={30} />
          </div>
          <div className="mt-6">
            <OperationsMenuItems onItemClick={closeSheet} />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};
