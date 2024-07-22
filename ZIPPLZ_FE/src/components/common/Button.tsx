interface Props {
  children: string;
  buttonType: 'normal' | 'light' | 'second' | 'primary';
  width: number;
  height: number;
  fontSize: string;
  radius: string;
  onClick?: () => void;
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
};
export default function Button({
  children,
  buttonType,
  width,
  height,
  fontSize,
  radius,
  onClick,
}: Props) {
  const baseStyles = `flex justify-center items-center ${fontSizeClasses[fontSize]} ${radiusClasses[radius]}`;
  let typeStyles = '';

  switch (buttonType) {
    case 'primary':
      typeStyles = 'bg-zp-main-color text-zp-white';
      break;
    case 'second':
      typeStyles = 'bg-zp-sub-color text-zp-black';
      break;
    case 'light':
      typeStyles = 'bg-zp-light-beige text-zp-black';
      break;
    default:
      typeStyles = 'bg-zp-white text-zp-black border border-zp-main-color';
      break;
  }
  return (
    <button
      className={`${baseStyles} ${typeStyles}`}
      style={{ width: `${width}rem`, height: `${height}rem` }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
