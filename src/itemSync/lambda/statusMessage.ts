import { APIGatewayProxyResult } from "aws-lambda";

export const statusMessage = (
  code,
  message,
  additional = undefined
): APIGatewayProxyResult => {
  return {
    statusCode: code,
    body: JSON.stringify({
      message: message,
      additional: additional
    })
  };
};
