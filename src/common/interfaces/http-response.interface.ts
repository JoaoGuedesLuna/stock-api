export interface HttpResponse<T = undefined> {
  success: boolean;
  status: number;
  timestamp: string;
  path: string;
  message?: string;
  data?: T;
}
