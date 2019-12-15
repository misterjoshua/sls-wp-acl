import { AWS } from "../util";

export type TaskSender<TaskType> = (task: TaskType) => Promise<void>;

export const sqsSender = <TaskType>(queueUrl: string) => async (
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

export const snsPublisher = <MessageType>(topicArn: string) => async (
  message: MessageType
) => {
  const sns = new AWS.SNS({
    region: process.env.AWS_REGION
  });

  await sns
    .publish({
      TopicArn: topicArn,
      Message: JSON.stringify(message)
    })
    .promise();
};
