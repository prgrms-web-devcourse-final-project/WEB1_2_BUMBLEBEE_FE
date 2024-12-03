import { PostReviewRequestBody, Review } from '@typings/types';
import { authInstance, defaultInstance } from '.';

// 상세페이지 리뷰 전체 목록 조회(비로그인)
export const getAllReview = async (
  workplaceId: string,
  lastId?: string,
  nextcursor?: string,
): Promise<Review[]> => {
  const response = await defaultInstance.get(
    `/api/vi/review/workplace/${workplaceId}`,
    {
      params: {
        lastId: lastId || null,
        nextcusor: nextcursor || null,
      },
    },
  );
  return response.data;
};

// 상세페이지 리뷰 전체 목록 조회(비로그인) - 첫 페이지 요청
export const getFirstPage = async (workplaceId: string) => {
  const firstPageReviews = await getAllReview(workplaceId);
  return firstPageReviews;
};

// 상세페이지 리뷰 전체 목록 조회(비로그인) - 첫 페이지 이후 다음 페이지들 요청
export const getNextPage = async (
  workplaceId: string,
  lastId: string,
  nextcursor: string,
) => {
  const nextPageReviews = await getAllReview(workplaceId, lastId, nextcursor);
  return nextPageReviews;
};

// 내가 작성한 리뷰 조회 - 로그인
export const getMyReview = async (): Promise<Review[]> => {
  const response = await authInstance.get('/api/vi/review/me');
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
  reviewId: string,
  data: PostReviewRequestBody,
): Promise<Review> => {
  const response = await authInstance.put(
    `/api/v1/review/update/${reviewId}`,
    data,
  );
  return response.data;
};

// 리뷰 삭제
export const deleteReview = async (reviewId: string): Promise<void> => {
  await authInstance.delete(`/api/v1/review/${reviewId}`);
};
