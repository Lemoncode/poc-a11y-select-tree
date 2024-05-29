export const findPath = (id: string | undefined, optionList: any) => {
  const path: string[] = [];
  let currentId = id;
  while (currentId) {
    const option = optionList.find((option: any) => option.id === currentId);
    if (option) {
      path.unshift(option.label);
      currentId = option.parentId;
    } else {
      currentId = undefined;
    }
  }
  return path.join(' > ');
};
