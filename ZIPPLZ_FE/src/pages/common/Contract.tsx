import { useEffect, useState } from 'react';
import { ImCancelCircle } from 'react-icons/im';
import { useNavigate, useParams } from 'react-router-dom';

import { getContract } from '@/apis/member/MemberApi';
import Button from '@/components/common/Button';
import { formatDate } from '@utils/formatDateWithTime';
import formatNumberWithCommas from '@utils/formatNumberWithCommas';

interface Contract {
  workerName: string;
  company: string;
  businessNumber: string;
  workerTel: string;
  customerName: string;
  customerTel: string;
  address: string;
  startDate: string;
  endDate: string;
  workPrice: number;
  fieldName: string;
  asPeriod: number;
  materialList: string[];
}
export default function Contract() {
  const [contract, setContract] = useState<Contract | null>(null);
  const navigate = useNavigate();
  const { workserial } = useParams<{ workserial: string }>();
  const fetchContract = async (workSerial: number) => {
    const response = await getContract(workSerial);
    setContract(response.data.data);
  };
  useEffect(() => {
    if (workserial) fetchContract(parseInt(workserial));
  }, []);
  return (
    <>
      {contract && contract !== null && (
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
                    rowSpan={2}
                  >
                    계약자
                    <br />
                    (시공업자)
                  </th>
                  <td className="border font-bold text-center">업체명</td>
                  <td className="text-zp-2xs p-4 border">{contract.company}</td>
                  <td className="border font-bold text-center">대표자</td>
                  <td className="text-zp-2xs p-4">{contract.workerName}</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="border font-bold text-center">연락처</td>
                  <td className="text-zp-2xs p-4 border">
                    {contract.workerTel}
                  </td>
                  <td className="border font-bold text-center">
                    사업자 등록 번호
                  </td>
                  <td className="text-zp-2xs p-4 border">
                    {contract.businessNumber}
                  </td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th
                    scope="row"
                    className="p-4 font-bold text-gray-900 bg-zp-white "
                    rowSpan={2}
                  >
                    의뢰인(고객)
                  </th>
                  <td className="border font-bold text-center">성명</td>
                  <td className="text-zp-2xs p-4 border" colSpan={3}>
                    {contract.customerName}
                  </td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="border font-bold text-center">연락처</td>
                  <td className="text-zp-2xs p-4 border" colSpan={3}>
                    {contract.customerTel}
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
                  <td className="p-3 text-left">{contract.fieldName}</td>
                </tr>
                <tr>
                  <th
                    scope="row"
                    className="border-r text-zp-sm font-bold text-center"
                  >
                    시공 장소
                  </th>
                  <td className="p-3 text-left">{contract.address}</td>
                </tr>
                <tr>
                  <th
                    scope="row"
                    className="border-r text-zp-sm font-bold text-center"
                  >
                    시공 기간
                  </th>
                  <td className="p-3 text-left">
                    {formatDate(contract.startDate)} ~{' '}
                    {formatDate(contract.endDate)}
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
                    총 {formatNumberWithCommas(contract.workPrice)}원
                  </td>
                </tr>
                <tr>
                  <th
                    scope="row"
                    className="border-r text-zp-sm font-bold text-center"
                  >
                    사용 자재
                  </th>
                  <td className="p-3 text-left">
                    <div className="w-full flex gap-2">
                      {contract.materialList.map((material) => (
                        <p>{material}</p>
                      ))}
                    </div>
                  </td>
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
                계약자(시공업자): {contract.workerName}
              </p>
              <p className="text-zp-sm">
                의뢰인(고객): &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {contract.customerName}
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
              onClick={() => navigate(-1)}
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
      )}
    </>
  );
}
