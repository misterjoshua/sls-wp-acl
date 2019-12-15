import { WorkerTask, sendTask, listPostsTaskQueueUrl } from "./task";
import { sendGetPostTask } from "./getPostTask";
import { ApiInformation, getApi } from "../wordpress/api";
import { sendKnownPosts } from "../notifications/sendKnownPosts";
import { getApiInformation } from "../config/getApiInformation";
import { listPosts } from "../wordpress/post";

export interface ListPostsCommand extends WorkerTask {
  task: "ListPosts";
  page: number;
  postIDs: number[];
}

export async function sendListPostsCommand(
  api: ApiInformation,
  page: number,
  postIDs: number[] = []
): Promise<void> {
  await sendTask(listPostsTaskQueueUrl, {
    task: "ListPosts",
    api,
    page,
    postIDs
  } as ListPostsCommand);
}

export async function runListPostsTask(task: ListPostsCommand): Promise<void> {
  console.log(`ListPosts(${task.page}) = `, task);

  const apiInfo = await getApiInformation(task.api.name);
  const posts = await listPosts(getApi(apiInfo), task.page);
  console.log("Posts = ", posts);

  await Promise.all(posts.map(post => sendGetPostTask(apiInfo, post.id, post)));

  if (posts.length > 0) {
    const nextPage = task.page + 1;
    console.log(`Getting page ${nextPage}`);

    // Queue up searching for the next page.
    await sendListPostsCommand(
      apiInfo,
      nextPage,
      task.postIDs.concat(posts.map(p => p.id))
    );
  } else {
    // There are no more posts. Send all the known post IDs to the appropriate topic.
    await sendKnownPosts(task.postIDs);
  }
}

// const generateFakePostsForPage = (numPerPage: number, page: number) =>
//   [...Array(numPerPage).keys()].map(i => page * numPerPage + i);
