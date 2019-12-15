import { apiMock } from "./api.test";
import { listItems, getItem } from "./item";

const testItemType = "posts";

it("Should access the api", async () => {
  const posts = await listItems(apiMock, testItemType, 1);
  expect(posts.length).toBeGreaterThan(0);
});

it("Should handle 'last page'", async () => {
  const posts = await listItems(apiMock, testItemType, 10000);
  expect(posts).toHaveLength(0);
});

it("should get a known-to-exist post", async () => {
  const post = await getItem(apiMock, testItemType, 31216);
  expect(post.id).toBe(31216);
});
