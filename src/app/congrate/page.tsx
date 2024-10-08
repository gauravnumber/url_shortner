"use client";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const Congrate = () => {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");
  const url = `https://acort.vercel.app/${slug}`
  
  return (
    <Suspense fallback={<p>loading...</p>}>
      <p>Congratulations you created link.</p>
      <p>Copy this link:</p>
      <p>Slug: {slug}</p>
      <p>{url}</p>
    </Suspense>
  );
};

export default Congrate;
