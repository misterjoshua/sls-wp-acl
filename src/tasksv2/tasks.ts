import { AWS } from "../util";

export type TaskSender<TaskType> = (task: TaskType) => Promise<void>;

export const snsTaskSender = <TaskType>(queueUrl: string) => async (
  task: TaskType
): Promise<void> => {
  const sqs = new AWS.SQS({
    region: process.env.AWS_REGION
  });

  await sqs
    .sendMessage({
      QueueUrl: queueUrl,
      MessageBody: JSON.stringify(task)
    })
    .promise();
};
