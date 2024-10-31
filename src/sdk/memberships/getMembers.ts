import { sendRequest } from "../../lib";
import type { ListMembershipsResponse } from "./responses";
import type { Membership } from "./model";

/**
 * getMembers fetches all memberships for a given semester.
 *
 * @param semesterId The UUID of the semester.
 */
export async function getMembers(semesterId: string): Promise<Membership[]> {
  const membershipData = sendRequest<ListMembershipsResponse>(`memberships?semesterId=${semesterId}`);
  return membershipData;
}
