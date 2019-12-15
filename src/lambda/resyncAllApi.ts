import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import { sendListItemsCommandForAllApis } from "./handler";
import { statusMessage } from "./statusMessage";

export const srcResyncAllApi: APIGatewayProxyHandler = async (): Promise<APIGatewayProxyResult> => {
  const apiInfos = await sendListItemsCommandForAllApis();

  return statusMessage(200, "Queued successfully", {
    apis: apiInfos.map(apiInfo => apiInfo.name)
  });
};
