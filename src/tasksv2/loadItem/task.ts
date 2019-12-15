import { TaskSender } from "../tasks";

export type ItemGetter<ItemType, ItemId> = (
  itemId: ItemId
) => Promise<ItemType>;
export type ItemLoadedSender<ItemType> = (item: ItemType) => Promise<void>;

export interface LoadItemTask<ItemId> {
  type: "LoadItemTask";
  itemId: ItemId;
}

// Request that we run this task
export const produceLoadItemTask = <ItemId>(
  sendTask: TaskSender<LoadItemTask<ItemId>>
) => async (itemId: ItemId): Promise<void> => {
  const task: LoadItemTask<ItemId> = {
    type: "LoadItemTask",
    itemId
  };

  await sendTask(task);
};

interface LoadItemConsumerActions<ItemType, ItemId> {
  getItem: ItemGetter<ItemType, ItemId>;
  sendItemLoaded: ItemLoadedSender<ItemType>;
}

// Run this task
export const consumeLoadItemTask = <ItemType, ItemId>(
  actions: LoadItemConsumerActions<ItemType, ItemId>
) => async (task: LoadItemTask<ItemId>) => {
  const item = await actions.getItem(task.itemId);
  await actions.sendItemLoaded(item);
};
