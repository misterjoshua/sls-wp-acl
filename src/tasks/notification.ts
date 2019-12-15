import { AWS } from "../util";

type NotificationMessage = object | string;
export async function sendNotification(
  topic: string,
  subject: string,
  message: NotificationMessage
): Promise<void> {
  const sns = new AWS.SNS({
    region: process.env.AWS_REGION
  });

  console.log(`Notifying ${topic} with message = `, message);

  await sns
    .publish({
      TopicArn: topic,
      Subject: subject,
      Message: JSON.stringify(message)
    })
    .promise();
}
