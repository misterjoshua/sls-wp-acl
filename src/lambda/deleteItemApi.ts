import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import { sendDeleteItem } from "../notifications/sendDeleteItem";
import { statusMessage } from "./statusMessage";

export const srcDeleteItemApi: APIGatewayProxyHandler = async (
  event
): Promise<APIGatewayProxyResult> => {
  const { apiName, type, id } = event.pathParameters;

  const name = `${apiName}:${type}:${id}`;
  await sendDeleteItem(name);

  return statusMessage(200, `Received delete for ${name}`);
};
