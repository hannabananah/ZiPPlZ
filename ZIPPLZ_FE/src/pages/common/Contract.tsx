import { ImCancelCircle } from 'react-icons/im';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/common/Button';
import formatNumberWithCommas from '@utils/formatNumberWithCommas';

const work: any = {
  workSerial: 1,
  workerSerial: {
    workerSerial: 1,
    userSerial: {
      userSerial: 3,
      fileSerial: 0,
      email: 'ssafy2',
      password: '$2a$10$HbHcSpqXozL4eoaRof5VEezmt9gGKDwfevYsX2dGOTHEnbPEdK8ii',
      userName: 'celine',
      birthDate: '1999-07-22',
      tel: '010-2938-2438',
      delYN: 0,
      role: '',
    },
    company: '멀티캠퍼스',
    companyAddress: '서울특별시 강남구 대치동 889-41',
    businessNumber: null,
    certificate: null,
    hasAsBadge: 0,
  },
  planSerial: {
    planSerial: 1,
    customerSerial: {
      customerSerial: 3,
      userSerial: {
        userSerial: 2,
        fileSerial: 0,
        email: 'ssafy1',
        password:
          '$2a$10$7aL5AZn03nspi47iS5xG0eo.PPe.z5VLKpVkReGLcUevvUcjDP/wO',
        userName: 'celine',
        birthDate: '1999-07-22',
        tel: '010-2938-2438',
        delYN: 0,
        role: '',
      },
      nickname: '야옹이',
      currentAddress: '부산',
    },
    address: '경기도 남양주시 평내로 89',
    sharedContents: null,
  },
  fieldCode: {
    fieldCode: 1,
    fieldName: '철거',
  },
  startDate: '2024-08-01',
  endDate: '2024-08-15',
  isCompleted: 0,
  workPrice: 1000000,
  asScore: 0,
  workContent: null,
};
export default function Contract() {
  const navigate = useNavigate();
  return (
    <>
      <div className="relative my-[3rem] flex flex-col w-full min-h-screen gap-4 p-6">
        <p className="text-center text-zp-2xl font-bold">시공 계약서</p>
        <ImCancelCircle
          size={16}
          className="cursor-pointer absolute right-[2rem] top-[2rem]"
          onClick={() => navigate(-1)}
        />
        <hr className="text-zp-light-gray w-full" />
        <div className="relative overflow-x-auto">
          <table className="w-full text-zp-xs  text-gray-500 dark:text-gray-400">
            <tbody className="bg-zp-white">
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th
                  scope="row"
                  className="font-bold text-gray-900 bg-zp-white "
                  rowSpan={3}
                >
                  계약자
                  <br />
                  (시공업자)
                </th>
                <td className="border font-bold text-center">업체명</td>
                <td className="text-zp-2xs p-4 border">
                  {work.workerSerial.company}
                </td>
                <td className="border font-bold text-center">대표자</td>
                <td className="text-zp-2xs p-4">
                  {work.workerSerial.userSerial.userName}
                </td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="border font-bold text-center">주소</td>
                <td className="text-zp-2xs p-4 border" colSpan={3}>
                  {work.workerSerial.companyAddress}
                </td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="border font-bold text-center">연락처</td>
                <td className="text-zp-2xs p-4 border">
                  {work.workerSerial.userSerial.tel}
                </td>
                <td className="border font-bold text-center">
                  사업자 등록 번호
                </td>
                <td className="text-zp-2xs p-4 border">
                  {work.workerSerial.businessNumber}
                </td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th
                  scope="row"
                  className="p-4 font-bold text-gray-900 bg-zp-white "
                  rowSpan={3}
                >
                  의뢰인(고객)
                </th>
                <td className="border font-bold text-center">성명</td>
                <td className="text-zp-2xs p-4 border">
                  {work.planSerial.customerSerial.userSerial.userName}
                </td>
                <td className="border font-bold text-center">생년월일</td>
                <td className="text-zp-2xs p-4">
                  {work.workerSerial.userSerial.birthDate}
                </td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="border font-bold text-center">주소</td>
                <td className="text-zp-2xs p-4 border" colSpan={3}>
                  {work.planSerial.address}
                </td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="border font-bold text-center">연락처</td>
                <td className="text-zp-2xs p-4 border" colSpan={3}>
                  {work.planSerial.customerSerial.userSerial.tel}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-center text-zp-md font-bold text-zp-red">
          계약자와 의뢰인은 합의 하에 다음과 같은 계약 내용에 동의하고
          서명합니다.
        </p>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th
                  scope="col"
                  className="border-r border-b text-center py-3 rounded-s-lg"
                >
                  계약 유형
                </th>
                <th scope="col" className=" border-b text-center py-3">
                  내용
                </th>
              </tr>
            </thead>
            <tbody className="bg-zp-white">
              <tr>
                <th
                  scope="row"
                  className="border-r text-zp-sm font-bold text-center"
                >
                  시공 내용
                </th>
                <td className="p-3 text-left">{work.fieldCode.fieldName}</td>
              </tr>
              <tr>
                <th
                  scope="row"
                  className="border-r text-zp-sm font-bold text-center"
                >
                  시공 장소
                </th>
                <td className="p-3 text-left">{work.planSerial.address}</td>
              </tr>
              <tr>
                <th
                  scope="row"
                  className="border-r text-zp-sm font-bold text-center"
                >
                  시공 기간
                </th>
                <td className="p-3 text-left">
                  {work.startDate} ~ {work.endDate}
                </td>
              </tr>
              <tr>
                <th
                  scope="row"
                  className="border-r text-zp-sm font-bold text-center"
                >
                  계약 금액
                </th>
                <td className="p-3 text-left">
                  총 {formatNumberWithCommas(work.workPrice)}원
                </td>
              </tr>
              <tr>
                <th
                  scope="row"
                  className="border-r text-zp-sm font-bold text-center"
                >
                  사용 자재
                </th>
                <td className="p-3 text-left">대리석, 페인트, 벽돌</td>
              </tr>
              <tr>
                <th
                  scope="row"
                  className="border-r text-zp-sm font-bold text-center"
                >
                  하자 보수 기간
                </th>
                <td className="p-3 text-left">작업 완료 후 3개월</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="w-full flex justify-end items-end">
          <div className="flex flex-col gap-2 ">
            <p className="text-zp-sm font-bold">서명란</p>
            <p className="text-zp-sm">
              계약자(시공업자): {work.workerSerial.userSerial.userName}
            </p>
            <p className="text-zp-sm">
              의뢰인(고객): &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {work.planSerial.customerSerial.userSerial.userName}
            </p>
          </div>
        </div>
        <div className="w-full flex items-center justify-center gap-4">
          <Button
            buttonType="second"
            children="닫기"
            width={3}
            height={2}
            fontSize="2xs"
            radius="btn"
          />
          <Button
            buttonType="primary"
            children="수정"
            width={3}
            height={2}
            fontSize="2xs"
            radius="btn"
          />
        </div>
      </div>
    </>
  );
}
