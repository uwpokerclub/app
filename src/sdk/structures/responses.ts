export type GetStructureResponse = {
  id: number;
  name: string;
  blinds: {
    small: number;
    big: number;
    ante: number;
    time: number;
  }[];
};
