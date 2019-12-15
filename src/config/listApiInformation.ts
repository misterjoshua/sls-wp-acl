import { ApiInformation } from "./ApiInformation";
import { ssm, configRoot } from "./ssm";

export const listApiInformation = async (
  token: string = undefined
): Promise<ApiInformation[]> => {
  const parameters = await ssm
    .getParametersByPath({
      Path: configRoot,
      NextToken: token
    })
    .promise();

  const apiInfos: ApiInformation[] = parameters.Parameters.map(param =>
    JSON.parse(param.Value)
  );

  if (parameters.NextToken)
    return apiInfos.concat(await listApiInformation(parameters.NextToken));
  else return apiInfos;
};
