"use server";

import prisma from "@/db/prisma";
import { uuid } from "@/libs/uuid";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createUrlShortner = async (formData: FormData) => {
  const url = formData.get("url") as string;
  const customSlug = formData.get("custom-slug") as string;

  const isCustomSlugExist = !!customSlug;
  const slug = isCustomSlugExist ? customSlug : uuid(8);

  const isCustomSlugExistOnDB = await prisma.url_lists.findFirst({
    where: { slug: customSlug },
  });

  if (isCustomSlugExistOnDB) {
    return { error: "Custom slug exist." };
  }

  await prisma.url_lists.create({
    data: {
      url,
      slug,
    },
  });

  revalidatePath("/");
  redirect(`/congrate?slug=${slug}`);
};
