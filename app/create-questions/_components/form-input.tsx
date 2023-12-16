"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormStatus } from "react-dom";

interface FormInputProps {
  errors?: {
    content?: string[];
  };
}

const FormInput = ({ errors }: FormInputProps) => {
  const { pending } = useFormStatus();
  return (
    <div>
      <Label htmlFor="content">Content</Label>
      <Input
        id="content"
        name="content"
        required
        placeholder="Enter a Content"
        disabled={pending}
      />
      {errors?.content ? (
        <div>
          {errors.content.map((error: string) => (
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
