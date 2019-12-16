import "source-map-support/register";
import {
  APIGatewayProxyHandler,
  ScheduledHandler,
  SQSHandler
} from "aws-lambda";
import { makeSQSHandler } from "./src/util";
import { srcResyncApi } from "./src/itemSync/lambda/resyncApi";
import { srcResyncAllApi } from "./src/itemSync/lambda/resyncAllApi";
import { srcResyncScheduler } from "./src/itemSync/lambda/resyncScheduler";
import { srcPutItemApi } from "./src/itemSync/lambda/putItemApi";
import { srcDeleteItemApi } from "./src/itemSync/lambda/deleteItemApi";
import { runListItemsTask } from "./src/itemSync/tasks/listItems/listItemsTask";
import { runGetItemTask } from "./src/itemSync/tasks/getItem/getItemTask";
import { runKnownItemsStoreTask } from "./src/itemStore/tasks/knownItemsStoreTask";
import { runDeleteItemStoreTask } from "./src/itemStore/tasks/deleteItemStoreTask";
import { runPutItemStoreTask } from "./src/itemStore/tasks/putItemStoreTask";

/*
 * itemSync handlers.
 */
export const resyncApi: APIGatewayProxyHandler = srcResyncApi;
export const resyncAllApi: APIGatewayProxyHandler = srcResyncAllApi;
export const putItemApi: APIGatewayProxyHandler = srcPutItemApi;
export const deleteItemApi: APIGatewayProxyHandler = srcDeleteItemApi;
export const resyncScheduler: ScheduledHandler = srcResyncScheduler;
export const listItemsTask: SQSHandler = makeSQSHandler(runListItemsTask);
export const getItemTask: SQSHandler = makeSQSHandler(runGetItemTask);

/*
 * itemStore handlers.
 */
export const putItemStoreTask: SQSHandler = makeSQSHandler(runPutItemStoreTask);
export const deleteItemStoreTask: SQSHandler = makeSQSHandler(
  runDeleteItemStoreTask
);
export const knownItemsStoreTask: SQSHandler = makeSQSHandler(
  runKnownItemsStoreTask
);
