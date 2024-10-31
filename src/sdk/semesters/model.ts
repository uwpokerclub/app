export interface Semester {
  id: string;
  name: string;
  meta: string;
  startDate: Date;
  endDate: Date;
  startingBudget: number;
  currentBudget: number;
  membershipFee: number;
  membershipDiscountFee: number;
  rebuyFee: number;
}
