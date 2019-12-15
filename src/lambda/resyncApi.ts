import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import { getApiInformation } from "../config/getApiInformation";
import { sendListItemsCommandForTypes, wpTypes } from "./handler";

export const srcResyncApi: APIGatewayProxyHandler = async (
  event
): Promise<APIGatewayProxyResult> => {
  const apiName = event.pathParameters.apiName;

  await sendListItemsCommandForTypes(await getApiInformation(apiName), wpTypes);

  return {
    statusCode: 200,
    body: JSON.stringify(`Queued ${apiName} ${wpTypes[0]}s`)
  };
};
