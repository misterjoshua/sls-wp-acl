import { SQSHandler } from "aws-lambda";
import * as RealAWS from "aws-sdk";
import * as AWSXRay from "aws-xray-sdk";

export const delay = async (msec: number) =>
  new Promise(resolve => setTimeout(resolve, msec));

// Creates second order lambda handler functions for SQS queues events.
export function makeSQSHandler<RecordType>(
  handler: (record: RecordType) => Promise<any>
): SQSHandler {
  return async (event, _context) => {
    await Promise.all(
      event.Records.map(async record => {
        const body: RecordType = JSON.parse(record.body);
        await handler(body);
      })
    );
  };
}

export const AWS = AWSXRay.captureAWS(RealAWS);
