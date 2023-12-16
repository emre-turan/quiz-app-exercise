"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

const FormDeleteButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button size="sm" variant="destructive" type="submit" disabled={pending}>
      Delete
    </Button>
  );
};

export default FormDeleteButton;
