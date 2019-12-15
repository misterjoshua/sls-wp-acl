import * as WPAPI from "wpapi";
import { Item } from "./item";

type PagesOfType<T> = { [x: string]: T[] };
const postPages: PagesOfType<Item> = {
  "1": [...Array(10).keys()].map(i => {
    return { id: i, slug: `slug-${i}` };
  }),
  "2": [...Array(10).keys()].map(i => {
    return { id: i, slug: `slug-${i}` };
  })
};

type IDsOfType<T> = { [x: string]: T };
const posts: IDsOfType<Item> = {
  "31216": {
    id: 31216,
    slug: "slug-31216"
  }
};

export const apiMock: WPAPI = ({
  posts() {
    return {
      async page(page: number): Promise<Item[]> {
        return postPages[page] ?? [];
      },
      async id(postID: number): Promise<Item> {
        return posts[postID];
      }
    };
  }
} as any) as WPAPI; // eslint-disable-line @typescript-eslint/no-explicit-any

it("should have a valid api", async () => {
  expect(apiMock).toBeTruthy();
});
