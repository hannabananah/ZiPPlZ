interface Props {
  field: string;
}
export default function FieldListItem({ field }: Props) {
  const imageSrc = `public/svg/mainpage/${field}.svg`;
  return (
    <>
      <div className="w-full flex flex-col items-center">
        <div className="flex p-2 aspect-square bg-zp-white rounded-zp-radius-big cursor-pointer">
          <img src={imageSrc} />
        </div>
        <p className="text-zp-3xs font-bold">{field}</p>
      </div>
    </>
  );
}
