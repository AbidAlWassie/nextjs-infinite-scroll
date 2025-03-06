"use client";

import { useInfinitePosts } from "@/hooks/useInfinitePosts";
import Image from "next/image";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface Post {
  id: number;
  title: string;
  body: string;
}

export default function Posts() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfinitePosts();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  function truncateWords(text: string, wordLimit: number) {
    return (
      text.split(" ").slice(0, wordLimit).join(" ") +
      (text.split(" ").length > wordLimit ? "..." : "")
    );
  }

  return (
    <div>
      <ul className="space-y-4">
        {data?.pages.map((page) =>
          page.map((post: Post) => (
            <li key={post.id} className="border p-4 rounded-lg">
              <Image
                src={`https://holdmyimage.netlify.app/api/image/1280x720/1f788e/e7edee?text=${encodeURIComponent(
                  truncateWords(post.title, 5)
                )}&font=Oswald&pattern=waves&patternDensity=120&gradient=a733c7%2C1bb2c5&direction=horizontal`}
                alt={post.title}
                // src={`https://holdmyimage.netlify.app/api/image/1280x720/1f788e/e7edee?text=${encodeURIComponent(
                //   truncateWords(post.title, 5)
                // )}&font=Oswald&pattern=waves&patternDensity=120&gradient=a733c7%2C1bb2c5&direction=horizontal&format=svg`}
                width={700}
                height={300}
                className="rounded-lg object-cover"
                // unoptimized // for svg
              />
              <h2 className="font-semibold">{post.title}</h2>
              <p>{post.body}</p>
            </li>
          ))
        )}
      </ul>

      {isFetchingNextPage && <p>Loading...</p>}

      {hasNextPage && <div ref={ref} className="h-10 bg-transparent"></div>}
    </div>
  );
}
