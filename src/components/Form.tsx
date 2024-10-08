"use client";
import { formSchema, TFormSchema } from "@/utils/form-schema";
import { createUrlShortner } from "@/utils/server";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Form as FormUi,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

import { useTransition, useActionState, useState } from "react";

const Form = () => {
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
      const { error } = await createUrlShortner(data);
      form.setError("customSlug", { type: "server", message: error });
    });
  };

  return (
    <div className="mx-auto max-w-sm pt-1">
      <FormUi {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
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
    </div>
  );
};

export default Form;
