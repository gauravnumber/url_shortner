"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Congrate = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter()
  const slug = searchParams.get("slug");
  const copiedSite = `${window.location.protocol}//${window.location.hostname}/${slug}`;
  return (
    <>
      <p>Congratulations you created link.</p>
      <p>Copy this link:</p>
      <p>{copiedSite}</p>
      <p>{}</p>
    </>
  );
};

export default Congrate;
