import { listPosts, getPost } from "./post";
import { apiMock } from "./api.test";

it("Should access the api", async () => {
  const posts = await listPosts(apiMock, 1);
  expect(posts.length).toBeGreaterThan(0);
});

it("Should handle 'last page'", async () => {
  const posts = await listPosts(apiMock, 10000);
  expect(posts).toHaveLength(0);
});

it("should get a known-to-exist post", async () => {
  const post = await getPost(apiMock, 31216);
  expect(post.id).toBe(31216);
});
