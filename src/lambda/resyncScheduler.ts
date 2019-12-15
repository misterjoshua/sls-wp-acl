import { ScheduledHandler } from "aws-lambda";
import { sendListItemsCommandForAllApis } from "./handler";

export const srcResyncScheduler: ScheduledHandler = async () => {
  await sendListItemsCommandForAllApis();
};
