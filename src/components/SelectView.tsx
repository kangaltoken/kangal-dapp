import { ReactComponent as Chevron } from "../assets/images/chevron.svg";

interface ISelectView {
  options: JSX.IntrinsicElements["option"][];
  value: string;
  onChange: (value: string) => void;
}

export default function SelectView(props: ISelectView) {
  return (
    <div className="inline-block relative">
      <select
        className="inline appearance-none pl-2 pr-7 pb-1 pt-2"
        value={props.value}
        onChange={(event) => {
          props.onChange(event.target.value);
        }}
      >
        {props.options}
      </select>
      <div className="absolute w-5 h-full top-0 right-1 pointer-events-none">
        <div className="absolute-center w-full">
          <Chevron className="transform rotate-90" />
        </div>
      </div>
      <div className="w-full h-px bg-body" />
    </div>
  );
}
