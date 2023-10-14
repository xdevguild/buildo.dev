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
        className="flex flex-col max-w-[80%] md:max-w-[70%] lg:max-w-[50%] w-full max-h-[90%] p-0"
      >
        {children}
      </DialogContent>
    </Dialog>
  );
};
