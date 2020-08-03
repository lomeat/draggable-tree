export const getList = (size: number, item: object) =>
  Array.from({ length: size }, () => item);
