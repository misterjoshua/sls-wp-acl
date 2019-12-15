import { WorkerTask, sendTask, listItemsTaskQueueUrl } from "./task";
import { sendGetItemTask } from "./getItemTask";
import { getApi } from "../wordpress/api";
import { ApiInformation } from "../config/ApiInformation";
import { sendKnownItems } from "../notifications/sendKnownItems";
import { getApiInformation } from "../config/getApiInformation";
import { listItems } from "../wordpress/item";

export interface ListItemsCommand extends WorkerTask {
  task: "ListItems";
  page: number;
  itemIds: number[];
}

export async function sendListItemsCommand(
  api: ApiInformation,
  type: string,
  page: number,
  itemIds: number[] = []
): Promise<void> {
  await sendTask(listItemsTaskQueueUrl, {
    task: "ListItems",
    api,
    type,
    page,
    itemIds: itemIds
  } as ListItemsCommand);
}

export async function runListItemsTask(task: ListItemsCommand): Promise<void> {
  console.log(`ListItems(${task.page}) = `, task);

  const apiInfo = await getApiInformation(task.api.name);
  const items = await listItems(getApi(apiInfo), task.type, task.page);
  console.log("Posts = ", items);

  await Promise.all(
    items.map(item => sendGetItemTask(apiInfo, task.type, item.id, item))
  );

  if (items.length > 0) {
    const nextPage = task.page + 1;
    console.log(`Getting page ${nextPage}`);

    // Queue up searching for the next page.
    await sendListItemsCommand(
      apiInfo,
      task.type,
      nextPage,
      task.itemIds.concat(items.map(p => p.id))
    );
  } else {
    // There are no more posts. Send all the known post IDs to the appropriate topic.
    const subject = `${apiInfo.name}:${task.type}`;
    await sendKnownItems(subject, task.itemIds);
  }
}

// const generateFakePostsForPage = (numPerPage: number, page: number) =>
//   [...Array(numPerPage).keys()].map(i => page * numPerPage + i);
