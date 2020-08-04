import faker from "faker";

import { getList } from "./utils";

export const listModel = {
  state: {
    isDragging: false,
    lists: getList(5),
  },
  reducers: {
    updateList(state: object, size: number) {},
    moveItem(lastY: number, nextY: number) {},
    toggleDragging(isDragging: boolean) {},
  },
};
