import { ScheduledHandler } from "aws-lambda";
import { sendListItemsCommand } from "../tasks/listItemsTask";
import { getApiInformation } from "../config/getApiInformation";
import { wpTypes, defaultApiName } from "./handler";

export const srcResyncScheduler: ScheduledHandler = async (_, _context) => {
  await sendListItemsCommand(
    await getApiInformation(defaultApiName),
    wpTypes[0],
    1
  );
};
