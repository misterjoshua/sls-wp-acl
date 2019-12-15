import {
  ItemGetter,
  produceLoadItemTask,
  consumeLoadItemTask
} from "./loadItem/task";
import { Post } from "../wordpress/post";
import WPAPI from "wpapi";
import { sqsSender, snsPublisher } from "./tasks";

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

interface WPItem {
  id: number;
}

function wpLoadItemConfiguration<ItemType extends WPItem>(
  api: WPAPI,
  loadItemQueueUrl: string,
  putItemTopicArn: string
) {
  const producer = produceLoadItemTask<number>(sqsSender(loadItemQueueUrl));

  const getItem = async (itemId: number): Promise<ItemType> =>
    api.pages().id(itemId);

  const sendItem = snsPublisher<ItemType>(loadItemQueueUrl);
  const consumer = consumeLoadItemTask<ItemType, number>({
    getItem: getItem,
    sendItemLoaded: sendItem
  });

  return {
    producer,
    consumer
  };
}

const api: WPAPI;

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
