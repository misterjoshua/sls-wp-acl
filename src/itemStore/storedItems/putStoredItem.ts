import { db, itemStoreTable } from "../dynamodb";
export async function putStoredItem(apiTypeId: string, itemString: string) {
  await db
    .putItem({
      TableName: itemStoreTable,
      Item: {
        ApiTypeId: { S: apiTypeId },
        ItemString: { S: itemString }
      }
    })
    .promise();
}
