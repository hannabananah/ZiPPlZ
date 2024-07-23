import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';

interface Props {
  options: string[];
  selectedValue: string;
  setSelectedValue: (option: string) => void;
  width?: number;
  height?: number;
  fontSize: string;
  radius: string;
  border: string;
  hover: string;

  onClick?: () => void;
}
const borderClasses: Record<Props['border'], string> = {
  main: 'border border-zp-main-color',
  sub: 'border border-zp-sub-color',
  black: 'border border-zp-black',
  white: 'border border-zp-white',
  gray: 'border border-zp-gray',
  red: 'border border-zp-red',
  yellow: 'border border-zp-yellow',
  'light-gray': 'border border-zp-light-gray',
  'slight-white': 'border border-zp-slight-white',
  'light-beige': 'border border-zp-light-beige',
  'light-yellow': 'border border-zp-light-yellow',
  'light-orange': 'border border-zp-light-orange',
  transparent: 'border border-zp-transparent',
  none: 'border-none',
};
const hoverClasses: Record<Props['hover'], string> = {
  main: 'zp-main-color',
  sub: 'zp-sub-color',
  black: 'zp-black',
  white: 'zp-white',
  gray: 'zp-gray',
  red: 'zp-red',
  yellow: 'zp-yellow',
  'light-gray': 'zp-light-gray',
  'slight-white': 'zp-slight-white',
  'light-beige': 'zp-light-beige',
  'light-yellow': 'zp-light-yellow',
  'light-orange': 'zp-light-orange',
  transparent: 'zp-transparent',
};
const fontSizeClasses: Record<Props['fontSize'], string> = {
  '3xl': 'text-zp-3xl',
  '2xl': 'text-zp-2xl',
  xl: 'text-zp-xl',
  lg: 'text-zp-lg',
  md: 'text-zp-md',
  sm: 'text-zp-sm',
  xs: 'text-zp-xs',
  '2xs': 'text-zp-2xs',
};

const radiusClasses: Record<Props['radius'], string> = {
  big: 'rounded-zp-radius-big',
  btn: 'rounded-zp-radius-btn',
  full: 'rounded-zp-radius-full',
};
export default function Selectbar({
  options,
  selectedValue,
  setSelectedValue,
  width,
  height,
  fontSize,
  radius,
  border,
  hover,
  onClick,
}: Props) {
  const [isShowOptions, setIsShowOptions] = useState<boolean>(false);
  const handleClickOptions = function () {
    setIsShowOptions(!isShowOptions);
  };
  const handleOptionClick = function (option: string) {
    setSelectedValue(option);
    setIsShowOptions(false);
  };
  const Select: string = `${borderClasses[border]} outline-none ${radiusClasses[radius]}`;
  const Selected: string = `flex justify-between items-center py-[0.5rem] px-[1rem] cursor-pointer`;
  const SelectedValue:string = ``${fontSizeClasses[fontSize]}``
  const Options:string = 
  return (
    <div className={Select}>
      <div className={Selected}>
        <div className={SelectedValue}>{selectedValue}</div>
        {isShowOptions ? (
          <FaChevronUp size={16} />
        ) : (
          <FaChevronDown size={16} />
        )}
      </div>
      <ul>
        {options.map((option, index) => (
          <li key={index} onClick={() => handleOptionClick(option)}>
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
}
