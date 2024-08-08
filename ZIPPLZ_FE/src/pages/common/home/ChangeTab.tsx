import { useState } from 'react';
import { CiCirclePlus } from 'react-icons/ci';

import Button from '@/components/common/Button';
import Selectbar from '@/components/common/Selectbar';
import MaterialList from '@components/imageChange/MaterialList';

export default function ChangeTab() {
  const options: string[] = ['바닥', '벽지'];
  const [selectedValue, setSelectedValue] = useState<string>('바닥');
  return (
    <>
      <div className="flex flex-col w-full gap-4 mt-2 mb-[5rem]">
        <div className="flex justify-between w-full">
          <p className="font-bold text-zp-md">
            1. 바꾸고 싶은 집 사진을 올려주세요.
          </p>
          <p className="font-bold text-zp-md">
            2. 자재를 선택 또는 올려주세요.
          </p>
        </div>
        <div className="flex w-full h-full gap-4">
          <div className="flex flex-col w-full h-full gap-4 basis-2/3">
            <div className="flex items-center justify-center w-full border rounded-zp-radius-big border-zp-main-color aspect-square bg-zp-white">
              <div className="flex items-center justify-center w-full ">
                <label form="dropzone-file">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6 cursor-pointer">
                    <svg
                      className="w-12 h-12 mb-4 text-gray-500 "
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-zp-md text-zp-gray">
                      집 이미지를 올려주세요.
                    </p>
                  </div>
                  <input id="dropzone-file" type="file" className="hidden" />
                </label>
              </div>
            </div>
            <div className="flex w-full h-full gap-4">
              <div className="w-[50%] aspect-square border rounded-zp-radius-big">
                자재 이미지 올라오는 곳
              </div>
              <div className="w-[50%] aspect-squarel grid grid-rows-2 gap-4">
                <Button
                  buttonType="second"
                  children="변환하기"
                  width="full"
                  height="full"
                  radius="big"
                  fontSize="lg"
                />
                <Button
                  buttonType="second"
                  children="저장하기"
                  width="full"
                  height="full"
                  radius="big"
                  fontSize="lg"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 basis-1/3 ">
            <Selectbar
              backgroundColor="white"
              border="main"
              radius="btn"
              fontColor="black"
              options={options}
              selectedValue={selectedValue}
              setSelectedValue={setSelectedValue}
              width="full"
              height={2}
              fontSize="lg"
              hover="light-gray"
            />
            <label form="dropzone-file2">
              <div className="w-full h-[1.5rem] flex justify-center items-center bg-zp-sub-color rounded-zp-radius-btn cursor-pointer">
                <CiCirclePlus size={16} />
                <input id="dropzone-file2" type="file" className="hidden" />
              </div>
            </label>
            <div
              className="flex w-full h-full overflow-auto border-t border-b aspect-square rounded-b-zp-radius-big border-b-zp-main-color border-t-zp-main-color"
              style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
            >
              <MaterialList type={selectedValue} />
            </div>
          </div>
        </div>
      </div>{' '}
    </>
  );
}
