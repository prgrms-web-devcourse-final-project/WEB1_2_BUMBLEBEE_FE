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
  memberAge: bigint;
  memberSex: string;
  memberEmail: string;
  memberPwd: string;
  memberRole: string;
  createdAt: string;
  deleteAt?: string;
}

export interface Review {
  reviewId: string;
  workPlaceId: bigint;
  reviewContent: string;
  reviewRating: number;
  createdAt: string;
  updateAt?: string;
}

export interface Reservation {
  memberId: bigint;
  studyroomId: bigint;
  reservationName: string;
  reservationPhoneNumber: string;
  reservationState: number; // enum
  numberOfPeople: bigint;
  reservationPrice: bigint;
  startTime: string;
  endTime: string;
  createdAt: string;
  updateAt: string;
}

export interface StudyRoom {
  workPlaceId: number;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  capacity: number;
  price: number;
}

export interface WorkPlace {
  businessId: number;
  workplaceName: string;
  workPlacePhoneNumber: string;
  workPlaceDescription: string;
  workPlaceAddress: string;
  workPlaceStartTime: string;
  workPlaceEndTime: string;
  createdAt: string;
  updatedAt?: string;
  startSum?: string;
}

export interface Business {
  businessName: string;
  businessPwd: string;
  businessEmail: string;
  businessRole: string;
  businessNum: string;
  createdAt: string;
  deleteAt?: string;
}

export interface Payment {
  paymentId: bigint;
  reservationId: number;
  orderId: string;
  orderName: string;
  method: number;
  paymentKey: string;
  totalAmount: number;
}
