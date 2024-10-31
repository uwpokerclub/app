import { getEvent } from "../events";
import { getMembers } from "./getMembers";

import type { Membership } from "./model";

/**
 * getEligibleMembers returns a list of members who are eligible to join an event. The meaning "eligible" is
 *  any member that is not already registered for the event.
 *
 *  @param eventId The ID number of the event to get eligible members for.
 */
export async function getEligibleMembers(eventId: number): Promise<Membership[]> {
  const event = await getEvent(eventId);
  const members = await getMembers(event.semester.id);

  // Filter members list to remove any members who are already registered for the event
  const registeredIds = new Set(event.participants.map((p) => p.membershipId));
  const eligibleMembers = members.filter((m) => !registeredIds.has(m.id));

  // Return the filtered list
  return eligibleMembers;
}
