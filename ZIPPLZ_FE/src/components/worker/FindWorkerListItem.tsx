// 워커찾기-전문 시공자 구하기 페이지의 게시물 컴포넌트
import { CgProfile } from 'react-icons/cg';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { FaMapMarkerAlt } from 'react-icons/fa';

export default function FindWorkerListItem() {
  return (
    <>
      <div className="w-full rounded-zp-radius-big h-36 shadow-lg flex items-center">
        <div className="p-2 flex items-center space-x-4">
          {/* 첫 번째 요소 */}
          <div className="flex flex-col border-r px-6 basis-2/3">
            <div className="text-zp-xs font-bold text-left">
              깔끔하고 하자 없는 장판 시공 해주실분 구합니다.
            </div>
            <div className="line-clamp-2 text-zp-2xs text-zp-gray text-left">
              모던하면서도 너무 밋밋하지 않은 디자인의 장판으로 바닥을 한번 싹다
              바꿔볼까하는데 잘 해주시는 분 찾고 있습니다. 시공쪽을 잘 몰라서
              친절하게 알려주실 분 계신가요?
            </div>
          </div>

          {/* 세로선 */}
          {/* <div className="border-r border-gray-300 h-full"></div> */}

          {/* 두 번째 요소 */}
          <div className="flex flex-col space-y-3 text-zp-gray basis-1/3">
            <div className="flex justify-start space-x-2">
              <CgProfile size={14} />
              <div className="text-zp-2xs">조명조랭이떡</div>
            </div>
            <div className="flex justify-start space-x-2">
              <FaRegCalendarAlt size={14} />
              <div className="text-zp-2xs">07.21~07.23</div>
            </div>
            <div className="flex justify-start space-x-2">
              <FaMapMarkerAlt size={14} />
              <div className="text-zp-2xs">100</div>
            </div>
            <div className="flex justify-start space-x-2">
              <FaMapMarkerAlt size={14} />
              <div className="text-zp-2xs">96</div>
            </div>
            <div className="flex justify-start space-x-2">
              <FaMapMarkerAlt size={14} />
              <div className="text-zp-2xs">5</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
