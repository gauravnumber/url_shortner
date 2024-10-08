"use server";

import prisma from "@/db/prisma";
import { uuid } from "@/libs/uuid";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { formSchema, TFormSchema } from "./form-schema";

export const createUrlShortner = async (data: TFormSchema) => {
  const { url, customSlug } = data;
  const isCustomSlugExist = !!customSlug;
  const slug = isCustomSlugExist ? customSlug : uuid(8);

  const result = formSchema.safeParse({ url, customSlug });

  // let zodErrors = {};
  // console.log("result", result);
  // if (!result.success) {
  //   result.error.issues.forEach((issue) => {
  //     zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
  //   });
  // }
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
