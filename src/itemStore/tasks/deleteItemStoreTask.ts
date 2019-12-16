import { SNSMessage } from "aws-lambda";
import { deleteStoredItem } from "../storedItems/deleteStoredItem";

export const runDeleteItemStoreTask = async (
  message: SNSMessage
): Promise<void> => {
  const apiTypeId = message.Subject;

  await deleteStoredItem(apiTypeId);
};
