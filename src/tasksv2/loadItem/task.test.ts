import {
  produceLoadItemTask,
  LoadItemTask,
  consumeLoadItemTask,
  ItemGetter
} from "./task";

type MyItemType = string;
type MyItemId = string;

const myItemGetter: ItemGetter<MyItemType, MyItemId> = async (
  itemId: MyItemId
) => {
  return {
    foo: "bar",
    baz: "xyz"
  }[itemId];
};

it("should produce and send a task with the requested id", async () => {
  type IdType = number;
  const id: IdType = 1234;
  let sentTask: LoadItemTask<IdType> = undefined;
  await produceLoadItemTask<number>(async task => {
    sentTask = task;
  })(id);
  expect(sentTask.itemId).toBe(id);
});

it("should send the correct item after loading it", async () => {
  let sentItem: MyItemType = undefined;

  const actions = {
    getItem: myItemGetter,
    sendItemLoaded: async (item: MyItemId): Promise<void> => {
      sentItem = item;
    }
  };

  await consumeLoadItemTask<MyItemType, MyItemId>(actions)({
    type: "LoadItemTask",
    itemId: "foo"
  });

  expect(sentItem).toBeDefined();
  expect(sentItem).toBe("bar");
});

it("should consume the correct item from the api", async () => {
  let loadedItem: MyItemType = undefined;

  const actions = {
    getItem: myItemGetter,
    sendItemLoaded: async item => {
      loadedItem = item;
    }
  };
  const consumer = consumeLoadItemTask<MyItemType, MyItemId>(actions);

  const producer = produceLoadItemTask<MyItemId>(
    async task => await consumer(task)
  );

  await producer("foo");
  expect(loadedItem).toBe("bar");

  await producer("baz");
  expect(loadedItem).toBe("xyz");
});
