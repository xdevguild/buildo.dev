import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useFormContext } from 'react-hook-form';

type OperationsRadioGroupProps = {
  items: { name: string; description: string }[];
  name: string;
  description: string;
  label: string;
};

export const OperationsRadioGroup = ({
  items,
  name,
  description,
  label,
}: OperationsRadioGroupProps) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="mb-3">
          <div className="mb-4">
            <FormLabel className="text-base">{label}</FormLabel>
            <FormDescription className="text-xs">{description}</FormDescription>
          </div>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-row gap-3"
            >
              {items.map((role) => (
                <FormItem key={role.name}>
                  <div className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value={role.name} />
                    </FormControl>
                    <FormLabel className="font-normal">{role.name}</FormLabel>
                  </div>
                  <FormDescription className="text-xs">
                    {role.description}
                  </FormDescription>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  );
};
