import { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

import SchedulerCardCustom from '@/components/scheduler/card/scheulerCardCustom';
import {
  getOnePlan,
  getPlans,
  getPrice,
  getWorks,
} from '@apis/scheduler/schedulerApi';
import Selectbar from '@components/common/Selectbar';
import ScheduleCalendar from '@components/common/calendar/ScheduleCalendar';
import SchedulerCard from '@components/scheduler/card/SchedulerCard';
import SchedulerCardExist from '@components/scheduler/card/SchedulerCardExist';
import RegistPlan from '@components/scheduler/regist/RegistPlan';
// import ScheduleRegist from '@components/scheduler/regist/ScheduleRegist';
import UpdatePlan from '@components/scheduler/regist/UpdatePlan';
import SharedImg from '@components/scheduler/sharedFile/SharedImg';
import SharedMemo from '@components/scheduler/sharedFile/SharedMemo';
import { useScheduleStore } from '@stores/scheduleStore';

interface Plan {
  planSerial: number;
  planName: string;
}
function numberWithCommas(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
export default function Schedule() {
  const navigate = useNavigate();
  const [isOpenRegist, setIsOpenRegist] = useState<boolean>(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState<boolean>(false);
  const {
    planList,
    setPlanList,
    workList,
    setWorkList,
    plan,
    setPlan,
    fileList,
    setFileList,
  } = useScheduleStore();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [options, setOptions] = useState<Plan[]>([]);
  const [selectedValue, setSelectedValue] =
    useState<string>('계획을 선택해주세요.');
  const fetchPlanList = async () => {
    const response = await getPlans();
    setPlanList(response.data.data);
  };
  const fetchWorkList = async (planSerial: number) => {
    const response = await getWorks(planSerial, 0, 20);
    setWorkList(response.data.data);
  };
  const fetchPlan = async (planSerial: number) => {
    const response = await getOnePlan(planSerial);
    setPlan(response.data.data.plan);
    setFileList(response.data.data.fileList);
  };
  const getTotalPrice = async (planSerial: number) => {
    const response = await getPrice(planSerial);
    setTotalPrice(response.data.data);
  };
  useEffect(() => {
    fetchPlanList();
  }, []);
  useEffect(() => {
    if (planList) {
      const newOptions: Plan[] = planList.map((plan) => ({
        planSerial: plan.planSerial,
        planName: plan.planName,
      }));
      setOptions(newOptions);
    }
  }, [planList]);
  useEffect(() => {
    if (planList && selectedValue !== '계획을 선택해주세요.') {
      const selectedPlan = options.find(
        (option) => option.planName === selectedValue
      );
      if (selectedPlan) {
        const planSerial: number = selectedPlan.planSerial;
        navigate(`/schedule?plan=${planSerial}`);
        fetchPlan(planSerial);
        fetchWorkList(planSerial);
        getTotalPrice(planSerial);
      }
    }
  }, [selectedValue]);

  return (
    <>
      <div className="flex flex-col w-full items-center bg-zp-light-beige gap-4 sm lg px-6 mb-[5rem]">
        <div className="w-full flex items-center gap-4">
          <Selectbar
            fontColor="main"
            options={options.map((option) => option.planName)}
            selectedValue={selectedValue}
            setSelectedValue={setSelectedValue}
            width="full"
            height={2}
            fontSize="lg"
            radius="btn"
            border="main"
            hover="sub"
            backgroundColor="white"
          />
          <FaPlus
            className="cursor-pointer"
            size={16}
            onClick={() => setIsOpenRegist(true)}
          />
          {selectedValue !== '계획을 선택해주세요.' && (
            <HiOutlinePencilAlt
              className="cursor-pointer"
              size={16}
              onClick={() => {
                setIsOpenUpdate(true);
              }}
            />
          )}

          <RegistPlan isOpen={isOpenRegist} setIsOpen={setIsOpenRegist} />
          {plan && (
            <UpdatePlan
              isOpen={isOpenUpdate}
              setIsOpen={setIsOpenUpdate}
              plan={plan}
            />
          )}
        </div>
        <div className="w-full bg-zp-white p-4 rounded-zp-radius-big">
          <ScheduleCalendar workList={workList} />
        </div>
        {selectedValue !== '계획을 선택해주세요.' && (
          <>
            <p className="w-full font-bold text-zp-xl ">공유 문서</p>
            <div className="w-full h-full flex items-stretch justify-between gap-4">
              <div className="basis-2/3 h-full">
                <SharedImg fileList={fileList} />
              </div>
              <div className="basis-1/3 h-full">
                <SharedMemo sharedContents={plan?.sharedContents} />
              </div>
            </div>
            <p className="w-full font-bold text-right text-zp-xl ">
              총 시공 가격 : {numberWithCommas(totalPrice)}원
            </p>
            {workList &&
              workList.map((item, idx) =>
                item.workerSerial ? (
                  <SchedulerCardExist key={idx} schedule={item} idx={idx + 1} />
                ) : item.fieldCode.fieldCode === 0 ? (
                  <SchedulerCardCustom
                    key={idx}
                    schedule={item}
                    idx={idx + 1}
                  />
                ) : (
                  <SchedulerCard key={idx} schedule={item} idx={idx + 1} />
                )
              )}

            {/* <ScheduleRegist
              scheduleList={workList}
              setScheduleList={setWorkList}
            /> */}
          </>
        )}
      </div>
    </>
  );
}
