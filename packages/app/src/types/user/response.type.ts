export type ResponseError = {
  field: string;
  message: string;
};
export type UserRegisterResponse = {
  register: {
    errors: ResponseError[];
  };
};

export type UserLoginResponse = {
  login: {
    errors: ResponseError[];
  };
};

export type UserRestorePasswordResponse = {
  sendRestorePasswordEmail: {
    message: string;
  };
};
