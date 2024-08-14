import React, { useState } from 'react';
import { FaImage } from 'react-icons/fa';
import { HiOutlineUser } from 'react-icons/hi2';
import { PiNotePencil } from 'react-icons/pi';
import { RiMessage2Line } from 'react-icons/ri';
import { TbBuildingCommunity } from 'react-icons/tb';
import { useNavigate, useParams } from 'react-router-dom';

import { updatePortfolio } from '@/apis/worker/PortfolioApi';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { useLoginUserStore } from '@/stores/loginUserStore';
import { PortfolitDetail } from '@/stores/portfolioStore';

interface data {
  publicRelation: string;
  career: number;
  asPeriod: number;
  company: string;
  companyAddress: string;
  businessNumber: string;
}
interface Props {
  portfolio: PortfolitDetail;
}
export default function OverView({ portfolio }: Props) {
  const { id } = useParams<{ id: string }>();
  const { loginUser } = useLoginUserStore();
  const navigate = useNavigate();
  const modifyPortfolio = async (data: data) => {
    return await updatePortfolio(portfolio.portfolioSerial, data);
  };
  // 모달 열림, 한줄 소개 입력 값, 임시 값 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [asPeriod, setAsPeriod] = useState<number>(portfolio.asPeriod);
  const [career, setCareer] = useState<number>(portfolio.career);
  const [company, setCompany] = useState<string>(portfolio.worker.company);
  const [companyAddress, setCompanyAddress] = useState<string>(
    portfolio.worker.companyAddress
  );
  const [businessNumber, setBusinessNumber] = useState<string>(
    portfolio.worker.businessNumber
  );
  const [publicRelation, setPublicRelation] = useState<string>(
    portfolio.publicRelation
  );

  // 모달 열기
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // 모달 닫기
  const handleCloseModal = () => {
    setPublicRelation(portfolio.publicRelation);
    setAsPeriod(portfolio.asPeriod);
    setCareer(portfolio.career);
    setCompany(portfolio.worker.company);
    setCompanyAddress(portfolio.worker.companyAddress);
    setBusinessNumber(portfolio.worker.businessNumber);
    setIsModalOpen(false);
  };

  // 저장 버튼
  const handleSave = () => {
    modifyPortfolio({
      publicRelation,
      career,
      asPeriod,
      company,
      companyAddress,
      businessNumber,
    });
    handleCloseModal();
    navigate(0);
  };

  return (
    <>
      <div className="flex flex-col w-full gap-4">
        {id && loginUser?.userSerial === parseInt(id) && (
          <div className="flex justify-end">
            <PiNotePencil
              onClick={handleOpenModal}
              className="cursor-pointer"
              size={24}
            />
          </div>
        )}
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <HiOutlineUser size={16} />
            <p className="font-bold text-zp-sm">About Me</p>
          </div>
          <div className="flex w-full gap-4 pl-4 mt-4">
            <div className="flex flex-col gap-2 pr-6 font-bold border-r text-zp-gray text-zp-xs border-r-zp-sub-color">
              <p>나이</p>
              <p>E-Mail</p>
              <p>경력</p>
              <p>A/S 기간</p>
            </div>
            <div className="flex flex-col gap-2 font-bold text-zp-gray text-zp-xs ">
              <p>
                {2024 - parseInt(portfolio.user.birthDate.split('-')[0])} 세
              </p>
              <p>{portfolio.user.email}</p>
              <p>{portfolio.career} 년</p>
              <p>{portfolio.asPeriod} 년</p>
            </div>
          </div>
        </div>
        <hr className="w-full text-zp-main-color" />
        {/* 사진 표시 컴포넌트 */}
        <div
          className="flex w-full gap-4 overflow-x-auto"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {portfolio && portfolio.imageList.length > 0 ? (
            portfolio.imageList.map((image) => (
              <img
                className="flex-shrink-0 w-[25%] aspect-square border"
                src={image.saveFile}
              />
            ))
          ) : (
            <div className="flex flex-col items-center w-full gap-4">
              <label className="flex flex-col items-center justify-center w-full">
                <FaImage size={50} />
                <p className="w-full font-bold text-center">
                  포트폴리오 이미지를 넣어주세요.
                </p>
                <input type="file" className="hidden" />
              </label>
            </div>
          )}
        </div>

        <hr className="w-full text-zp-main-color" />

        {/* 소속업체 */}
        <div className="flex items-center gap-1">
          <TbBuildingCommunity size={16} />
          <p className="font-bold text-zp-sm">소속업체</p>
        </div>
        <div className="flex w-full gap-4 pl-4">
          <div className="flex flex-col gap-2 pr-6 font-bold border-r text-zp-gray text-zp-xs border-r-zp-sub-color">
            <p>업체명</p>
            <p>업체 주소</p>
            <p>사업자등록번호</p>
          </div>
          <div className="flex flex-col gap-2 font-bold text-zp-gray text-zp-xs">
            <p>{portfolio.worker.company}</p>
            <p>{portfolio.worker.companyAddress}</p>
            <p>{portfolio.worker.businessNumber}</p>
          </div>
        </div>
        <hr className="w-full text-zp-main-color" />

        {/* 하고 싶은 말 */}
        <div className="flex items-center gap-1">
          <RiMessage2Line size={16} />
          <p className="font-bold text-zp-sm">하고 싶은 말</p>
        </div>
        <p className="pl-4 font-bold text-zp-xs">{portfolio.publicRelation}</p>
      </div>
      {/* 수정 모달 창 */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center ">
          {/* 모달 창 */}
          <div className="border flex flex-col border-zp-main-color rounded-zp-radius-big bg-zp-white p-6 shadow-lg w-[90%] gap-2">
            <p className="font-bold text-center text-zp-md">정보 수정</p>
            <div className="flex flex-col text-zp-xs">
              <p className="font-bold">경력</p>
              <Input
                inputType="normal"
                type="number"
                placeholder="경력"
                width={5}
                height={1.5}
                radius="btn"
                fontSize="xs"
                value={career}
                onChange={(e: React.ChangeEvent) =>
                  setCareer(parseInt((e.target as HTMLInputElement).value))
                }
              />
            </div>
            <div className="flex flex-col text-zp-xs">
              <p className="font-bold">A/S 기간</p>
              <Input
                inputType="normal"
                type="number"
                placeholder="A/S기간"
                width={5}
                height={1.5}
                radius="btn"
                fontSize="xs"
                value={asPeriod}
                onChange={(e: React.ChangeEvent) =>
                  setAsPeriod(parseInt((e.target as HTMLInputElement).value))
                }
              />
            </div>
            <div className="flex flex-col text-zp-xs">
              <p className="font-bold">업체명</p>
              <Input
                inputType="normal"
                type="text"
                placeholder="업체명을 입력해주세요."
                width="full"
                height={1.5}
                radius="btn"
                fontSize="xs"
                value={company}
                onChange={(e: React.ChangeEvent) =>
                  setCompany((e.target as HTMLInputElement).value)
                }
              />
            </div>
            <div className="flex flex-col text-zp-xs">
              <p className="font-bold">업체 주소</p>
              <Input
                inputType="normal"
                type="text"
                placeholder="업체 주소를 입력해주세요."
                width="full"
                height={1.5}
                radius="btn"
                fontSize="xs"
                value={companyAddress}
                onChange={(e: React.ChangeEvent) =>
                  setCompanyAddress((e.target as HTMLInputElement).value)
                }
              />
            </div>
            <div className="flex flex-col text-zp-xs">
              <p className="font-bold">사업자 번호</p>
              <Input
                inputType="normal"
                type="text"
                placeholder="숫자 10자리를 입력해주세요."
                width="full"
                height={1.5}
                radius="btn"
                fontSize="xs"
                value={businessNumber}
                onChange={(e: React.ChangeEvent) =>
                  setBusinessNumber((e.target as HTMLInputElement).value)
                }
              />
            </div>
            <div className="flex flex-col text-zp-xs">
              <p className="font-bold">한줄 소개</p>
              <Input
                inputType="normal"
                type="text"
                placeholder="한 줄로 자기를 소개해주세요."
                width="full"
                height={1.5}
                radius="btn"
                fontSize="xs"
                value={publicRelation}
                onChange={(e: React.ChangeEvent) =>
                  setPublicRelation((e.target as HTMLInputElement).value)
                }
              />
            </div>

            <div className="flex justify-center gap-4">
              <Button
                children="취소"
                buttonType="second"
                radius="btn"
                width={6}
                height={2}
                fontSize="xs"
                onClick={handleCloseModal}
              />
              <Button
                children="저장"
                buttonType="primary"
                radius="btn"
                width={6}
                height={2}
                fontSize="xs"
                onClick={handleSave}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
