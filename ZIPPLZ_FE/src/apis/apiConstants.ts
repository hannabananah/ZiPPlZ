export const BASE_URL: string = import.meta.env.VITE_BASE_URL;

export const END_POINT = {
  //로그인 회원가입
  LOGIN: 'login',
  SIGNUP: 'users/join',
  //기타
  DEFAULT: 'default',
  SIDO: 'default/sido',
  GUGUN: (sidocode: number) => `default/sido/${sidocode}`,
} as const;

export const HTTP_STATUS_CODE = {
  SUCCESS: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  CONTENT_TOO_LARGE: 413,
  INTERNAL_SERVER_ERROR: 500,
} as const;
