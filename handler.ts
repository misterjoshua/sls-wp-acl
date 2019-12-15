import "source-map-support/register";
import { APIGatewayProxyHandler, ScheduledHandler } from "aws-lambda";
import { makeSQSHandler } from "./src/util";
import { runListItemsTask } from "./src/tasks/listItemsTask";
import { runGetItemTask } from "./src/tasks/getItemTask";
import { srcResyncApi } from "./src/lambda/resyncApi";
import { srcResyncAllApi } from "./src/lambda/resyncAllApi";
import { srcResyncScheduler } from "./src/lambda/resyncScheduler";

export const resyncApi: APIGatewayProxyHandler = srcResyncApi;
export const resyncAllApi: APIGatewayProxyHandler = srcResyncAllApi;
export const resyncScheduler: ScheduledHandler = srcResyncScheduler;

// Lambda handlers.
export const listItemsTask = makeSQSHandler(runListItemsTask);
export const getItemTask = makeSQSHandler(runGetItemTask);
