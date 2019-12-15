import { sendNotification } from "./sns";
import { Item } from "../wordpress/item";

export const putItemTopic = process.env.putItemTopic;

export async function sendPutItem(subject: string, item: Item): Promise<void> {
  await sendNotification(putItemTopic, subject, item);
}
