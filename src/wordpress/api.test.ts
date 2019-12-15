import { Post } from "./post";
import * as WPAPI from "wpapi";

type PagesOfType<T> = { [x: string]: T[] };
const postPages: PagesOfType<Post> = {
  "1": [...Array(10).keys()].map(i => {
    return { id: i, slug: `slug-${i}` };
  }),
  "2": [...Array(10).keys()].map(i => {
    return { id: i, slug: `slug-${i}` };
  })
};

type IDsOfType<T> = { [x: string]: T };
const posts: IDsOfType<Post> = {
  "31216": {
    id: 31216,
    slug: "slug-31216"
  }
};

export const apiMock: WPAPI = ({
  posts() {
    return {
      async page(page: number): Promise<Post[]> {
        return postPages[page] ?? [];
      },
      async id(postID: number): Promise<Post> {
        return posts[postID];
      }
    };
  }
} as any) as WPAPI; // eslint-disable-line @typescript-eslint/no-explicit-any

it("should have a valid api", async () => {
  expect(apiMock).toBeTruthy();
});
