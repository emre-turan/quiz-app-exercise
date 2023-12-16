"use client";

import { create } from "@/app/actions/create-questions";


import { useFormState } from "react-dom";
import FormInput from "./form-input";
import FormButton from "./form-submit-button";

const Form = () => {
  const initialState = { message: "", errors: {} };
  const [state, dispatch] = useFormState(create, initialState);

  return (
    <form action={dispatch} className="flex flex-col space-y-4 max-w-md p-4">
      <div className="flex flex-col space-y-2">
        <FormInput errors={state?.errors} />
      </div>
      <FormButton />
    </form>
  );
};

export default Form;
