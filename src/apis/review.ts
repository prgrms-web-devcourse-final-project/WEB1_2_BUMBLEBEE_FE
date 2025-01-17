import {
  DetailReview,
  PostReviewRequestBody,
  PutReviewRequestBody,
  Review,
} from '@typings/types';
import { authInstance, defaultInstance } from '.';

// 상세페이지 리뷰 전체 목록 조회(비로그인)
export const getAllReview = async (
  workplaceId: number,
  nextCursor?: number,
): Promise<{ data: DetailReview[]; nextCursor: number }> => {
  const response = await defaultInstance.get(
    `/api/v1/review/workplace/${workplaceId}`,
    {
      params: nextCursor ? { lastId: nextCursor } : {},
    },
  );
  return response.data;
};

// 내가 작성한 리뷰 조회 - 로그인
export const getMyReview = async (): Promise<Review[]> => {
  const response = await authInstance.get('/api/v1/review/me');
  return response.data;
};

// 리뷰 작성
export const postReview = async (
  data: PostReviewRequestBody,
): Promise<void> => {
  await authInstance.post('/api/v1/review/register', data);
};

// 리뷰 수정
export const putEditReview = async (
  reviewId: number,
  workplaceName: string,
  data: PutReviewRequestBody,
): Promise<Review> => {
  const response = await authInstance.put(
    `/api/v1/review/update/${reviewId}?workplaceName=${workplaceName}`,
    data,
  );
  return response.data;
};

// 리뷰 삭제
export const deleteReview = async (
  reviewId: number,
  workplaceName: string,
): Promise<void> => {
  await authInstance.delete(
    `/api/v1/review/${reviewId}?workplaceName=${workplaceName}`,
  );
};
