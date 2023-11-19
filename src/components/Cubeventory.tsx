export const Cubeventory = ({
  cols,
  rows,
  itemSize,
  color,
}: {
  cols: number;
  rows: number;
  itemSize: number[];
  color: string;
}): JSX.Element => {
  const itemHeight = itemSize[0];
  const itemWidth = itemSize[1];
  const autoWord = "auto ";
  const autoCols = autoWord.repeat(cols);
  const itemCount = cols * rows;
  return (
    <div className="grid-container" style={{ gridTemplateColumns: autoCols }}>
      {[...Array(itemCount)].map((e, i) => (
        <div
          key={i}
          style={{
            height: itemHeight,
            width: itemWidth,
            backgroundColor: color,
          }}
        />
      ))}
    </div>
  );
};
