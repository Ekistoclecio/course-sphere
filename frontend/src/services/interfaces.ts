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
