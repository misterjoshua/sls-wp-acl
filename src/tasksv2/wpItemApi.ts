import { ItemGetter } from "./loadItem/task";
import { Post } from "../wordpress/post";
import WPAPI from "wpapi";

export const wpMockPostGetter: ItemGetter<Post, number> = async (
  itemId: number
) => {
  return {
    1234: {
      id: 1234,
      slug: "asdf"
    }
  }[itemId];
};

export const wpApiPageGetter = (api: WPAPI) => async (
  itemId: number
): Promise<Post> => api.pages().id(itemId);

export const wpApiPostGetter = (api: WPAPI) => async (
  itemId: number
): Promise<Post> => api.posts().id(itemId);

export const wpApiTagGetter = (api: WPAPI) => async (
  itemId: number
): Promise<Post> => api.tags().id(itemId);

export const wpApiCategoryGetter = (api: WPAPI) => async (
  itemId: number
): Promise<Post> => api.categories().id(itemId);

export const wpApiUserGetter = (api: WPAPI) => async (
  itemId: number
): Promise<Post> => api.users().id(itemId);
