import Button from '@components/common/Button';
import Input from '@components/common/Input';

export default function Home() {
  return (
    <div>
      Home
      <p>hello</p>
      <Button
        children="primary"
        buttonType="primary"
        width={6}
        height={2}
        fontSize="lg"
        radius="none"
        onClick={() => alert('clicked')}
      />
      <Input
        type="text"
        placeholder="이메일을 입력해주세요"
        inputType="signup"
        width={10}
        height={3}
        fontSize="xs"
        radius="none"
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === 'Enter') alert('keydown');
        }}
      />
    </div>
  );
}
