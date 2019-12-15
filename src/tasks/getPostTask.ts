import { WorkerTask, sendTask, getPostTaskQueueUrl } from "./task";
import { sendPutPost } from "../notifications/sendPutPost";
import { getApi, ApiInformation } from "../wordpress/api";
import { getApiInformation } from "../config/getApiInformation";
import { Post, getPost } from "../wordpress/post";

export interface GetPostTask extends WorkerTask {
  task: "GetPost";
  postID: number;
  post?: Post;
}

export async function sendGetPostTask(
  api: ApiInformation,
  postID: number,
  post: object = undefined
): Promise<void> {
  await sendTask(getPostTaskQueueUrl, {
    task: "GetPost",
    api,
    postID,
    post
  } as GetPostTask);
}

export async function runGetPostTask(task: GetPostTask): Promise<void> {
  console.log(`GetPost(${task.postID})`);

  const apiInfo = await getApiInformation(task.api.name);
  const post = task.post ?? (await getPost(getApi(apiInfo), task.postID));
  console.log("post = ", post);

  await sendPutPost({
    id: task.postID,
    post: post
  });
}
