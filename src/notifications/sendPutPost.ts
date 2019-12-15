import { putPostTopic, sendNotification } from "./sns";

export async function sendPutPost(postData: object): Promise<void> {
  await sendNotification(putPostTopic, postData);
}
