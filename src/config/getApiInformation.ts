import { ApiInformation } from "./ApiInformation";
import { configRoot, ssm } from "./ssm";

export async function getApiInformation(name: string): Promise<ApiInformation> {
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
