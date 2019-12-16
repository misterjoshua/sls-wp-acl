import { SNSMessage } from "aws-lambda";
import { putStoredItem } from "../storedItems/putStoredItem";

export const runPutItemStoreTask = async (
  message: SNSMessage
): Promise<void> => {
  const apiTypeId = message.Subject;
  const itemString = message.Message;

  await putStoredItem(apiTypeId, itemString);
};
