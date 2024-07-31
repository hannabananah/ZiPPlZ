import Input from '@components/common/Input';

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

const RegistrationInput: React.FC<Props> = ({
  value,
  onChange,
  placeholder,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value.replace(/[^0-9]/g, ''); // 숫자 이외의 문자 제거

    if (inputValue.length > 10) {
      inputValue = inputValue.slice(0, 11);
    }

    if (inputValue.length > 5) {
      inputValue = `${inputValue.slice(0, 3)}-${inputValue.slice(3, 5)}-${inputValue.slice(5, 10)}`;
    } else if (inputValue.length > 3) {
      inputValue = `${inputValue.slice(0, 3)}${inputValue.slice(3, 5)}`;
    } else if (inputValue.length > 0) {
      inputValue = `${inputValue.slice(0, 3)}`;
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

export default RegistrationInput;
