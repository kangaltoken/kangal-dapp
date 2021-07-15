interface IPatternView {
  emoji: string;
}

export default function PatternView(props: IPatternView) {
  const rows = 4;
  const columns = 4;
  //const spacingX = 2;
  //const spacingY = 2;

  return (
    <div className="z-0 top-0 left-0 h-full w-14 bg absolute overflow-hidden">
      {Array.from({ length: rows }, (_, rowIndex) => (
        <div className={`flex -mt-2 -ml-${rowIndex}`}>
          {Array.from({ length: columns }, (_, columnIndex) => (
            <div className={`flex`}>{props.emoji}</div>
          ))}
        </div>
      ))}
    </div>
  );
}
