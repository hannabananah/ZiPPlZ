import Input from '@components/common/Input';

interface DateInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

const DateInput: React.FC<DateInputProps> = ({
  value,
  onChange,
  placeholder,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value.replace(/[^0-9]/g, ''); // 숫자 이외의 문자 제거

    if (inputValue.length > 8) {
      inputValue = inputValue.slice(0, 8);
    }

    if (inputValue.length > 6) {
      inputValue = `${inputValue.slice(0, 4)}/${inputValue.slice(4, 6)}/${inputValue.slice(6, 8)}`;
    } else if (inputValue.length > 4) {
      inputValue = `${inputValue.slice(0, 4)}/${inputValue.slice(4, 6)}`;
    } else if (inputValue.length > 0) {
      inputValue = `${inputValue.slice(0, 4)}`;
    }

    onChange(inputValue);
  };

  return (
    <Input
      type="text"
      inputType="signup"
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      width="full"
      height={2}
      fontSize="xl"
      radius="none"
    />
  );
};

export default DateInput;
