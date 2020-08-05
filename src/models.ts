import faker from "faker";

import { getList } from "./utils";

type ItemType = {
  id: string;
  content: string;
  list: ItemType[];
  isListVisible: boolean;
};

export const listModel = {
  state: getList(10),
  reducers: {
    reorderList(state: ItemType[], startIndex: number, endIndex: number) {
      const result = Array.from(state);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);

      return result;
    },

    addItem(state: ItemType[], id: string) {
      const newState: object[] = state.map((item: any) => {
        if (item.id === id) {
          item.list.push({
            id: `Item ${Math.floor(Math.random() * Date.now())}`,
            content: faker.random.word(),
            list: [],
          });
          item.isListVisible = false;
        }
        return item;
      });
      return newState;
    },

    toggleVisibility(state: ItemType[], id: string) {
      const newState: object[] = state.map((item: any) => {
        if (item.id === id) {
          item.isListVisible = !item.isListVisible;
        }
        return item;
      });
      return newState;
    },
  },
};
