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
  address: { basic: string; detail: string };
  spaceImage: File | null;
  rooms: Room[];
};

export interface StudyRoom {
  workPlaceId: number;
  businessId: number;
  workplaceName: string;
  workplaceImage: string;
  workPlacePhoneNumber: string;
  workPlaceDescription: string;
  workPlaceAddress: string;
  workPlaceStartTime: string; // 추후 수정
  workPlaceEndTime: string; // 추후 수정
  createdAt: string; // 추후 수정
  updateAt: string; // 추후 수정
  starSum: number;
}
