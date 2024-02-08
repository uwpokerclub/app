export type Event = {
  id: string;
  name: string;
  startDate: Date;
  format: string;
  notes: string;
  semesterId: string;
  state: number;
  count?: number;
  rebuys: number;
  pointsMultiplier: number;
  structureId: number;
};
