// import { useState } from 'react';

// import Button from '@components/common/Button';
// import Input from '@components/common/Input';
// import { ConstructionData } from '@pages/user/Schedule';

// interface Props {
//   scheduleList: ConstructionData[];
//   setScheduleList: (
//     updateFn: (prev: ConstructionData[]) => ConstructionData[]
//   ) => void;
//   newPrivateSchedule: string;
//   closeModal: () => void;
// }
// export default function PrivateScheduleModal({
//   scheduleList,
//   setScheduleList,
//   newPrivateSchedule,
//   closeModal,
// }: Props) {
//   const [start, setStart] = useState<string>('');
//   const [end, setEnd] = useState<string>('');
//   const [cost, setCost] = useState<number>(0);
//   const [material, setMaterial] = useState<string>('');
//   const handleRegister = () => {
//     const newSchedule = {
//       id: scheduleList.length + 1,
//       시공분야: newPrivateSchedule,
//       스케줄: {
//         시공자이름: '사용자',
//         시공기간: `${start} ~ ${end}`,
//         사용한자재: material,
//         특이사항: '',
//         업체명: '싸피',
//         가격: cost,
//       },
//     };
//     setScheduleList((prev: ConstructionData[]) => [...prev, newSchedule]);
//     closeModal();
//   };
//   return (
//     <>
//       <div className="absolute top-[0.8rem] left-[1rem] text-zp-xl font-bold flex items-center">
//         {scheduleList.length + 1}. {newPrivateSchedule}
//       </div>
//       <hr className="absolute top-[3rem] w-full border border-zp-sub-color" />
//       <div className="w-full flex flex-col mt-[4rem] overflow-auto gap-4">
//         <div className="flex gap-4 items-center">
//           <p className="text-zp-xs font-bold">시공기간</p>
//           <Input
//             type="text"
//             inputType="normal"
//             fontSize="xs"
//             height={1.5}
//             width={6}
//             radius="btn"
//             placeholder="시작일"
//             value={start}
//             onChange={(e: React.ChangeEvent) =>
//               setStart((e.target as HTMLInputElement).value)
//             }
//           />
//           ~
//           <Input
//             type="text"
//             inputType="normal"
//             fontSize="xs"
//             height={1.5}
//             width={6}
//             radius="btn"
//             placeholder="종료일"
//             value={end}
//             onChange={(e: React.ChangeEvent) =>
//               setEnd((e.target as HTMLInputElement).value)
//             }
//           />
//         </div>
//         <div className="flex gap-4 items-center">
//           <p className="text-zp-xs font-bold">시공비용</p>
//           <Input
//             type="number"
//             inputType="normal"
//             fontSize="xs"
//             height={1.5}
//             width={6}
//             radius="btn"
//             placeholder="시공비용"
//             value={cost.toString()}
//             onChange={(e: React.ChangeEvent) =>
//               setCost(parseInt((e.target as HTMLInputElement).value))
//             }
//           />
//         </div>
//         <div className="flex gap-4 items-center">
//           <p className="text-zp-xs font-bold">사용자재</p>
//           <Input
//             type="text"
//             inputType="normal"
//             fontSize="xs"
//             height={1.5}
//             width={6}
//             radius="btn"
//             placeholder="사용자재"
//             value={material}
//             onChange={(e: React.ChangeEvent) =>
//               setMaterial((e.target as HTMLInputElement).value)
//             }
//           />
//         </div>
//         <div className="flex gap-4 justify-center items-center">
//           <Button
//             buttonType="second"
//             children="등록"
//             fontSize="xs"
//             height={1.5}
//             width={5}
//             radius="btn"
//             onClick={handleRegister}
//           />
//           <Button
//             buttonType="second"
//             children="취소"
//             fontSize="xs"
//             height={1.5}
//             width={5}
//             radius="btn"
//             onClick={closeModal}
//           />
//         </div>
//       </div>
//     </>
//   );
// }
