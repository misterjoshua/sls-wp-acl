import { AWS } from "../util";
import { ApiInformation } from "../wordpress/api";

export const listPostsTaskQueueUrl = process.env.listPostsTaskQueueUrl;
export const getPostTaskQueueUrl = process.env.getPostTaskQueueUrl;

export interface WorkerTask {
  task: string;
  api: ApiInformation;
}

export async function sendTask(
  queueUrl: string,
  task: WorkerTask
): Promise<void> {
  const sqs = new AWS.SQS({
    region: process.env.AWS_REGION
  });

  await sqs
    .sendMessage({
      QueueUrl: queueUrl,
      MessageBody: JSON.stringify(task)
    })
    .promise();
}
