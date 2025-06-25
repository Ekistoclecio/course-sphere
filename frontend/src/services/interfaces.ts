export interface ApiErrorResponse {
  message: string | string[];
  error: string;
  statusCode: number;
}

export interface PaginationRequest {
  offset: number;
  limit: number;
}
