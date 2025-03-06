import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchPosts = async ({ pageParam = 1 }: { pageParam?: number }) => {
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${pageParam}`
  );
  return data;
};

export function useInfinitePosts() {
  return useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    getNextPageParam: (_, pages) => pages.length + 1,
    initialPageParam: 1,
  });
}
