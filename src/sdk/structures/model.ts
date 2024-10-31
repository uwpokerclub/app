export interface Blind {
  small: number;
  big: number;
  ante: number;
  time: number;
}

export interface Structure {
  id: number;
  name: string;
  blinds: Blind[];
}
