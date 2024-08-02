interface Props {
  className?: string;
  placeholder?: string;
  type: 'text' | 'password' | 'email' | 'number' | 'search' | 'tel';
  inputType:
    | 'none'
    | 'login'
    | 'signup'
    | 'normal'
    | 'search'
    | 'textArea'
    | 'file'
    | 'error';
  width?: number | string;
  height: number | string;
  fontSize: string;
  radius: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
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
  type,
  width,
  height,
  fontSize,
  radius,
  value,
  onChange,
  onKeyDown,
}: Props) {
  const baseStyle: string = `flex justify-center items-center ${fontSizeClasses[fontSize]} ${radiusClasses[radius]} bg-zp-transparent  `;

  let typeStyle = '';
  switch (inputType) {
    case 'normal':
      typeStyle =
        'border border-zp-light-gray focus:outline-none caret-zp-main-color placeholder-zp-main-color px-2';
      break;
    case 'search':
      typeStyle =
        'border border-zp-main-color focus:outline-none caret-zp-main-color placeholder-zp-main-color px-10';
      break;
    case 'login':
      typeStyle = ' border-b border-zp-main-color focus:outline-none';
      break;
    case 'signup':
      typeStyle =
        'focus:outline-none focus:border-b focus:border-zp-light-gray';
      break;
    case 'error':
      typeStyle = 'border-b border-zp-red focus:outline-none';
      break;
    case 'none':
      typeStyle = 'focus:outline-none';
      break;
  }

  const widthClass = width === 'full' ? 'w-full' : '';
  const heightClass = height === 'full' ? 'h-full' : '';
  const widthStyle = typeof width === 'number' ? `${width}rem` : width;
  const heightStyle = typeof height === 'number' ? `${height}rem` : height;

  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`${baseStyle} ${typeStyle} ${widthClass} ${heightClass}`}
      style={{
        width: width === 'full' ? '100%' : widthStyle,
        height: height === 'full' ? '100%' : heightStyle,
      }}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  );
}
