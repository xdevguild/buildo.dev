import { Button } from '@/components/ui/button';
import { Authenticated } from '@/components/elven-ui/authenticated';
import { Spinner } from '@/components/ui/spinner';

type OperationsSubmitButtonProps = {
  formId: string;
  label?: string;
  isPublic?: boolean;
  pending?: boolean;
  disabled?: boolean;
};

type ButtonComponent = {
  label: string;
  formId: string;
  disabled?: boolean;
  pending?: boolean;
};

export const ButtonComponent = ({
  label,
  formId,
  disabled,
  pending,
}: ButtonComponent) => (
  <Button type="submit" size="sm" form={formId} disabled={pending || disabled}>
    {pending && (
      <div className="mr-2">
        <Spinner size="24" />
      </div>
    )}
    {label}
  </Button>
);

export const OperationsSubmitButton = ({
  formId,
  label = 'Submit',
  isPublic = false,
  pending = false,
  disabled = false,
}: OperationsSubmitButtonProps) => {
  if (isPublic)
    return <ButtonComponent formId={formId} label={label} pending={pending} />;

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
      <ButtonComponent formId={formId} label={label} disabled={disabled} />
    </Authenticated>
  );
};
