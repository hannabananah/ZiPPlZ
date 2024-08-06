import { useEffect, useState } from 'react';

import NothingIcon from '@assets/nothing-icon.svg?react';
import MaterialItem from '@components/chat/MaterialItem';
import Button from '@components/common/Button';
import SearchInput from '@components/common/SearchInput';
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
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 380) {
        setPerPage(4);
      } else {
        setPerPage(6);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    setPage(1);
  }, [searchQuery]);

  const filteredMaterials = materials.filter((material) =>
    material.materialName.includes(searchQuery)
  );

  const numPages = Math.ceil(filteredMaterials.length / perPage);
  const offset = (page - 1) * perPage;

  useEffect(() => {
    if (page > numPages) {
      setPage(numPages);
    }
  }, [numPages, page]);

  const handleSelectMaterial = (serial: number) => {
    setSelectedMaterial(serial);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="flex flex-col justify-between w-full h-full p-4 bg-zp-white">
      <div className="flex flex-col gap-3">
        <h2 className="font-bold text-center text-zp-2xl">자재 고르기</h2>
        <SearchInput
          onSearch={handleSearch}
          placeholder="자재명을 검색하세요."
        />
        <div className="flex flex-col w-full">
          {filteredMaterials.length === 0 ? (
            <div className="flex flex-col items-center">
              <p className="text-center text-zp-gray text-zp-sm">
                해당하는 자재가 없습니다.
              </p>
              <NothingIcon className="absolute w-10/12 -translate-y-1/2 top-1/2" />
            </div>
          ) : (
            filteredMaterials
              .slice(offset, offset + perPage)
              .map((material) => (
                <MaterialItem
                  key={material.materialSerial}
                  material={material}
                  isSelected={selectedMaterial === material.materialSerial}
                  onSelect={handleSelectMaterial}
                />
              ))
          )}
        </div>
      </div>
      <div className="flex flex-col">
        {filteredMaterials.length > 0 && (
          <Pagination
            total={filteredMaterials.length}
            limit={perPage}
            page={page}
            setPage={setPage}
          />
        )}
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
    </div>
  );
}
