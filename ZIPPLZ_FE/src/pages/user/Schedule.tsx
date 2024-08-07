import { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { useLocation, useNavigate } from 'react-router-dom';

import {
  deletePlan,
  deleteWork,
  getOnePlan,
  getPlans,
  getPrice,
  getWorks,
  modifyWork,
} from '@apis/scheduler/schedulerApi';
import Button from '@components/common/Button';
import ModalComponent from '@components/common/Modal';
import Selectbar from '@components/common/Selectbar';
import ScheduleCalendar from '@components/common/calendar/ScheduleCalendar';
import SchedulerCard from '@components/scheduler/card/SchedulerCard';
import SchedulerCardExist from '@components/scheduler/card/SchedulerCardExist';
import SchedulerCardCustom from '@components/scheduler/card/scheulerCardCustom';
import RegistPlan from '@components/scheduler/regist/RegistPlan';
import ScheduleRegist from '@components/scheduler/regist/ScheduleRegist';
import UpdatePlan from '@components/scheduler/regist/UpdatePlan';
import SharedImg from '@components/scheduler/sharedFile/SharedImg';
import SharedMemo from '@components/scheduler/sharedFile/SharedMemo';
import { useModalActions } from '@stores/modalStore';
import { useScheduleStore } from '@stores/scheduleStore';

interface Plan {
  planSerial: number;
  planName: string;
  status: number;
}
function numberWithCommas(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
export default function Schedule() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const planSerial: number = parseInt(queryParams.get('plan') || '0');
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
    selectedValue,
    setSelectedValue,
  } = useScheduleStore();
  const { openModal, closeModal } = useModalActions();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [options, setOptions] = useState<Plan[]>([]);
  const [selectedWorkSerial, setSelectedWorkSerial] = useState<number>(0);
  const handleConfirmDelete = async (
    planSerial: number,
    workSerial: number
  ) => {
    await deleteWork(planSerial, workSerial);
    setSelectedWorkSerial(0);
    fetchWorkList(planSerial);
    closeModal('select');
  };

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
  const updateWork = async (workSerial: number, workContent: string) => {
    return await modifyWork(planSerial, workSerial, workContent);
  };
  const removePlan = async (planSerial: number) => {
    return await deletePlan(planSerial);
  };
  useEffect(() => {
    fetchPlanList();
  }, []);

  useEffect(() => {
    if (planList) {
      const newOptions: Plan[] = planList.map((plan) => ({
        planSerial: plan.planSerial,
        planName: plan.planName,
        status: plan.isActive,
      }));
      setOptions(newOptions);
    }
  }, [planList]);
  useEffect(() => {
    if (options.length > 0 && selectedValue !== '계획을 선택해주세요.') {
      const selectedPlan = options.find(
        (option) => option.planName === selectedValue
      );
      if (selectedPlan) {
        const planSerial: number = selectedPlan.planSerial;
        if (plan?.planSerial !== planSerial) {
          navigate(`/schedule?plan=${planSerial}`);
          fetchPlan(planSerial);
          fetchWorkList(planSerial);
          getTotalPrice(planSerial);
        }
      }
    }
  }, [selectedValue, options, planList, plan]);
  return (
    <>
      <div className="mt-[5rem] flex flex-col w-full items-center bg-zp-light-beige gap-4 sm lg px-6 mb-[5rem]">
        <div className="w-full flex justify-end">
          <Button
            buttonType={plan && plan.isActive === 1 ? 'second' : 'primary'}
            width={3.5}
            height={1.5}
            fontSize="2xs"
            radius="big"
            children={plan && plan.isActive === 1 ? '비활성화' : '활성화'}
            onClick={() => {
              setIsActive(!isActive);
            }}
          />
        </div>
        <div className="w-full flex items-center gap-4">
          <Selectbar
            fontColor="main"
            options={options.map((option) => option.planName)}
            status={options.map((option) => option.status)}
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
          {selectedValue !== '계획을 선택해주세요.' &&
            plan &&
            plan.isActive ===
              1(
                <HiOutlinePencilAlt
                  className="cursor-pointer"
                  size={16}
                  onClick={() => {
                    setIsOpenUpdate(true);
                  }}
                />
              )}

          <RegistPlan isOpen={isOpenRegist} setIsOpen={setIsOpenRegist} />
          {plan &&
            plan.isActive ===
              1(
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
                <SharedImg fileList={fileList} planSerial={plan?.planSerial} />
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
                  <SchedulerCardExist
                    key={item.workSerial}
                    schedule={item}
                    idx={idx + 1}
                    planSerial={plan?.planSerial}
                    updateContent={updateWork}
                  />
                ) : item.fieldCode.fieldCode === 0 ? (
                  <SchedulerCardCustom
                    key={item.workSerial}
                    schedule={item}
                    idx={idx + 1}
                    planSerial={plan?.planSerial}
                  />
                ) : (
                  <SchedulerCard
                    key={item.workSerial}
                    schedule={item}
                    idx={idx + 1}
                    onClickTrash={() => {
                      openModal('select');
                      setSelectedWorkSerial(item.workSerial);
                    }}
                  />
                )
              )}
            {plan && plan.isActive === 1 && (
              <ScheduleRegist planSerial={plan?.planSerial} />
            )}
          </>
        )}
      </div>
      <ModalComponent
        type="select"
        title="공종 삭제"
        message="해당 공종을 삭제하시겠습니까?"
        onConfirm={() => {
          if (plan) handleConfirmDelete(plan.planSerial, selectedWorkSerial);
        }}
      />
    </>
  );
}
