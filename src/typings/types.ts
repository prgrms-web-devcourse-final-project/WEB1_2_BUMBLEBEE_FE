// 등록 시, 상태관리 타입
export type Room = {
  id: string;
  roomName: string;
  description: string;
  price: string;
  people: number;
  roomImages: { url: string; file: File | null }[];
};
// 등록 시, 상태관리 타입
export type Space = {
  spaceName: string;
  description: string;
  openTime: string;
  closedTime: string;
  phoneNumber: string;
  address: { basic: string; detail: string };
  spaceImage: { url: string; file: File | null };
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
  birthDay: string;
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
  capacity: number;
  price: number;
  startTime: Date;
  endTime: Date;
}

// 예약 정보
export interface Reservation {
  reservationId: number;
  workplaceId: number;
  workplaceName: string;
  workplaceImageUrl: string;
  studyRoomName: string;
  reservationCreatedAt: string;
  startTime: string;
  endTime: string;
  studyRoomCapacity: number;
  price: number;
}

// 리뷰 수정
export interface PutReviewRequestBody {
  reviewContent: string;
  reviewRating: number;
}

// 리뷰 작성
export interface PostReviewRequestBody extends PutReviewRequestBody {
  reservationId: number;
  workPlaceName: string;
}

// 리뷰 정보
export interface Review extends PostReviewRequestBody {
  reviewId: number;
  workplaceId: number;
  studyRoomName: string;
  reviewDate: string;
  // workplace img url: string;
}

// 스터디룸 등록
export interface StudyRoomData {
  studyRoomName: string;
  description: string;
  imageUrl: string;
  price: number;
  capacity: number;
}

// 스터디룸 수정
export interface StudyRoomPutData extends StudyRoomData {
  studyRoomId: number;
}

// 스터디룸 상세 정보
export interface StudyRoomDetail {
  studyRoomId: number;
  workplaceId: number;
  workplaceName: string;
  studyRoomName: string;
  description: string;
  imageUrl: string[];
  price: number;
  capacity: number;
}

// 사업장의 스터디룸(list) 찾기
export interface WorkplaceStudyRoomData {
  studyRoomId: number;
  studyRoomName: string;
  description: string;
  imageUrl: string;
  price: number;
  capacity: number;
}

// 스터디룸 상세 정보
export interface StudyRoomDetailData {
  studyRoomId: number;
  workplaceId: number;
  workplaceName: string;
  studyRoomName: string;
  description: string;
  imageUrl: string[];
  price: number;
  capacity: number;
}

// 스터디룸의 예약 가능한 시간대
export interface PossibleTime {
  capacity: number;
  possibleTime: string[];
  startTime: string;
  endTime: string;
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
  workplaceStartTime: string;
  workplaceEndTime: string;
  studyRoomList: {
    studyRoomName: string;
    description: string;
    price: number;
    capacity: number;
  }[];
}

// 사업장 수정
export interface WorkPlacePutData {
  workplaceId: number;
  workplaceName: string;
  workplacePhoneNumber: string;
  workplaceDescription: string;
  workplaceAddress: string;
  workplaceStartTime: string;
  workplaceEndTime: string;
}

export interface GetWorkPlaceData extends WorkPlaceData {
  workplaceId: number;
  createdAt: string;
  longitude: string;
  latitude: string;
  imageUrl: string;
  studyRoomList: {
    studyRoomName: string;
    description: string;
    imageUrl: string;
    price: number;
    capacity: number;
  }[];
}

// 사업장 위치
export interface MapPosition {
  topRight: { lat: number; lng: number };
  bottomLeft: { lat: number; lng: number };
}

export interface NowPosition {
  latitude: number;
  longitude: number;
}

export interface GetPositionWorkPlaceData {
  workplaceId: number;
  workplaceName: string;
  workplaceAddress: string;
  imageUrl: string;
  stars: number;
  reviewCount: number;
  positionLat: number; //
  positionLon: number;
  distance: number;
}

// 특정 사업자의 사업장
export interface GetBusinessWorkPlaceData {
  businessId: number;
  businessName: string;
  workplaces: GetWorkPlaceData[];
}

// 결제 검증 시 요청값
export interface OrderFormData {
  orderId: string;
  orderName: string;
  totalAmount: number;
  memberName: string;
  memberPhoneNum: string;
  tossPaymentMethod: string; // 'CARD'
}

// 결제 검증 시 응답값
export interface PostPaymentsData {
  orderId: string;
  orderName: string;
  amount: number;
  memberName: string;
  memberPhoneNum: string;
  tossPaymentMethod: 'CARD';
  successUrl: string;
  failUrl: string;
  failReason: string | null; // null허용
  cancelYN: boolean | null; // null허용
  cancelReason: string | null; // null허용
  createdAt: string | null; //  null허용
}

// 결제 성공 시 요청값
export interface PaymentsSuccess {
  paymentKey: string;
  orderId: string;
  amount: number;
}

// 결제 성공 시 응답값
export interface PaymentsSuccessData {
  mid: string;
  version: string;
  paymentKey: string;
  orderId: string;
  orderName: string;
  currency: string;
  method: string;
  totalAmount: string;
  balanceAmount: string;
  suppliedAmount: string;
  vat: string;
  status: string;
  requestedAt: string;
  approvedAt: string;
  useEscrow: string;
  cultureExpense: string;
  type: string;
}

// 결제 실패 시 요청값
export interface PaymentsFail {
  code: string;
  message: string;
  orderId: string;
}

// 결제 실패 시 응답값
export interface PaymentFailData {
  errorCode: string;
  errorMessage: string;
  orderId: string;
}
