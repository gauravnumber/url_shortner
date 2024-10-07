import { createUrlShortner } from "@/utils/server";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const Form = () => {
  return (
    <div className="mx-auto max-w-sm pt-1">
      <form
        action={createUrlShortner}
        className="flex flex-col gap-2 w-full max-w-sm "
      >
        <Label htmlFor="url">URL</Label>
        <Input type="url" name="url" autoFocus  placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"/>

        <Label htmlFor="custom-slug">Custom Slug (optional)</Label>
        <Input type="text" name="custom-slug" placeholder="e.g. cat, dog, etc." />

        <Button type="submit" className="rounded-full">
          Create
        </Button>
      </form>
    </div>
  );
};

export default Form;
