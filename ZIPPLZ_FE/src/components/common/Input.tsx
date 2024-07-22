interface Props {
  children: string;
  buttonType: 'normal' | 'light' | 'second' | 'primary';
  width: number;
  height: number;
  fontSize: string;
  radius: string;
  onClick?: () => void;
}
export default function Input() {
  return <div>Input</div>;
}
