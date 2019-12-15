import { sendNotification } from "../notification";

export const knownItemsTopic = process.env.knownItemsTopic;

export async function sendKnownItems(
  subject: string,
  itemIds: number[]
): Promise<void> {
  await sendNotification(knownItemsTopic, subject, itemIds);
}
