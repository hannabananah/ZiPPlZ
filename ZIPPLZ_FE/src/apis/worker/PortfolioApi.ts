import { END_POINT } from '../apiConstants';
import { axiosInstance } from '../axiosInstance';

interface Portfolio {
  publickRelation: string;
  career: number;
  asPeriod: number;
  company: string;
  companyAddress: string;
  businessNumber: string;
}
//시공자별 포트폴리오 목록 조회
export const getPortfolioList = async (userSerial: number) => {
  return await axiosInstance.get(END_POINT.PORTFOLIO_LIST(userSerial));
};

//포트폴리오 상세조회
export const getPortfolitDetail = async (portfolioSerial: number) => {
  return await axiosInstance.get(END_POINT.PORTFOLIO(portfolioSerial));
};
//포트폴리오 수정
export const updatePortfolio = async (
  portfolioSerial: number,
  data: Portfolio
) => {
  return await axiosInstance.patch(END_POINT.PORTFOLIO(portfolioSerial), data);
};
//포트폴리오 삭제
export const deletePortfolio = async (portfolioSerial: number) => {
  return await axiosInstance.delete(END_POINT.PORTFOLIO(portfolioSerial));
};
//시공자별 일정 조회
export const getWorkerSchedule = async (workerSerial: number) => {
  return await axiosInstance.get(END_POINT.PORTFOLIO_SCHEDULE(workerSerial));
};
//시공자별 일정 세부사항 조회
export const getWorkerScheduleDetail = async (
  workerSerial: number,
  workSerial: number
) => {
  return await axiosInstance.get(
    END_POINT.PORTFOLIO_SCHEDULE(workerSerial) + `/view/${workSerial}`
  );
};
//포트폴리오 리뷰 조회
export const getPortfolioReview = async (portfolioSerial: number) => {
  return await axiosInstance.get(END_POINT.PORTFOLIO_REVIEW(portfolioSerial));
};
//사장님 댓글 달기
export const wirteWorkerReview = async (
  customerSerial: number,
  data: { reviewComment: string }
) => {
  return await axiosInstance.post(
    END_POINT.PORTFOLIO_REVIEW(customerSerial),
    data,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
  );
};
//GPT요약리뷰 조회
export const getGPTReview = async (portfolioSerial: number) => {
  return await axiosInstance.get(
    END_POINT.PORTFOLIO_REVIEW(portfolioSerial) + '/chatgpt'
  );
};
