export interface ResponseData<T = undefined> {
  data?: T | null;
  message?: string;
}
