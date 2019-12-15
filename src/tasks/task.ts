import { AWS } from "../util";
import { ApiInformation } from "../wordpress/api";

export const listItemsTaskQueueUrl = process.env.listItemsTaskQueueUrl;
export const getItemTaskQueueUrl = process.env.getItemTaskQueueUrl;

export interface WorkerTask {
  task: string;
  api: ApiInformation;
  type: string;
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
