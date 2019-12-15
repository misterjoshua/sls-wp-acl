import WPAPI from "wpapi";

export interface ApiInformation {
  name: string;
  endpoint: string;
}

export function getApi(apiInfo: ApiInformation): WPAPI {
  return new WPAPI({
    endpoint: apiInfo.endpoint
  });
}
