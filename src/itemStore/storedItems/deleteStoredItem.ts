import { DeleteItemInput } from "aws-sdk/clients/dynamodb";
import { itemStoreTable, db } from "../dynamodb";

export async function deleteStoredItem(apiTypeId: string) {
  const request: DeleteItemInput = {
    TableName: itemStoreTable,
    Key: {
      ApiTypeId: { S: apiTypeId }
    }
  };
  await db.deleteItem(request).promise();
}
