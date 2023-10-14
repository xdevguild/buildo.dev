import { Button } from '@/components/ui/button';
import { Authenticated } from '../elven-ui/authenticated';

type OperationsSubmitButtonProps = {
  formId: string;
  label?: string;
  isPublic?: boolean;
};

type ButtonComponent = {
  label: string;
  formId: string;
  disabled?: boolean;
};

const ButtonComponent = ({ label, formId, disabled }: ButtonComponent) => (
  <Button type="submit" size="sm" form={formId} disabled={disabled}>
    {label}
  </Button>
);

export const OperationsSubmitButton = ({
  formId,
  label = 'Submit',
  isPublic = false,
}: OperationsSubmitButtonProps) => {
  if (isPublic) return <ButtonComponent formId={formId} label={label} />;

  return (
    <Authenticated
      fallback={
        <div className="flex items-center justify-end gap-4">
          <span className="text-xs text-destructive font-bold">
            Please connect your wallet first!
          </span>
          <ButtonComponent formId={formId} disabled label={label} />
        </div>
      }
    >
      <ButtonComponent formId={formId} label={label} />
    </Authenticated>
  );
};
