import { Key } from "aws-sdk/clients/dynamodb";
import { db, searchApiTypeItems } from "../dynamodb";
import { deleteStoredItem } from "./deleteStoredItem";

export const cleanUnknownStoredItems = async (
  apiType: string,
  knownIds: number[],
  lastEvaluatedKey: Key = undefined
): Promise<void> => {
  const result = await db
    .scan(searchApiTypeItems(apiType, lastEvaluatedKey))
    .promise();

  await Promise.all(
    result.Items.map(async item => {
      const apiTypeId = item.ApiTypeId.S;
      const [, , itemId] = apiTypeId.split(":");

      if (knownIds.indexOf(parseInt(itemId)) < 0) {
        console.log(`Deleting ${apiTypeId}`);
        await deleteStoredItem(apiTypeId);
      }
    })
  );

  // Process the next page.
  if (result.LastEvaluatedKey) {
    await cleanUnknownStoredItems(apiType, knownIds, result.LastEvaluatedKey);
  }
};
