import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import { sendGetItemTask } from "../tasks/getItemTask";
import { getApiInformation } from "../config/getApiInformation";
import { statusMessage } from "./statusMessage";

export const srcPutItemApi: APIGatewayProxyHandler = async (
  event
): Promise<APIGatewayProxyResult> => {
  const { apiName, type, id } = event.pathParameters;

  const api = await getApiInformation(apiName);
  const idNum = parseInt(id);

  await sendGetItemTask(api, type, idNum);

  return statusMessage(200, "Put item received");
};
