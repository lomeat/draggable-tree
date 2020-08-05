import faker from "faker";

import { getList } from "./utils";

export const listModel = {
  state: getList(10),
  reducers: {
    reorderList(state: Array<object>, startIndex: number, endIndex: number) {
      const result = Array.from(state);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);

      return result;
    },

    addItem(state: Array<object>, id: string) {
      const newState = state.map((item: object) => {
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

    toggleVisibility(state: Array<object>, id: string) {
      const newState = state.map((item: object) => {
        if (item.id === id) {
          item.isListVisible = !item.isListVisible;
        }
        return item;
      });

      return newState;
    },
  },
};
