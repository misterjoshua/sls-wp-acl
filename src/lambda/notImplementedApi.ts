import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import { statusMessage } from "./statusMessage";

export const notImplementedApi: APIGatewayProxyHandler = async (): Promise<APIGatewayProxyResult> => {
  return statusMessage(500, "Not implemented");
};
