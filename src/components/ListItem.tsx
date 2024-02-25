import { getWeight } from "../functions";
import { PersonalItem } from "../types";

export const ListItem = ({
  item,
  openedItem,
  setOpenedItem,
}: {
  item: PersonalItem;
  openedItem: PersonalItem | null;
  setOpenedItem: (item: PersonalItem) => void;
}): JSX.Element => {
  const weight = getWeight(item.size);
  return (
    <div
      className="list-item"
      style={openedItem?.id === item.id ? { fontWeight: "bold" } : undefined}
      onClick={() => setOpenedItem(item)}
    >
      {`${item.name} [${weight}]`}
    </div>
  );
};
