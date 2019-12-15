import { AWS } from "../util";

export const putPostTopic = process.env.putPostTopic;
export const knownPostsTopic = process.env.knownPostsTopic;

type NotificationMessage = object | string;
export async function sendNotification(
  topic: string,
  message: NotificationMessage
): Promise<void> {
  const sns = new AWS.SNS({
    region: process.env.AWS_REGION
  });

  console.log(`Notifying ${topic} with message = `, message);

  await sns
    .publish({
      TopicArn: topic,
      Message: JSON.stringify(message)
    })
    .promise();
}
