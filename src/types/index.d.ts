export * from "./semester";
export * from "./rankings";
export * from "./user";
export * from "./event";
export * from "./entry";
export * from "./membership";
export * from "./transaction";

export type APIErrorResponse = {
  code: number;
  type: string;
  message: string;
};