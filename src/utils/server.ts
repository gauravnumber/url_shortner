"use server";

import prisma from "@/db/prisma";
import { uuid } from "@/libs/uuid";
import { revalidatePath } from "next/cache";

export const createUrlShortner = async (formData: FormData) => {
  const url = formData.get('url') as string
  
  await prisma.url_lists.create({
    data: {
      url,
      slug: uuid(8),
    },
  });

  revalidatePath("/")
};
