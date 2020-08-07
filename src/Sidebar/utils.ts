import { ItemType } from "./types";

export const treeMock = [
  {
    id: 1,
    title: "Tatooine",
    items: [
      { id: 2, title: "Endor", items: [] },
      { id: 3, title: "Hoth", items: [] },
      { id: 4, title: "Dagobah", items: [] },
    ],
  },
  {
    id: 5,
    title: "Death Star",
    items: [],
  },
  {
    id: 6,
    title: "Alderaan",
    items: [
      {
        id: 7,
        title: "Bespin",
        items: [{ id: 8, title: "Jakku", items: [] }],
      },
    ],
  },
];

export const findItem = (id: number, items: ItemType[]) => {
  for (const node of items) {
    if (node.id === id) return node;
    if (node.children && node.children.length) {
      const result: ItemType = findItem(id, node.children);
      if (result) {
        return result;
      }
    }
  }
  return { id: NaN, title: "Undefined" };
};

export const removeNode = (id: number, items: ItemType[]) => {
  for (const node of items) {
    if (node.id === id) {
      items.splice(items.indexOf(node), 1);
      return;
    }

    if (node.children && node.children.length) {
      removeNode(id, node.children);
    }
  }
};
