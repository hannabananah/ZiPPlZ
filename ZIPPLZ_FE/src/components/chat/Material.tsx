import { useEffect, useState } from 'react';

import formatNumberWithCommas from '@/utils/formatNumberWithCommas';
import Button from '@components/common/Button';
import Pagination from '@utils/Pagination';

interface MaterialProps {
  closeMaterialModal: () => void;
}

interface MaterialDetail {
  materialSerial: number;
  materialName: string;
  description: string;
  materialPrice: number;
  img: string;
}

const materials: MaterialDetail[] = [
  {
    materialSerial: 1,
    materialName: '강마루강마루강마루강마루',
    description:
      '강함강함강함강함강함강함강함강함강함강함함강함강함강함강함강함',
    materialPrice: 10000,
    img: 'https://picsum.photos/350',
  },
  {
    materialSerial: 2,
    materialName: '약마루',
    description: '약함',
    materialPrice: 20000,
    img: 'https://picsum.photos/350',
  },
  {
    materialSerial: 3,
    materialName: '강약약강약강마루강마루',
    description:
      '강함강함강함강함강함강함강함강함강함강함함강함강함강함강함강함',
    materialPrice: 10000,
    img: 'https://picsum.photos/350',
  },
  {
    materialSerial: 4,
    materialName: '44444444vvial',
    description: 'material',
    materialPrice: 20000,
    img: 'https://picsum.photos/350',
  },
  {
    materialSerial: 5,
    materialName: '555555555555555강마',
    description:
      '강함강함강함강함강함강함강함강함강함강함함강함강함강함강함강함',
    materialPrice: 10000,
    img: 'https://picsum.photos/350',
  },
  {
    materialSerial: 6,
    materialName: '약마666666666666666666루',
    description: '약함',
    materialPrice: 20000,
    img: 'https://picsum.photos/350',
  },
  {
    materialSerial: 7,
    materialName: '777777777777마루',
    description:
      '강함강함강함강함강함강함강함강함강함강함함강함강함강함강함강함',
    materialPrice: 10000,
    img: 'https://picsum.photos/350',
  },
  {
    materialSerial: 8,
    materialName: '8888888888888888888',
    description: 'material',
    materialPrice: 20000,
    img: 'https://picsum.photos/350',
  },
  {
    materialSerial: 9,
    materialName: '강마루강마루강마루강마루',
    description:
      '강함강함강함강함강함강함강함강함강함강함함강함강함강함강함강함',
    materialPrice: 10000,
    img: 'https://picsum.photos/350',
  },
  {
    materialSerial: 10,
    materialName: '약마루',
    description: '약함',
    materialPrice: 20000,
    img: 'https://picsum.photos/350',
  },
  {
    materialSerial: 11,
    materialName: '강약약강약강마루강마루',
    description:
      '강함강함강함강함강함강함강함강함강함강함함강함강함강함강함강함',
    materialPrice: 10000,
    img: 'https://picsum.photos/350',
  },
  {
    materialSerial: 12,
    materialName: '44444444vvial',
    description: 'material',
    materialPrice: 20000,
    img: 'https://picsum.photos/350',
  },
  {
    materialSerial: 13,
    materialName: '555555555555555강마',
    description:
      '강함강함강함강함강함강함강함강함강함강함함강함강함강함강함강함',
    materialPrice: 10000,
    img: 'https://picsum.photos/350',
  },
  {
    materialSerial: 14,
    materialName: '약마666666666666666666루',
    description: '약함',
    materialPrice: 20000,
    img: 'https://picsum.photos/350',
  },
  {
    materialSerial: 15,
    materialName: '777777777777마루',
    description:
      '강함강함강함강함강함강함강함강함강함강함함강함강함강함강함강함',
    materialPrice: 10000,
    img: 'https://picsum.photos/350',
  },
  {
    materialSerial: 16,
    materialName: '8888888888888888888',
    description: 'material',
    materialPrice: 20000,
    img: 'https://picsum.photos/350',
  },
];

export default function Material({ closeMaterialModal }: MaterialProps) {
  const [selectedMaterial, setSelectedMaterial] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 380) {
        setPerPage(3);
      } else if (window.innerWidth < 640) {
        setPerPage(5);
      } else {
        setPerPage(10);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const offset = (page - 1) * perPage;

  const handleSelectMaterial = (serial: number) => {
    setSelectedMaterial(serial);
  };

  return (
    <div className="flex flex-col justify-between w-full p-4 bg-zp-white">
      <div className="flex flex-col">
        <h2 className="font-bold text-center text-zp-2xl">자재 고르기</h2>
        <div className="flex flex-col">
          {materials.slice(offset, offset + perPage).map((material) => (
            <div
              key={material.materialSerial}
              onClick={() => handleSelectMaterial(material.materialSerial)}
              className={`flex items-center justify-between p-2 border-b-2 cursor-pointer 
                ${selectedMaterial === material.materialSerial ? 'bg-zp-sub-color' : 'bg-zp-transparent'} 
                border-zp-sub-color`}
            >
              <div className="flex items-center">
                <img
                  src={material.img}
                  alt={material.materialName}
                  className="object-cover w-12 mr-2 aspect-square"
                />
                <h3
                  className={`mr-2 font-bold truncate min-w-16 max-w-24 text-zp-xs ${selectedMaterial === material.materialSerial ? 'text-zp-black' : 'text-zp-gray'}`}
                >
                  {material.materialName}
                </h3>
                <p
                  className={`min-w-12 line-clamp-2 max-h text-zp-2xs ${selectedMaterial === material.materialSerial ? 'text-zp-black' : 'text-zp-gray'}`}
                >
                  {material.description}
                </p>
              </div>
              <p
                className={`text-zp-gray text-zp-xs break-keep ${selectedMaterial === material.materialSerial ? 'text-zp-black' : 'text-zp-gray'}`}
              >
                {formatNumberWithCommas(material.materialPrice)}원
              </p>
            </div>
          ))}
        </div>
      </div>
      {
        <div className="flex flex-col">
          <Pagination
            total={materials.length}
            limit={perPage}
            page={page}
            setPage={setPage}
          />
          <div className="flex gap-2">
            <Button
              type="button"
              buttonType="normal"
              width="full"
              height={2.5}
              fontSize="xl"
              radius="btn"
              onClick={closeMaterialModal}
            >
              닫기
            </Button>
            <Button
              type="submit"
              buttonType="primary"
              width="full"
              height={2.5}
              fontSize="xl"
              radius="btn"
            >
              확인
            </Button>
          </div>
        </div>
      }
    </div>
  );
}
