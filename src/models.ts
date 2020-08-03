import faker from "faker";

import { getList } from "./utils";

const item = {
  id: Math.floor(Math.random() * Date.now()),
  title: faker.commerce.productName(),
};

export const listModel = {
  state: {
    isDragging: false,
    lists: getList(5, getList(3, item)),
  },
  reducers: {
    updateList(state: object, size: number) {},
    moveItem(lastY: number, nextY: number) {},
    toggleDragging(isDragging: boolean) {},
  },
};
