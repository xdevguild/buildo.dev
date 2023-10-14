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
import { Textarea } from '../ui/textarea';

type OperationsInputFieldProps = {
  name: string;
  label: string;
  description: string;
  placeholder?: string;
  type?: 'text' | 'number' | 'textarea';
};

export const OperationsInputField = ({
  name,
  label,
  type = 'text',
  placeholder = '',
  description,
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
              <Textarea placeholder={placeholder} {...field} rows={3} />
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
