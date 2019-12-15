import { TaskSender } from "../tasks";

export interface ListItemsTask<ItemId> {
  type: "ListItemsTask";
  page: number;
  itemIds: ItemId[];
}

export type ItemsLister<ItemType> = (page: number) => Promise<ItemType[]>;
export type ItemSender<ItemType> = (item: ItemType) => Promise<void>;
export type ItemIdGetter<ItemType, ItemId> = (item: ItemType) => ItemId;
export type ListItemsTaskProducer<ItemId> = (
  page: number,
  itemIds: ItemId[]
) => Promise<void>;

export const produceListItemsTask = <ItemId>(
  sendTask: TaskSender<ListItemsTask<ItemId>>
): ListItemsTaskProducer<ItemId> => async (
  page: number,
  itemIds: ItemId[] = []
): Promise<void> => {
  await sendTask({
    type: "ListItemsTask",
    page,
    itemIds
  });
};

export interface ListItemsConsumerActions<ItemType, ItemId> {
  listItems: ItemsLister<ItemType>;
  sendItem: ItemSender<ItemType>;
  getItemId: ItemIdGetter<ItemType, ItemId>;
  produceListItemsTask: ListItemsTaskProducer<ItemId>;
}

export const consumeListItemsTask = <ItemType, ItemId>(
  actions: ListItemsConsumerActions<ItemType, ItemId>
) => async (task: ListItemsTask<ItemId>): Promise<void> => {
  const items = await actions.listItems(task.page);

  Promise.all(items.map(async item => await actions.sendItem(item)));

  if (items.length > 0) {
    const itemIds = task.itemIds.concat(
      items.map(item => actions.getItemId(item))
    );
    await actions.produceListItemsTask(task.page + 1, itemIds);
  }
};
