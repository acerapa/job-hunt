export type APIResponse<Data> = {
  data: Data;
  message: string;
  status: number;
};

export const formatResponse = <Data>(
  data: Data,
  message: string = "Success",
  status: number = 200
): APIResponse<Data> => {
  return {
    data,
    message,
    status,
  };
};
