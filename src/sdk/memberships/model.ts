export interface Membership {
  id: string;
  userId: number;
  firstName: string;
  lastName: string;
  paid: boolean;
  discounted: boolean;
  attendance: number;
}