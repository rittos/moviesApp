import { useState } from "react";

const useSorting = (data, sorters) => {
  const [sortValues, setSortValues] = useState(() => {
    const sortInitialValues = sorters.map((f) => ({
      name: f.name,
      value: f.value,
    }));
    return sortInitialValues;
  });

  const sortingConditions = sorters.map((f) => f.condition);
  const sortFunction = (collection) =>
    sortingConditions.reduce((data, conditionFn, index) => {
    return conditionFn(data, sortValues.value);
    }, collection);

  return {
    sortValues,
    setSortValues,
    sortFunction,
  };
};

export default useSorting;