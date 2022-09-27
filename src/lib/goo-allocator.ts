import { sum, toNumber } from "lodash";

export interface Gobbler {
  multiple: number | string;
  id: string;
}

export const allocateGoo = (gobblers: Gobbler[], initialGoo: number) => {
  const sumOfMultiples = sum(gobblers.map(({ multiple }) => multiple));
  const allocations = gobblers.map(({ id, multiple }) => {
    const gooAllocated = (toNumber(multiple) / sumOfMultiples) * initialGoo;
    const productionRate = Math.sqrt(gooAllocated * toNumber(multiple));
    return {
      id,
      multiple,
      gooAllocated,
      productionRate,
    };
  });

  const totalProductionRate = sum(
    allocations.map(({ productionRate }) => productionRate)
  );

  return {
    totalProductionRate,
    allocations,
  };
};
