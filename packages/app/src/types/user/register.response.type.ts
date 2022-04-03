export type ResponseError = {
  field: string;
  message: string;
};
export type UserRegisterResponse = {
  register: {
    errors: ResponseError[];
  };
};
