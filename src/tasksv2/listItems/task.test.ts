import {
  produceListItemsTask,
  ListItemsTask,
  consumeListItemsTask,
  ItemIdGetter,
  ListItemsConsumerActions
} from "./task";

interface MyType {
  id: MyTypeId;
}
type MyTypeId = string;
type MyTask = ListItemsTask<MyTypeId>;

const myTypeIdGetter: ItemIdGetter<MyType, MyTypeId> = (
  item: MyType
): MyTypeId => item.id;

it("should produce a task with the requested page and item ids", async () => {
  let producedTask: MyTask = undefined;
  const producer = produceListItemsTask<MyTypeId>(async task => {
    producedTask = task;
  });

  const itemIds = ["a", "b", "c", "d"];
  await producer(1, itemIds);
  expect(producedTask).toBeDefined();
  expect(producedTask.page).toBe(1);
  expect(producedTask.itemIds).toBe(itemIds);
});

it("should list a page, send it, and accumulate item ids", async () => {
  let producedTask: MyTask = undefined;
  const listItemsTaskProducer = produceListItemsTask<MyTypeId>(async task => {
    producedTask = task;
  });

  const itemsSent: MyType[] = [];
  const itemSender = async (item: MyType) => {
    itemsSent.push(item);
  };

  const items: MyType[] = [{ id: "a" }, { id: "b" }, { id: "c" }, { id: "d" }];
  const itemsLister = async (_: number) => items;

  const consumerActions: ListItemsConsumerActions<MyType, MyTypeId> = {
    listItems: itemsLister,
    sendItem: itemSender,
    getItemId: myTypeIdGetter,
    produceListItemsTask: listItemsTaskProducer
  };

  const consumer = consumeListItemsTask<MyType, MyTypeId>(consumerActions);

  await consumer({
    type: "ListItemsTask",
    page: 1,
    itemIds: []
  });

  expect(producedTask).toBeDefined();
  expect(producedTask.itemIds).toEqual(
    expect.arrayContaining(items.map(i => i.id))
  );
});
