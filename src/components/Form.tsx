"use client";
import { formSchema, TFormSchema } from "@/utils/form-schema";
import { createUrlShortner } from "@/utils/server";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form as FormUi,
} from "./ui/form";
import { Input } from "./ui/input";

import { useState, useTransition } from "react";

const Form = () => {
  const [slug, setSlug] = useState("");
  const [isPending, startTransition] = useTransition();
  
  const form = useForm<TFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
      customSlug: "",
    },
  });
  
  const onSubmit = async (data: TFormSchema) => {
    startTransition(async () => {
      const { error, slug: slugFromServer } = await createUrlShortner(data);
      if (error) {
        form.setError("customSlug", { type: "server", message: error });
      }
      if (slugFromServer) {
        setSlug(slugFromServer);
      }
      form.reset();
    });
  };

  const slugNotExist = (
    <FormUi {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input
                  type="url"
                  autoFocus
                  placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="customSlug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Custom slug</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="e.g. cat, dog, etc."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          Submit
        </Button>
      </form>
    </FormUi>
  );

  const slugExist =(
    <p>https://acort.vercel.app/{slug}</p>
  )

  return (
    <div className="mx-auto max-w-sm pt-1">
      {!!slug ? slugExist : slugNotExist }
    </div>
  );
};

export default Form;
