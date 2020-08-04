import faker from "faker";

export const getList = (size: number) =>
  Array.from({ length: size }, (v, i) => i).map((value) => ({
    id: `Item ${Math.floor(Math.random() * Date.now())}`,
    content: faker.random.word(),
    list: [],
  }));

export const reorderList = (
  list: Iterable<object>,
  startIndex: number,
  endIndex: number
) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};
