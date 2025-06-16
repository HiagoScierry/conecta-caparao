import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";

type Option = {
  id: string;
  label: string;
};

type RenderFieldWithOptions = {
  name: string;
  label: string;
  type?: string;
  component?: "input" | "textarea" | "select" | "checkbox-group";
  options?: Option[];
};

export function renderFormFields({
  group,
  fields,
  control,
  isViewMode,
}: {
  group: string | null;
  fields: RenderFieldWithOptions[];
  control: any;
  isViewMode: boolean;
}) {
  return fields.map(({ name, label, type, component, options }) => {
    const fieldName = group ? `${group}.${name}` : name;

    return (
      <FormField
        key={fieldName}
        control={control}
        name={fieldName}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              {(() => {
                switch (component) {
                  case "checkbox-group":
                    return (
                      <div className="space-y-2 rounded-md border p-4">
                        {options?.map((option) => (
                          <FormField
                            key={option.id}
                            control={control}
                            name={fieldName}
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={option.id}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(option.id)}
                                      onCheckedChange={(checked) => {
                                        if (checked) {
                                          field.onChange([
                                            ...(field.value || []),
                                            option.id,
                                          ]);
                                        } else {
                                          field.onChange(
                                            (field.value || []).filter(
                                              (value: string) =>
                                                value !== option.id
                                            )
                                          );
                                        }
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {option.label}
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                      </div>
                    );

                  case "select":
                    return (
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={isViewMode}
                      >
                        <SelectTrigger>
                          <SelectValue
                            placeholder={`Selecione um(a) ${label.toLowerCase()}`}
                          />
                        </SelectTrigger>
                        <SelectContent className="max-h-60 overflow-y-auto">
                          {options?.map((option) => (
                            <SelectItem key={option.id} value={option.id}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    );

                  case "textarea":
                    return <Textarea {...field} disabled={isViewMode} />;

                  default:
                    return (
                      <Input
                        type={type || "text"}
                        {...field}
                        disabled={isViewMode}
                      />
                    );
                }
              })()}
            </FormControl>
          </FormItem>
        )}
      />
    );
  });
}
