interface IPoolInfoBox {
  title: string;
  amount: string | null;
  iconBackground: React.ReactNode;
  iconForeground: React.ReactNode;
}

export default function InfoBox(props: IPoolInfoBox) {
  return (
    <div className="flex-1 flex items-center rounded-lg shadow-k p-6 bg-white">
      <div className="relative w-10 h-10">
        {props.iconBackground}
        <div className="absolute-center w-5">{props.iconForeground}</div>
      </div>
      <div className="ml-4">
        <h3 className="text-xs font-bold text-gray-600">{props.title}</h3>
        <h2 className="text-2xl mt-2 text-body">{props.amount ?? ""}</h2>
      </div>
    </div>
  );
}
