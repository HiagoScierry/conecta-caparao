import React, { forwardRef } from "react";
import { Input } from "./input";
import { cn } from "@/lib/utils";

export interface MaskedInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  mask: "phone" | "cep" | "currency";
}

// Funções de máscara
const applyPhoneMask = (value: string): string => {
  const numbers = value.replace(/\D/g, '');
  if (numbers.length <= 10) {
    return numbers.replace(/(\d{2})(\d{4})(\d{0,4})/, (_, area, prefix, suffix) => {
      if (suffix) return `(${area}) ${prefix}-${suffix}`;
      if (prefix) return `(${area}) ${prefix}`;
      if (area.length === 2) return `(${area}) `;
      return area;
    });
  }
  return numbers.replace(/(\d{2})(\d{5})(\d{0,4})/, (_, area, prefix, suffix) => {
    if (suffix) return `(${area}) ${prefix}-${suffix}`;
    if (prefix) return `(${area}) ${prefix}`;
    if (area.length === 2) return `(${area}) `;
    return area;
  });
};

const applyCEPMask = (value: string): string => {
  const numbers = value.replace(/\D/g, '');
  return numbers.replace(/(\d{5})(\d{0,3})/, (_, prefix, suffix) => {
    if (suffix) return `${prefix}-${suffix}`;
    return prefix;
  });
};

const applyCurrencyMask = (value: string): string => {
  const numbers = value.replace(/\D/g, '');
  const amount = (parseInt(numbers) / 100).toFixed(2);
  return `R$ ${amount.replace('.', ',')}`;
};

const getMaskedValue = (value: string, mask: string): string => {
  switch (mask) {
    case "phone":
      return applyPhoneMask(value);
    case "cep":
      return applyCEPMask(value);
    case "currency":
      return applyCurrencyMask(value);
    default:
      return value;
  }
};

const MaskedInput = forwardRef<HTMLInputElement, MaskedInputProps>(
  ({ className, type, mask, onChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      const maskedValue = getMaskedValue(value, mask);
      
      // Atualizar o valor do input
      e.target.value = maskedValue;
      
      // Chamar onChange se fornecido
      if (onChange) {
        onChange(e);
      }
    };

    return (
      <Input
        type={type}
        className={cn(className)}
        ref={ref}
        onChange={handleChange}
        {...props}
      />
    );
  }
);

MaskedInput.displayName = "MaskedInput";

export { MaskedInput };