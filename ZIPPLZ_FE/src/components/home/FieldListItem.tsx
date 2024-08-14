interface Props {
  field: string;
  handlClickField: () => void;
}
export default function FieldListItem({ field, handlClickField }: Props) {
  const imageSrc = `/svg/mainpage/가구.svg`;
  console.log(`${field}`);

  return (
    <>
      <div className="flex flex-col items-center w-full">
        <div
          className="flex p-2 cursor-pointer aspect-square bg-zp-white rounded-zp-radius-big"
          onClick={handlClickField}
        >
          <img src={imageSrc} />
        </div>
        <p className="font-bold text-zp-3xs">{field}</p>
      </div>
    </>
  );
}
