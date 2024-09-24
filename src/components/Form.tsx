"use server";
import { createUrlShortner } from "@/utils/server";

const Form = () => {

  return (
    <div className="mx-auto max-w-sm pt-1">
      <form action={createUrlShortner} className="flex flex-col gap-2">
        <input type="url" name="url" className="rounded-md" />
        <input
          type="submit"
          value="create shortner"
          className="rounded-full bg-cyan-400 py-2 px-1"
        />
      </form>
    </div>
  );
};

export default Form;
