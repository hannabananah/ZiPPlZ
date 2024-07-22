<<<<<<< HEAD
import Calendar from '@/components/common/Calendar';
import SchedulerCardExist from '@/components/scheduler/card/SchedulerCardExist';
import SharedImg from '@/components/scheduler/sharedFile/SharedImg';
import SharedMemo from '@/components/scheduler/sharedFile/SharedMemo';
import SchedulerCard from '@components/scheduler/card/SchedulerCard';

export default function Schedule() {
  return (
    <div
      className="flex flex-col justify-center items-center bg-zp-light-beige gap-4 px-6"
      style={{ width: '37.5rem' }}
    >
      <Calendar />
      <p className="w-full  text-zp-xl font-bold ">공유 문서</p>
      <div className="w-full flex justify-between items-center">
        <SharedImg />
        <SharedMemo />
      </div>
      <p className="w-full text-right text-zp-xl font-bold ">
        총 시공 가격 : 1000000원
      </p>
      <SchedulerCard />
      <SchedulerCardExist />
=======
import Calendar from '@/components/scheduler/Calendar';
import SharedImg from '@/components/scheduler/sharedFile/SharedImg';
import SharedMemo from '@/components/scheduler/sharedFile/SharedMemo';
import SchedulerCard from '@components/scheduler/SchedulerCard';

export default function Schedule() {
  return (
    <div className="flex justify-center items-center">
      <div
        className="flex flex-col justify-center items-center bg-zp-light-beige gap-4 px-6"
        style={{ width: '37.5rem' }}
      >
        <Calendar />
        <p className="w-full text-ㅣㄷㄹㅅ text-zp-xl font-bold ">공유 문서</p>
        <div className="w-full flex justify-between items-center">
          <SharedImg />
          <SharedMemo />
        </div>
        <p className="w-full text-right text-zp-xl font-bold ">
          총 시공 가격 : 1000000원
        </p>
        <SchedulerCard />
      </div>
>>>>>>> 79a50ce (FEAT: scheduler 페이지 작업중)
    </div>
  );
}
