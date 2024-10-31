import type { Semester } from "../semesters";
import type { Structure } from "../structures";
import type { Participant } from "../participants";

export interface Event {
  id: number;
  name: string;
  format: string;
  notes: string;
  startDate: Date;
  rebuys: number;
  pointsMultiplier: number;
  state: number;
  semester: Semester;
  structure: Structure;
  participants: Participant[];
}
