import { ItemType } from "./types";

export const treeMock = [
  {
    id: 1,
    title: "Games",
    items: [
      { id: 2, title: "Borderlands", items: [] },
      { id: 3, title: "Skyrim", items: [] },
      { id: 4, title: "The Legend of Zelda", items: [] },
    ],
  },
  {
    id: 5,
    title: "Books",
    items: [],
  },
  {
    id: 6,
    title: "Music",
    items: [
      {
        id: 7,
        title: "Dubstep",
        items: [
          {
            id: 8,
            title: "Skrillex",
            items: [],
          },
        ],
      },
      {
        id: 9,
        title: "Metal",
        items: [
          {
            id: 10,
            title: "Slayer",
            items: [],
          },
        ],
      },
    ],
  },
];

export const findItem = (id: number, items: ItemType[]) => {
  for (const node of items) {
    if (node.id === id) return node;
    if (node.items && node.items.length) {
      const result: any = findItem(id, node.items);
      if (result) {
        return result;
      }
    }
  }
  return false;
};

export const removeNode = (id: number, items: ItemType[]) => {
  for (const node of items) {
    if (node.id === id) {
      items.splice(items.indexOf(node), 1);
      return;
    }

    if (node.items && node.items.length) {
      removeNode(id, node.items);
    }
  }
};
