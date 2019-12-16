import { SNSMessage } from "aws-lambda";
import { cleanUnknownStoredItems as cleanStoredItems } from "../storedItems/cleanUnknownStoredItems";

export const runKnownItemsStoreTask = async (
  message: SNSMessage
): Promise<void> => {
  const apiType = message.Subject;
  const knownIdsString = message.Message;
  const knownIds: number[] = JSON.parse(knownIdsString);

  await cleanStoredItems(apiType, knownIds);
};
