import {
  APIGatewayProxyHandler,
  ScheduledHandler,
  APIGatewayProxyResult
} from "aws-lambda";
import "source-map-support/register";
import { makeSQSHandler } from "./src/util";
import { getApiInformation } from "./src/config/getApiInformation";
import {
  sendListItemsCommand,
  runListItemsTask
} from "./src/tasks/listItemsTask";
import { runGetItemTask } from "./src/tasks/getItemTask";
import { ApiInformation } from "./src/wordpress/api";

const defaultApiName = "fairway";
const wpTypes = ["posts", "categories", "pages", "tags", "users"];

const sendListItemsCommandForTypes = async (
  apiInfo: ApiInformation,
  types: string[]
): Promise<void> => {
  await Promise.all(
    types.map(async type => await sendListItemsCommand(apiInfo, type, 1))
  );
};

export const resyncApi: APIGatewayProxyHandler = async (
  event,
  _context
): Promise<APIGatewayProxyResult> => {
  const apiName = event.pathParameters.apiName;

  await sendListItemsCommandForTypes(await getApiInformation(apiName), wpTypes);

  return {
    statusCode: 200,
    body: JSON.stringify(`Queued ${apiName} ${wpTypes[0]}s`)
  };
};

export const resyncScheduler: ScheduledHandler = async (_, _context) => {
  await sendListItemsCommand(
    await getApiInformation(defaultApiName),
    wpTypes[0],
    1
  );
};

// Lambda handlers.
export const listItemsTask = makeSQSHandler(runListItemsTask);
export const getItemTask = makeSQSHandler(runGetItemTask);
