"use client";

import { create } from "@/app/actions/create-questions";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useFormState } from "react-dom";

const Form = () => {
  const initialState = { message: "", errors: {} };
  const [state, dispatch] = useFormState(create, initialState);

  return (
    <form action={dispatch} className="flex flex-col space-y-4 max-w-md p-4">
      <div className="flex flex-col space-y-2">
        <Label htmlFor="content">Content</Label>
        <Input
          id="content"
          name="content"
          required
          placeholder="Enter a Content"
        />
        {state?.errors?.content ? (
          <div>
            {state.errors.content.map((error: string) => (
              <p key={error} className="text-rose-500">
                {error}
              </p>
            ))}
          </div>
        ) : null}
      </div>

      <Button type="submit">Submit</Button>
    </form>
  );
};

export default Form;
