import WPAPI from "wpapi";

export interface Post {
  id: number;
  slug: string;
}

export async function getPost(api: WPAPI, postID: number): Promise<Post> {
  return await api.posts().id(postID);
}

export async function listPosts(api: WPAPI, page: number): Promise<Post[]> {
  try {
    return await api.posts().page(page);
  } catch (e) {
    if (e.code === "rest_post_invalid_page_number") {
      // Last page probably.
      return [];
    } else {
      // Some other error.
      throw e;
    }
  }
}
