export const BASE_URL: string = 'https://i11a602.p.ssafy.io/';

export const END_POINT = {
  //로그인 회원가입
  LOGIN: 'users/login',
  SIGNUP: 'users/join',
  //기타
  DEFAULT: 'default',
  SIDO: 'default/sido',
  GUGUN: (sidocode: number) => `default/sido/${sidocode}`,

  //스케줄러
  PLAN: 'schedule/plans',
  PLAN_SERIAL: (planSerial: number) => `schedule/plans/${planSerial}`,
  WORK: (planSerial: number) => `schedule/plans/${planSerial}/works`,
  WORK_SERIAL: (planSerial: number, workSerial: number) =>
    `schedule/plans/${planSerial}/works/${workSerial}`,
  WORKS_USERS: 'schedule/users/works',
  //시공자 리스트
  WORKER_LIST: 'workerlist/portfolios',
  WORKER_LIST_SEARCH: (name: string) => `workerlist/portfolios/${name}`,

  //구인구직글
  FIND_WORKER_LIST: 'board/findworker',
  FIND_WORKER_BOARD: (boardSerial: number) =>
    `board/findworker/list/${boardSerial}`,

  //포트폴리오
  PORTFOLIO: (serial: number) => `portfolio/${serial}`,
  PORTFOLIO_LIST: (serial: number) => `portfolio/list/${serial}`,
  PORTFOLIO_SERIAL: (portfolioSerial: number) => `portfolio/${portfolioSerial}`,
  PORTFOLIO_SCHEDULE: (workerSerial: number) =>
    `portfolio/schedule/${workerSerial}`,
  PORTFOLIO_REVIEW: (serial: number) => `portfolio/review/${serial}`,

  //리뷰
  COMMENT: 'comment',
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
