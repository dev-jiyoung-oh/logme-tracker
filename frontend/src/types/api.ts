export interface ApiError {
  message: string;
  code?: string;
  [key: string]: unknown;
}