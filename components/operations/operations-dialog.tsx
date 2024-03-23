import { FC, PropsWithChildren } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

type OperationsDialogProps = {
  open: boolean;
  onOpenChange: (state: boolean) => void;
};

export const OperationsDialog: FC<PropsWithChildren<OperationsDialogProps>> = ({
  open,
  onOpenChange,
  children,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        forceMount
        className="flex max-h-[90%] w-full max-w-[80%] flex-col p-0 md:max-w-[70%] lg:max-w-[50%]"
      >
        {children}
      </DialogContent>
    </Dialog>
  );
};
