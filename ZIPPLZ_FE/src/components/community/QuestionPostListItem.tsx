import { AiOutlineMessage } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { IoBookmarkOutline } from 'react-icons/io5';
import { PiEyeLight } from 'react-icons/pi';

export default function QuestionPostListItem() {
  return (
    <>
      <div className="w-full rounded-zp-radius-big h-32 shadow-lg flex items-center">
        <div className="p-2 flex items-center space-x-4">
          {/* 첫 번째 요소 */}
          <div className="flex flex-col border-r px-6 basis-3/5">
            <div className="text-zp-xs font-bold text-left">
              벽지가 뜯어졌는데 복구 가능할까요...
            </div>
            <div className="line-clamp-2 text-zp-2xs text-zp-gray text-left">
              벽지가 뜯어졌는데 복구 가능할까요...
            </div>
          </div>

          {/* 세로선 */}
          {/* <div className="border-r border-gray-300 h-full"></div> */}

          {/* 두 번째 요소 */}
          <div className="flex flex-col space-y-3 text-zp-gray basis-2/5">
            <div className="flex justify-start space-x-1">
              <CgProfile size={14} />
              <div className="text-zp-2xs">조명조랭이떡</div>
            </div>
            <div className="flex justify-start space-x-1">
              <FaRegCalendarAlt size={14} />
              <div className="text-zp-2xs">07.21~07.23</div>
            </div>
            <div className="flex justify-start">
              <div className="flex justify-start space-x-1">
                <PiEyeLight size={14} />
                <div className="text-zp-2xs">100</div>
              </div>
              <div className="ml-1 flex justify-start space-x-1">
                <IoBookmarkOutline size={14} />
                <div className="text-zp-2xs">96</div>
              </div>
              <div className="ml-1 flex justify-start space-x-1">
                <AiOutlineMessage size={14} />
                <div className="text-zp-2xs">5</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
