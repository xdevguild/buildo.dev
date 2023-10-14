import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useFormContext } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';

type OperationsSelectFieldProps = {
  name: string;
  label: string;
  description: string;
  options: { value: string; label: string }[];
  placeholder?: string;
};

export const OperationsSelectField = ({
  name,
  label,
  placeholder = '',
  description,
  options,
}: OperationsSelectFieldProps) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="mb-2">
          <FormLabel>{label}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <ScrollArea className="h-[230px]" type="auto">
                {options.map(({ value, label }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </ScrollArea>
            </SelectContent>
          </Select>
          <FormDescription className="text-xs">{description}</FormDescription>
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  );
};
