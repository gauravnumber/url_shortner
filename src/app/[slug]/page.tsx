import prisma from "@/db/prisma";
import { redirect } from "next/navigation";

interface RedirectProps {
  params: {
    slug: string;
  };
}
const Redirect = async ({ params }: RedirectProps) => {
  const { slug } = params;
  const urlObj = await prisma.url_lists.findFirst({
    where: {
      slug,
    },
  });

  if (!urlObj) return <p>This url not exist.</p>

  redirect(urlObj.url)

};

export default Redirect;
