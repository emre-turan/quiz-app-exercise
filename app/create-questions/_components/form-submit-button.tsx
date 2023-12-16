"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

const FormButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      Submit Question
    </Button>
  );
};

export default FormButton;
