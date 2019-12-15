import { sendNotification, knownPostsTopic } from "./sns";

export async function sendKnownPosts(postIDs: number[]): Promise<void> {
  await sendNotification(knownPostsTopic, postIDs);
}
