import { sendRequest } from "../../lib";

export async function endEvent(eventId: string) {
  await sendRequest(`events/${eventId}/end`, "POST");
}
