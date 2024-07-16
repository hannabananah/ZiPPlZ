<<<<<<< HEAD
import Button from '@components/common/Button';
import Input from '@components/common/Input';
=======
import Calendar from '@components/schedule/Calendar';
>>>>>>> b72d5f6 (FEAT: test Calendar Library)

export default function Home() {
  return (
    <div>
      Home
<<<<<<< HEAD
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
        onKeydown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === 'Enter') alert('keydown');
        }}
      />
=======
      <Calendar />
>>>>>>> b72d5f6 (FEAT: test Calendar Library)
    </div>
  );
}
