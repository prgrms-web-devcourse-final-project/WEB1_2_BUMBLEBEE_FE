export type Room = {
  id: string;
  roomName: string;
  description: string;
  price: string;
  people: number;
  roomImages: { url: string; file: File }[];
};

export type Space = {
  spaceName: string;
  description: string;
  openTime: string;
  closedTime: string;
  phoneNumber: string;
  address: string;
  spaceImage: File | null;
  rooms: Room[];
};
