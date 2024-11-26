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

export interface Member {
  memberNickname: string;
  memberPhonenumber: string;
  memberAge: number;
  memberSex: string;
  memberEmail: string;
  memberPwd: string;
  memberRole: string;
  createdAt: string;
  deleteAt?: string;
}

export interface Review {
  reviewId: string;
  reviewContent: string;
  reviewRating: number;
  createdAt: string;
  updateAt?: string;
}
