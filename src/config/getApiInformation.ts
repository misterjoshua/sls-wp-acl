import { AWS } from "../util";
import { ApiInformation } from "../wordpress/api";

const configRoot = process.env.configRoot;

export async function getApiInformation(name: string): Promise<ApiInformation> {
  const ssm = new AWS.SSM({
    region: process.env.AWS_REGION
  });

  const param = await ssm
    .getParameter({
      Name: `${configRoot}/${name}`
    })
    .promise();

  const apiInformation: ApiInformation = JSON.parse(param.Parameter.Value);

  if (!apiInformation.endpoint)
    throw new Error("API Information is missing an endpoint");
  if (!apiInformation.name)
    throw new Error("API Information is missing a name");

  return apiInformation;
}
