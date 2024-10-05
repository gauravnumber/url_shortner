"use client";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const Congrate = () => {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");
  // const copiedSite = `${window.location.protocol}//${window.location.hostname}/${slug}`;
  return (
    <Suspense fallback={<p>loading...</p>}>
      <p>Congratulations you created link.</p>
      <p>Copy this link:</p>
      <p>Slug: {slug}</p>
      {/* <p>{copiedSite}</p> */}
    </Suspense>
  );
};

export default Congrate;
