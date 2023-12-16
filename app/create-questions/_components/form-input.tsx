"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
        <div>
          {errors[name].map((error: string) => (
            <p key={error} className="text-rose-500">
              {error}
            </p>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default FormInput;
