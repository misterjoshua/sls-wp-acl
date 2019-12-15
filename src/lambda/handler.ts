import "source-map-support/register";
import { sendListItemsCommand } from "../tasks/listItemsTask";
import { ApiInformation } from "../config/ApiInformation";
import { listApiInformation } from "../config/listApiInformation";

export const defaultApiName = "fairway";
export const wpTypes = ["posts", "categories", "pages", "tags", "users"];

export const sendListItemsCommandForTypes = async (
  apiInfo: ApiInformation,
  types: string[]
): Promise<void> => {
  await Promise.all(
    types.map(async type => await sendListItemsCommand(apiInfo, type, 1))
  );
};

export const sendListItemsCommandForAllApis = async (): Promise<ApiInformation[]> => {
  const apiInfos = await listApiInformation();

  await Promise.all(
    apiInfos.map(
      async apiInfo => await sendListItemsCommandForTypes(apiInfo, wpTypes)
    )
  );

  return apiInfos;
};
