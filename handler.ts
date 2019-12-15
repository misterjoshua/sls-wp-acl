import {
  APIGatewayProxyHandler,
  ScheduledHandler,
  APIGatewayProxyResult
} from "aws-lambda";
import "source-map-support/register";
import {
  sendListPostsCommand,
  runListPostsTask
} from "./src/tasks/listPostsTask";
import { runGetPostTask } from "./src/tasks/getPostTask";
import { makeSQSHandler } from "./src/util";
import { getApiInformation } from "./src/config/getApiInformation";

const defaultApiName = "fairway";

export const resyncApi: APIGatewayProxyHandler = async (
  event,
  _context
): Promise<APIGatewayProxyResult> => {
  const apiName = event.pathParameters.apiName;
  await sendListPostsCommand(await getApiInformation(apiName), 1);

  return {
    statusCode: 200,
    body: JSON.stringify(`Queued ${apiName}`)
  };
};

export const resyncScheduler: ScheduledHandler = async (_, _context) => {
  await sendListPostsCommand(await getApiInformation(defaultApiName), 1);
};

// Lambda handlers.
export const listPostsTask = makeSQSHandler(runListPostsTask);
export const getPostTask = makeSQSHandler(runGetPostTask);
