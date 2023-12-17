"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { XCircleIcon } from "lucide-react";
import { useFormStatus } from "react-dom";

interface FormInputProps {
  label?: string;
  name: string;
  placeholder: string;
  errors?: {
    [key: string]: string[];
  };
  className?: string;
}

const FormInput = ({
  className,
  errors,
  label,
  name,
  placeholder,
}: FormInputProps) => {
  const { pending } = useFormStatus();
  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        name={name}
        required
        placeholder={placeholder}
        disabled={pending}
        className={className}
      />
      {errors?.[name] ? (
        <div
          id={`${name}}-error`}
          aria-live="polite"
          className="mt-2 text-xs text-rose-500"
        >
          {errors[name].map((error: string) => (
            <div
              key={error}
              className="flex items-center font-medium p-2 border border-rose-500 bg-rose-500/10 rounded-sm"
            >
              <XCircleIcon className="h-4 w-4 mr-2" />
              {error}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default FormInput;
