"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
import "react-quill-new/dist/quill.snow.css";

// Importação dinâmica para evitar problemas de SSR
const ReactQuill = dynamic(() => import("react-quill-new"), { 
  ssr: false,
  loading: () => <div className="min-h-[150px] w-full rounded-md border border-input bg-background p-3">Carregando editor...</div>
});

export interface RichTextEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  minHeight?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ 
  value = "", 
  onChange, 
  placeholder = "Digite o texto aqui...",
  disabled = false,
  className,
  minHeight = "150px"
}) => {
  // Módulos e formatos do editor
  const modules = React.useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ align: [] }],
        ["link"],
        [{ color: [] }, { background: [] }],
        ["clean"],
      ],
    }),
    []
  );

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "indent",
    "link",
    "align",
    "color",
    "background",
  ];

  return (
    <div className={cn("rich-text-editor-wrapper", className)}>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        readOnly={disabled}
        style={{
          minHeight: minHeight,
        }}
        className={cn(
          "bg-background rounded-md border border-input",
          disabled && "opacity-50 cursor-not-allowed",
          "focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
        )}
      />
        <style jsx global>{`
          .rich-text-editor-wrapper .quill {
            border-radius: 0.375rem;
          }
          
          .rich-text-editor-wrapper .ql-toolbar {
            border-top-left-radius: 0.375rem;
            border-top-right-radius: 0.375rem;
            background-color: hsl(var(--muted));
            border: 1px solid hsl(var(--input));
            border-bottom: none;
          }
          
          .rich-text-editor-wrapper .ql-container {
            border-bottom-left-radius: 0.375rem;
            border-bottom-right-radius: 0.375rem;
            border: 1px solid hsl(var(--input));
            border-top: none;
            font-size: 0.875rem;
            min-height: ${minHeight};
          }
          
          .rich-text-editor-wrapper .ql-editor {
            min-height: ${minHeight};
            padding: 0.75rem;
          }
          
          .rich-text-editor-wrapper .ql-editor.ql-blank::before {
            color: hsl(var(--muted-foreground));
            font-style: normal;
          }
          
          /* Estilos para modo desabilitado */
          .rich-text-editor-wrapper .ql-toolbar.ql-disabled,
          .rich-text-editor-wrapper .ql-container.ql-disabled {
            cursor: not-allowed;
          }
          
          /* Melhora a aparência dos botões da toolbar */
          .rich-text-editor-wrapper .ql-toolbar button {
            width: 28px;
            height: 28px;
          }
          
          .rich-text-editor-wrapper .ql-toolbar button:hover {
            background-color: hsl(var(--accent));
          }
          
          .rich-text-editor-wrapper .ql-toolbar button.ql-active {
            background-color: hsl(var(--accent));
            color: hsl(var(--accent-foreground));
          }
          
          /* Ajusta o conteúdo do editor para melhor legibilidade */
          .rich-text-editor-wrapper .ql-editor h1 {
            font-size: 2em;
            margin-bottom: 0.5em;
          }
          
          .rich-text-editor-wrapper .ql-editor h2 {
            font-size: 1.5em;
            margin-bottom: 0.5em;
          }
          
          .rich-text-editor-wrapper .ql-editor h3 {
            font-size: 1.17em;
            margin-bottom: 0.5em;
          }
          
          .rich-text-editor-wrapper .ql-editor p {
            margin-bottom: 0.5em;
          }
          
          .rich-text-editor-wrapper .ql-editor ul,
          .rich-text-editor-wrapper .ql-editor ol {
            padding-left: 1.5em;
            margin-bottom: 0.5em;
          }
          
          .rich-text-editor-wrapper .ql-editor a {
            color: hsl(var(--primary));
            text-decoration: underline;
          }
        `}</style>
      </div>
    );
};

RichTextEditor.displayName = "RichTextEditor";

export { RichTextEditor };
