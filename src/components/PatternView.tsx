interface IPatternView {
  emoji: string;
}

export default function PatternView(props: IPatternView) {
  const rows = 10;
  const columns = 10;

  return (
    <div className="z-0 top-0 left-0 h-full w-14 opacity-30 absolute overflow-hidden">
      <div>
        <div className="absolute-center" style={{ left: 2, top: -7 }}>
          {Array.from({ length: rows }, (_, rowIndex) => (
            <div key={rowIndex} className={`flex -ml-${rowIndex}`}>
              {Array.from({ length: columns }, (_, columnIndex) => (
                <div className="text-lg" key={`${rowIndex}-${columnIndex}`}>
                  {props.emoji}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
