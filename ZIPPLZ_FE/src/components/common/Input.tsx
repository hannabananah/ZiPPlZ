import React from 'react';

interface Props {
  placeholder: string;
  inputType:
    | 'login'
    | 'signup'
    | 'normal'
    | 'search'
    | 'textArea'
    | 'file'
    | 'error';
  width: number;
  height: number;
  fontSize: string;
  radius: string;
  onChange?: () => void;
  onKeydown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}
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
  none: 'rounded-none',
};
export default function Input({
  placeholder,
  inputType,
  width,
  height,
  fontSize,
  radius,
  onChange,
  onKeydown,
}: Props) {
  const baseStyle: string = `flex justify-cente items-center ${fontSizeClasses[fontSize]} ${radiusClasses[radius]} `;
  let typeStyle = '';
  switch (inputType) {
    case 'normal':
      typeStyle = 'border border-zp-light-gray focus: outline-none';
      break;
    case 'search':
      typeStyle = 'border border-zp-main-color focus: outline-none';
      break;
    case 'login':
      typeStyle = 'border-b border-zp-main-color focus: outline-none';
      break;
    case 'signup':
      typeStyle =
        'focus:outline-none focus:border-b focus:border-zp-light-gray';
      break;
    case 'error':
      typeStyle = 'border-b border-zp-red focus:outline-none';
      break;
  }
  return (
    <input
      placeholder={placeholder}
      className={`${baseStyle} ${typeStyle}`}
      style={{ width: `${width}rem`, height: `${height}rem` }}
      onChange={onChange}
      onKeyDown={onKeydown}
    ></input>
  );
}
