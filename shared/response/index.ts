export interface ApiResponse<Data> {
  data: Data;
  message: string;
  status: number;
}

export interface LoginResponseData {
  authenticated: boolean;
  access: string;
  refresh: string;
  user_id: string;
}
