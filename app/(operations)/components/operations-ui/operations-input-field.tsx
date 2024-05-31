import { Input } from '@/components/ui/input';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useFormContext } from 'react-hook-form';
import { Textarea } from '../../../../components/ui/textarea';

type OperationsInputFieldProps = {
  name: string;
  label: string;
  description?: string;
  placeholder?: string;
  type?: 'text' | 'number' | 'textarea';
  rows?: number;
};

export const OperationsInputField = ({
  name,
  label,
  type = 'text',
  placeholder = '',
  description,
  rows = 4,
}: OperationsInputFieldProps) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="mb-2">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {type === 'textarea' ? (
              <Textarea placeholder={placeholder} {...field} rows={rows} />
            ) : (
              <Input type={type} placeholder={placeholder} {...field} />
            )}
          </FormControl>
          <FormDescription className="text-xs">{description}</FormDescription>
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  );
};
