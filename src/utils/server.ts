"use server";

import prisma from "@/db/prisma";
import { uuid } from "@/libs/uuid";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createUrlShortner = async (formData: FormData) => {
  const url = formData.get("url") as string;
  const slug = uuid(8);
  
  await prisma.url_lists.create({
    data: {
      url,
      slug,
    },
  });

  revalidatePath("/");
  redirect(`/congrate?slug=${slug}`);
};
