import ky from "ky";
import { useQuery, UseQueryResult } from "react-query";

interface Posts {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const getPosts = async (limit: number) => {
  const parsed: Posts[] = await ky(
    "https://jsonplaceholder.typicode.com/posts"
  ).json();
  const result = parsed.filter((x) => x.id <= limit);
  return result;
};

export const usePosts = (limit: number): UseQueryResult => {
  return useQuery(["posts", limit], () => getPosts(limit));
};
