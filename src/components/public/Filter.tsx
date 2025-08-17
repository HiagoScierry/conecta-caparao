"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

type FilterProps = {
  title: string
  items: {
    label: string
    value: string
  }[]
  onChange?: (value: string) => void
  className?: string
}

export function Filter({ title, items, onChange, className }: FilterProps) {
  return (
    <div className={`space-y-4 ${className}`} >
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1" className="bg-tourism-verde text-white rounded-lg border-b-0">
          <AccordionTrigger className="p-4">
            <h3 className="font-bold">{title}</h3>
          </AccordionTrigger>
          <AccordionContent className="bg-[#BFBFB8] text-black rounded-b-lg">
            <ul className="p-4 space-y-2">
              {items?.map((item) => (
                <li key={item.value} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={item.value}
                    value={item.value}
                    onChange={() => onChange?.(item.value)}
                    className="h-4 w-4"
                  />
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}