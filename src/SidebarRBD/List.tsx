import React from "react";

import { Item, ItemType } from "./Item";

type ListProps = {
  items: ItemType[];
  toggleListVisibility: Function;
  addItem: Function;
};

export const List = React.memo(function List({
  items,
  toggleListVisibility,
  addItem,
}: any) {
  return items.map((item: any, index: number) => (
    <Item
      key={item.id}
      item={item}
      index={index}
      toggleListVisibility={toggleListVisibility}
      addItem={addItem}
    />
  ));
});
