import { useEffect, useState } from 'react';
import { CiLocationOn } from 'react-icons/ci';
import { GrTools } from 'react-icons/gr';
import { IoBookmark, IoBookmarkOutline } from 'react-icons/io5';
import { IoCallOutline } from 'react-icons/io5';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

// import { getWish } from '@/apis/board/wishApi';
import {
  getPortfolioDetail,
  getPortfolioList,
} from '@/apis/worker/PortfolioApi';
import { usePortfolioStore } from '@/stores/portfolioStore';
import Button from '@components/common/Button';

import OverView from './tabs/OverView';
import WorkerReview from './tabs/WorkerReview';
import WorkerSchedule from './tabs/WorkerSchedule';

export default function Portfolio() {
  // const [isWish, setIsWish] = useState<number>(0);
  // const checkWish = async (portfolioSerial: number) => {
  //   const response = await getWish(portfolioSerial);
  //   setIsWish(response.data.data);
  // };
  const {
    portfolioList,
    portfolioOverview,
    setPortfolioList,
    setPortfolioOverview,
  } = usePortfolioStore();
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [nowField, setNowField] = useState<string>('');
  //데이터 fetch
  const fetchPortfolioList = async (userSerial: number) => {
    const response = await getPortfolioList(userSerial);
    setPortfolioList(response.data.data);
  };
  const fetchPortFolioOverView = async (portfolioSerial: number) => {
    const response = await getPortfolioDetail(portfolioSerial);
    setPortfolioOverview(response.data.data);
  };
  // URL 쿼리 파라미터에서 activeTab 읽기
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tab = queryParams.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
  }, [location.search]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (id) fetchPortfolioList(parseInt(id));
  }, [id]);
  useEffect(() => {
    if (portfolioList.length > 0) {
      fetchPortFolioOverView(portfolioList[0].portfolioSerial);
      setNowField(portfolioList[0].fieldId.fieldName);
    }
  }, [portfolioList, id]);

  const overviewClick = () => {
    if (id) {
      setActiveTab('overview');
      navigate(`/workers/${parseInt(id)}/portfolio?tab=overview`);
    }
  };

  const workerScheduleClick = () => {
    setActiveTab('workerschedule');
    if (id) navigate(`/workers/${parseInt(id)}/portfolio?tab=workerschedule`);
  };

  const reviewClick = () => {
    setActiveTab('review');
    if (id) navigate(`/workers/${parseInt(id)}/portfolio?tab=review`);
  };

  return (
    <>
      <div className="flex flex-col w-full gap-2 min-h-screen p-6 mt-[4rem]">
        <div className="relative flex items-start w-full gap-6 font-bold">
          {/* 사진, 이름 */}
          <div className="flex flex-col items-center">
            <div className="w-[100px] h-[100px] rounded-zp-radius-full ">
              <img
                className="object-cover w-full h-full rounded-zp-radius-full"
                src={portfolioOverview?.userProfile.saveFile}
              />
            </div>
            <p className="font-bold text-zp-lg">
              {portfolioOverview?.user.userName}
            </p>
          </div>

          {/* 지역, 전화번호, 분야 */}
          <div className="flex flex-col mt-4 font-bold text-zp-xs">
            <div className="flex items-center gap-2">
              <CiLocationOn />
              {portfolioOverview?.localList.map((local) => <p>{local}</p>)}
            </div>
            <div className="flex items-center gap-2">
              <IoCallOutline />
              <p>{portfolioOverview?.user.tel}</p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <GrTools />
                <p>Skills</p>
              </div>

              {/* Skills as buttons */}
              <div className="grid grid-cols-3 gap-4">
                {portfolioList.map((item, index) => (
                  <Button
                    buttonType={
                      nowField === item.fieldId.fieldName ? 'primary' : 'second'
                    }
                    disabled={nowField === item.fieldId.fieldName}
                    width={4}
                    height={2}
                    fontSize="xs"
                    radius="big"
                    key={index}
                    onClick={() => {
                      fetchPortFolioOverView(item.portfolioSerial);
                      setNowField(item.fieldId.fieldName);
                    }}
                  >
                    {item.fieldId.fieldName}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          {/* 북마크 이미지 */}
          {/*{isWish > 0 ? (
            <IoBookmark
              size={24}
              className="absolute cursor-pointer right-4"
              color="#73744a"
              // onClick={toggleBookmark}
            />
          ) : (
            <IoBookmarkOutline
              size={24}
              className="absolute cursor-pointer right-4"
              color="#73744a"
              // onClick={toggleBookmark}
            />
          )}*/}
        </div>
        {/* 버튼 섹션 */}
        <div className="grid w-full grid-cols-3 font-bold text-zp-sm">
          <div
            className={`p-2 cursor-pointer ${
              activeTab === 'overview'
                ? 'rounded-t-zp-radius-big border-x-2 border-t-2 border-zp-main-color'
                : 'rounded-b-lg border-b-2 border-zp-main-color'
            }`}
          >
            <p className="text-center" onClick={overviewClick}>
              종합정보
            </p>
          </div>
          <div
            className={`p-2 cursor-pointer ${
              activeTab === 'workerschedule'
                ? 'rounded-t-zp-radius-big border-x-2 border-t-2 border-zp-main-color'
                : 'rounded-b-lg border-b-2 border-zp-main-color'
            }`}
          >
            <p className="text-center" onClick={workerScheduleClick}>
              시공자 일정
            </p>
          </div>

          <div
            className={`p-2 cursor-pointer ${
              activeTab === 'review'
                ? 'rounded-t-zp-radius-big border-x-2 border-t-2 border-zp-main-color'
                : 'rounded-b-lg border-b-2 border-zp-main-color'
            }`}
          >
            <p className="text-center" onClick={reviewClick}>
              후기
            </p>
          </div>
        </div>
        <div className="mb-[4rem]">
          {activeTab === 'overview' && portfolioOverview && (
            <OverView portfolio={portfolioOverview} />
          )}
          {activeTab === 'workerschedule' && (
            <WorkerSchedule
              workerSerial={portfolioOverview?.worker.workerSerial}
            />
          )}
          {activeTab === 'review' && portfolioOverview && (
            <WorkerReview portfolio={portfolioOverview} />
          )}
        </div>
      </div>
    </>
  );
}
