"use client";

import { useFormStatus } from "react-dom";

import { Checkbox } from "@/components/ui/checkbox";

interface CheckboxOptionProps {
  name: string;
  id: string;
  errors?: {
    [key: string]: string[];
  };
}

const FormCheckbox = ({ name, errors, id }: CheckboxOptionProps) => {
  const { pending } = useFormStatus();
  return (
    <div>
      <Checkbox id={id} name={name} disabled={pending} />
      <div>
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
    </div>
  );
};

export default FormCheckbox;
