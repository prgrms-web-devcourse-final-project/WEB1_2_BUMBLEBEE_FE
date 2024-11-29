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

// 사용자 회원가입
export interface UserSignUpData {
  nickName: string;
  phoneNumber: string;
  sex: string;
  email: string;
  pwd: string;
  birthDay: string;
}

// 사업자 회원가입
export interface BusinessSignUpData {
  businessName: string;
  businessEmail: string;
  businessPwd: string;
  businessNum: string;
}

// 사용자 로그인
export interface LoginData {
  email: string;
  password: string;
}

// 사업자
export interface Business {
  businessName: string;
  businessEmail: string;
  businessNum: string;
  createdAt?: string;
}

// 사업자 알림
export interface BusinessAlarm {}

// 사용자
export interface Member {
  nickName: string;
  phoneNumber: string;
  birthDay: Date;
  sex: string;
  email: string;
  createdAt?: string;
}

// 사용자 알림
export interface Alarm {}

// 예약 등록
export interface PostReservationData {
  reservationName: string;
  reservationPhoneNumber: string;
  reservationCapacity: number;
  reservationPrice: number;
  startTime: Date;
  endTime: Date;
}

// 예약 정보
export interface GetAllReservation {
  workplaceName: string;
  reservationCreatedAt: Date;
  startTime: Date;
  endTime: Date;
  studyRoomCapacity: number;
  price: number;
  studyRoomUrl: string;
}

export interface GetAllReservationData {
  reservations: GetAllReservation[];
}

// 리뷰 작성, 수정
export interface PostReviewRequestBody {
  workplaceId: number;
  reviewContent: string;
  reviewRating: number;
}

// 리뷰 정보
export interface Review extends PostReviewRequestBody {
  reviewId: number;
  workplaceName: string;
  reviewDate: Date;
}

// 스터디룸 정보
export interface StudyRoomData {
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  capacity: number;
}

// 스터디룸 수정
export interface StudyRoomPutData extends StudyRoomData {
  studyRoomId: number;
}

export interface WorkplaceStudyRoomData {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  capacity: number;
}

// 스터디룸 검색
export interface SearchStudyRoom {
  workplaceAddress: string;
  startTime: string;
  endTime: string;
  capacity: number;
}

// 스터디룸 검색 결과
export interface SearchStudyRoomData {
  workplaceName: string;
  averageReviewScore: number;
  studyRoomTitle: string;
  workplaceAddress: string;
  studyRoomCapacity: number;
  studyRoomPrice: number;
  imageUrl: string;
}

// 사업장
export interface WorkPlaceData {
  workplaceName: string;
  workplacePhoneNumber: string;
  workplaceDescription: string;
  workplaceAddress: string;
  imageUrl: string;
  workplaceStartTime: string;
  workplaceEndTime: string;
}

// 사업장 수정
export interface WorkPlacePutData extends WorkPlaceData {
  workplaceId: number;
}

export interface GetWorkPlaceData extends WorkPlacePutData {
  createdAt: string;
  longitude: string;
  latitude: string;
}

// 사업장 위치
export interface GetPositionWorkPlace {
  topLeft: { lat: number; lng: number };
  bottomRight: { lat: number; lng: number };
  positionLat: number;
  positionLng: number;
}

export interface GetPositionWorkPlaceData {
  workplaceId: number;
  workplaceName: string;
  workplaceAddress: string;
  imageUrl: string;
  stars: number;
  reviewCount: number;
  distance: number;
}

export interface GetPositionWorkPlaceList {
  workplaces: GetPositionWorkPlaceData[];
}

// 특정 사업자의 사업장
export interface GetBusinessWorkPlaceData {
  businessId: number;
  businessName: string;
  workplaces: GetWorkPlaceData[];
}
