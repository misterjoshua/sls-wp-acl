import { WorkerTask, sendTask, getItemTaskQueueUrl } from "../task";
import { sendPutItem } from "./sendPutItem";
import { getApi } from "../../wordpress/api";
import { ApiInformation } from "../../config/ApiInformation";
import { getApiInformation } from "../../config/getApiInformation";
import { Item, getItem } from "../../wordpress/item";

export interface GetItemTask extends WorkerTask {
  task: "GetItem";
  type: string;
  id: number;
  item?: Item;
}

export async function sendGetItemTask(
  api: ApiInformation,
  type: string,
  id: number,
  item: object = undefined
): Promise<void> {
  await sendTask(getItemTaskQueueUrl, {
    task: "GetItem",
    api,
    type,
    id,
    item
  } as GetItemTask);
}

export async function runGetItemTask(task: GetItemTask): Promise<void> {
  console.log(`GetItem(${task.id})`);

  const apiInfo = await getApiInformation(task.api.name);
  const post =
    task.item ?? (await getItem(getApi(apiInfo), task.type, task.id));
  console.log("post = ", post);

  const name = `${apiInfo.name}:${task.type}:${post.id}`;
  await sendPutItem(name, post);
}
