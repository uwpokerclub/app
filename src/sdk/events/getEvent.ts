import { sendRequest } from "../../lib";
import { GetSemesterResponse } from "../semesters/responses";
import { GetStructureResponse } from "../structures/responses";
import { ListParticipantsResponse } from "../participants/responses";
import { GetEventResponse } from "./responses";
import type { Event } from "./model";

export async function getEvent(eventId: number): Promise<Event> {
  const eventData = await sendRequest<GetEventResponse>(`events/${eventId}`);
  const semesterData = await sendRequest<GetSemesterResponse>(`semesters/${eventData.semesterId}`);
  const structureData = await sendRequest<GetStructureResponse>(`structures/${eventData.structureId}`);
  const participantsData = await sendRequest<ListParticipantsResponse>(`participants?eventId=${eventId}`);

  const event: Event = {
    ...eventData,
    startDate: new Date(eventData.startDate),
    semester: {
      ...semesterData,
      startDate: new Date(semesterData.startDate),
      endDate: new Date(semesterData.endDate),
    },
    structure: {
      ...structureData,
    },
    participants: participantsData.map((p) => ({
      ...p,
      signedOutAt: new Date(p.signedOutAt),
    })),
  };

  return event;
}
