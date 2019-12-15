import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import { sendListItemsCommandForAllApis } from "./handler";

export const srcResyncAllApi: APIGatewayProxyHandler = async (): Promise<APIGatewayProxyResult> => {
  const apiInfos = await sendListItemsCommandForAllApis();

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Queued sucessfully",
      apis: apiInfos.map(apiInfo => apiInfo.name)
    })
  };
};
