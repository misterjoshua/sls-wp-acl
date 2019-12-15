import "source-map-support/register";
import { APIGatewayProxyHandler, ScheduledHandler } from "aws-lambda";
import { makeSQSHandler } from "./src/util";
import { srcResyncApi } from "./src/itemSync/lambda/resyncApi";
import { srcResyncAllApi } from "./src/itemSync/lambda/resyncAllApi";
import { srcResyncScheduler } from "./src/itemSync/lambda/resyncScheduler";
import { srcPutItemApi } from "./src/itemSync/lambda/putItemApi";
import { srcDeleteItemApi } from "./src/itemSync/lambda/deleteItemApi";
import { runListItemsTask } from "./src/itemSync/tasks/listItems/listItemsTask";
import { runGetItemTask } from "./src/itemSync/tasks/getItem/getItemTask";

export const resyncApi: APIGatewayProxyHandler = srcResyncApi;
export const resyncAllApi: APIGatewayProxyHandler = srcResyncAllApi;
export const putItemApi: APIGatewayProxyHandler = srcPutItemApi;
export const deleteItemApi: APIGatewayProxyHandler = srcDeleteItemApi;

export const resyncScheduler: ScheduledHandler = srcResyncScheduler;

// Lambda handlers.
export const listItemsTask = makeSQSHandler(runListItemsTask);
export const getItemTask = makeSQSHandler(runGetItemTask);
