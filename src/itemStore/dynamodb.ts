import { Key, ScanInput } from "aws-sdk/clients/dynamodb";
import { AWS } from "../util";

export const db = new AWS.DynamoDB({
  region: process.env.AWS_REGION
});

export const itemStoreTable = process.env.itemStoreTable;

export const searchApiTypeItems = (
  apiType: string,
  lastEvaluatedKey: Key = undefined
): ScanInput => ({
  TableName: itemStoreTable,
  ExclusiveStartKey: lastEvaluatedKey,
  FilterExpression: "begins_with(#ApiTypeId, :apiType)",
  ExpressionAttributeNames: {
    "#ApiTypeId": "ApiTypeId"
  },
  ExpressionAttributeValues: {
    ":apiType": { S: apiType }
  }
});
