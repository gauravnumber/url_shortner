"use client";
import { useSearchParams } from "next/navigation";

const Congrate = () => {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");
  // const copiedSite = `${window.location.protocol}//${window.location.hostname}/${slug}`;
  return (
    <>
      <p>Congratulations you created link.</p>
      <p>Copy this link:</p>
      <p>Slug: {slug}</p>
      {/* <p>{copiedSite}</p> */}
    </>
  );
};

export default Congrate;
