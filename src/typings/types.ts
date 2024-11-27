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

// 일반 사용자
export interface Member {
  // memberId: bigint;
  memberNickname: string;
  memberPhonenumber: string;
  memberAge: number; // bigint
  memberSex: string;
  memberEmail: string;
  memberPwd: string;
  memberRole: string;
  createdAt: string;
  deleteAt?: string;
}

// 사업자
export interface Business {
  // businessId: bigint;
  businessName: string;
  businessPwd: string;
  businessEmail: string;
  businessRole: string;
  businessNum: string;
  createdAt: string;
  deleteAt?: string;
}

// 리뷰
export interface Review {
  reviewId: string;
  memberId: number; // bigint
  workPlaceId: number; // bigint
  reviewContent: string;
  reviewRating: number;
  createdAt: string;
  updateAt?: string;
}

// 예약
export interface Reservation {
  reservationId: number; // bigint
  memberId: number; // bigint
  studyroomId: number; // bigint
  reservationName?: string;
  reservationPhoneNumber?: string;
  reservationState: number; // enum
  numberOfPeople: number; // bigint
  reservationPrice: number; // bigint
  startTime: string;
  endTime: string;
  createdAt: string;
  updateAt?: string;
}

// 스터디룸
export interface StudyRoom {
  studyroomId: number; // bigint
  workPlaceId: number; // bigint
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  capacity: number;
  price: number;
  studyRoomImage: string[]; // erd상에서 타입 미정
}

// 사업장
export interface WorkPlace {
  workPlaceId: number; // bigint
  businessId: number; // bigint
  workplaceName: string;
  workplaceImage: string; // erd상에서 타입 미정
  workPlacePhoneNumber: string;
  workPlaceDescription: string;
  workPlaceAddress: string;
  workPlaceStartTime: string;
  workPlaceEndTime: string;
  createdAt: string;
  updatedAt?: string;
  startSum?: number; // bigint
}

// 결제
export interface Payment {
  paymentId: number; // bigint
  reservationId: number; // bigint
  orderId: string;
  orderName: string;
  method: number; // enum
  paymentKey: string;
  totalAmount: number;
  requestedAt: string;
  approvedAt: string;
  status: number; // enum
}

// 사용자 알림
export interface Alarm {
  // id?: bigint; // erd상에서 타입 미정
  memberId: number; // bigint
  message?: string; // erd상에서 타입 미정
  createdAt?: string; // erd상에서 타입 미정
}

// 사업자 알림
export interface BusinessAlarm {
  // key?: bigint; // erd상에서 타입 미정
  businessId: number; // bigint
  businessMessage: string;
  createdAt: string;
}

// 채팅방
export interface ChatRoom {
  chatroomId: number; // bigint
  memberId: number; // bigint
  chatTitle: string;
}

// 채팅
export interface Chat {
  chatId: number; // bigint
  chatroomId: number; // bigint
  message: string;
  createdAt: string;
  readYn?: boolean;
  deleteYn?: boolean;
}
