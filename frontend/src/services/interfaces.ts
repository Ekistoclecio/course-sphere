export type LessonStatus = 'published' | 'draft' | 'archived';
export interface ApiErrorResponse {
  message: string | string[];
  error: string;
  statusCode: number;
}

export interface PaginationRequest {
  offset: number;
  limit: number;
}

export interface PaginationResponse {
  total: number;
  offset: number;
  count: number;
}

export interface FilterLessonParams extends PaginationRequest {
  course_id: number;
  search?: string;
  status?: LessonStatus;
}
