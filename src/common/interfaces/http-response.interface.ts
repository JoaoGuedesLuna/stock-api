export interface HttpResponse<T> {
  success: boolean;
  status: number;
  timestamp: string;
  path: string;
  message?: string;
  data?: T;
}
