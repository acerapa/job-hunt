export interface ApiResponse<Data = Object> {
  data: Data
  message: string
  status: number
}
