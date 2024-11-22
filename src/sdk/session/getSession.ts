import { sendRequest } from "../../lib";
import { GetSessionResponse } from "./responses";

export async function getSession() {
  const session = await sendRequest<GetSessionResponse>("session", "GET", false);
  return session;
}
