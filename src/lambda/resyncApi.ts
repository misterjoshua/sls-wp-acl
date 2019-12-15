import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import { getApiInformation } from "../config/getApiInformation";
import { sendListItemsCommandForTypes, wpTypes } from "./handler";
import { statusMessage } from "./statusMessage";

export const srcResyncApi: APIGatewayProxyHandler = async (
  event
): Promise<APIGatewayProxyResult> => {
  const apiName = event.pathParameters.apiName;

  await sendListItemsCommandForTypes(await getApiInformation(apiName), wpTypes);

  return statusMessage(200, `Queued ${apiName}`);
};
