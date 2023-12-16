"use client";

import { createQuestion } from "@/app/actions/create-questions";

import FormInput from "./form-input";
import FormButton from "./form-submit-button";
import { useAction } from "@/hooks/use-action";

const Form = () => {
  const { execute, fieldErrors } = useAction(createQuestion, {
    onSuccess: (data) => {
      console.log(data, "SUCCESS");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const onSubmit = (formData: FormData) => {
    const content = formData.get("content") as string;
    execute({ content });
  };

  return (
    <form action={onSubmit} className="flex flex-col space-y-4 max-w-md p-4">
      <div className="flex flex-col space-y-2">
        <FormInput errors={fieldErrors} />
      </div>
      <FormButton />
    </form>
  );
};

export default Form;
