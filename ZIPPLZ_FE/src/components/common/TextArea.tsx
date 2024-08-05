import React from 'react';

interface Props {
  className?: string;
  placeholder: string;
  width?: number | string;
  height?: number | string;
  fontSize: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

const fontSizeClasses: Record<Props['fontSize'], string> = {
  md: 'text-zp-md',
  sm: 'text-zp-sm',
  xs: 'text-zp-xs',
  '2xs': 'text-zp-2xs',
};

export default function TextArea({
  className,
  placeholder,
  width,
  height,
  fontSize,
  value,
  onChange,
  onKeyDown,
}: Props) {
  const baseStyle: string = `flex justify-center items-center rounded-zp-radius-big ${fontSizeClasses[fontSize]} bg-zp-transparent resize-none p-4 bg-zp-white border border-zp-light-gray outline-none`;

  const widthClass = width === 'full' ? 'w-full' : '';
  const heightClass = height === 'full' ? 'h-full' : '';
  const widthStyle = typeof width === 'number' ? `${width}rem` : width;
  const heightStyle = typeof height === 'number' ? `${height}rem` : height;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && e.shiftKey) {
      e.preventDefault();
      const target = e.target as HTMLTextAreaElement;
      const start = target.selectionStart;
      const end = target.selectionEnd;

      if (start !== null && end !== null) {
        const value = target.value;

        target.value = value.substring(0, start) + '\n' + value.substring(end);
        target.setSelectionRange(start + 1, start + 1);

        if (onChange) {
          onChange({
            ...e,
            target,
          } as React.ChangeEvent<HTMLTextAreaElement>);
        }
      }
    } else if (onKeyDown) {
      onKeyDown(e);
    }
  };

  return (
    <textarea
      placeholder={placeholder}
      className={`${baseStyle} ${widthClass} ${heightClass} ${className}`}
      style={{
        width: width === 'full' ? '100%' : widthStyle,
        height: height === 'full' ? '100%' : heightStyle,
      }}
      value={value}
      onChange={onChange}
      onKeyDown={handleKeyDown}
    />
  );
}
