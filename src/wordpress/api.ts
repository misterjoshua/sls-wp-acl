import WPAPI from "wpapi";
import { ApiInformation } from "../config/ApiInformation";

export function getApi(apiInfo: ApiInformation): WPAPI {
  return new WPAPI({
    endpoint: apiInfo.endpoint
  });
}
