export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
};

const memorize = (fn) => {
  let oldObj = {};
  let oldReturn;
  return (obj) => {
    const same = Object.entries(obj).every(([key, value]) => oldObj[key] === value);
    if (same) {
      return oldReturn;
    }
    oldObj = obj;
    oldReturn = fn(obj);
    return oldReturn;
  };
};

export const saveState = memorize((state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (error) {}
});
