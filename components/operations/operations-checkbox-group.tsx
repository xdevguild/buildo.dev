import { Checkbox } from '@/components/ui/checkbox';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useFormContext } from 'react-hook-form';

type OperationsCheckboxGroupProps = {
  items: { name: string; description: string }[];
  name: string;
  description: string;
  label: string;
  disabledItems?: string[];
};

export const OperationsCheckboxGroup = ({
  items,
  disabledItems,
  name,
  description,
  label,
}: OperationsCheckboxGroupProps) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem>
          <div className="mb-4">
            <FormLabel className="text-base">{label}</FormLabel>
            <FormDescription className="text-xs">{description}</FormDescription>
          </div>
          {items.map((property) => (
            <FormField
              key={property.name}
              control={control}
              name={name}
              disabled={
                disabledItems ? disabledItems.includes(property.name) : false
              }
              render={({ field }) => {
                return (
                  <FormItem key={property.name}>
                    <div className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(property.name)}
                          disabled={field.disabled}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...field.value, property.name])
                              : field.onChange(
                                  field.value?.filter(
                                    (value: string) => value !== property.name
                                  )
                                );
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {property.name}
                      </FormLabel>
                    </div>
                    <FormDescription className="text-xs">
                      {property.description}
                    </FormDescription>
                  </FormItem>
                );
              }}
            />
          ))}
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  );
};
