import { sendNotification } from "./sns";

export const deleteItemTopic = process.env.deleteItemTopic;

export async function sendDeleteItem(subject: string): Promise<void> {
  await sendNotification(deleteItemTopic, subject, undefined);
}
