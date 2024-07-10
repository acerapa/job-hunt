import { ApiResponse } from '@acerapa/job-hunt-shared-types'

export const formatResponse = <Data>(
  data: Data,
  message: string = "Success",
  status: number = 200
): ApiResponse<Data> => {
  return {
    data,
    message,
    status,
  };
};
