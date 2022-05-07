export type Entry = {
  id: string;
  user_id: string;
  event_id: string;
  first_name: string;
  last_name: string;
  signed_out_at?: Date;
  placement?: number;
  membership_id: string;
  rebuys: number;
};

export type ListEntriesForEvent = {
  participants: Entry[];
};