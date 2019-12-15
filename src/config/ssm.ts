import { AWS } from "../util";

export const configRoot = process.env.configRoot;
export const ssm = new AWS.SSM({
  region: process.env.AWS_REGION
});
