export type ResponseError = {
  field: string;
  message: string;
};
export type AuthRegisterResponse = {
  register: {
    accessToken?: string;
    refreshToken?: string;
    errors?: ResponseError[];
  };
};

export type AuthLoginResponse = {
  login: {
    accessToken?: string;
    refreshToken?: string;
    errors?: ResponseError[];
  };
};

export type AuthRestorePasswordResponse = {
  sendRestorePasswordEmail: {
    message: string;
  };
};

export type AuthRefreshTokenResponse = {
  refresh: {
    accessToken?: string;
    refreshToken?: string;
    errors?: ResponseError[];
  };
};
