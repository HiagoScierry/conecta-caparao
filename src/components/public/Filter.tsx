"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

type FilterProps = {
  title: string
  items: {
    label: string
    value: string
  }[]
  selectedValues?: string[]
  onChange?: (selectedValues: string[]) => void
  className?: string
}

export function Filter({ title, items, selectedValues = [], onChange, className }: FilterProps) {
  const handleCheckboxChange = (value: string) => {
    if (selectedValues.includes(value)) {
      // Remove o valor se já está selecionado
      onChange?.(selectedValues.filter(v => v !== value))
    } else {
      // Adiciona o valor se não está selecionado
      onChange?.([...selectedValues, value])
    }
  }

  return (
    <div className={`space-y-4 ${className}`} >
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1" className="bg-tourism-verde text-white rounded-lg border-b-0">
          <AccordionTrigger className="p-4">
            <h3 className="font-bold text-start">{title}</h3>
          </AccordionTrigger>
          <AccordionContent className="bg-[#BFBFB8] text-black rounded-b-lg">
            <ul className="p-4 space-y-2">
              {items?.map((item) => (
                <li key={item.value} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={item.value}
                    value={item.value}
                    checked={selectedValues.includes(item.value)}
                    onChange={() => handleCheckboxChange(item.value)}
                    className="h-4 w-4"
                  />
                  <label htmlFor={item.value} className="cursor-pointer">{item.label}</label>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}