import { sum } from "lodash";
import { v4 as guid } from "uuid";

interface Gobbler {
  multiple: number;
  id: string;
}

const goo = 4;

const gobblers: Gobbler[] = [
  {
    id: guid(),
    multiple: 1,
  },
  {
    id: guid(),
    multiple: 3,
  },
];

const optimizeAllocation = (gobblers: Gobbler[], initialGoo: number) => {
  const sumOfMultiples = sum(gobblers.map(({ multiple }) => multiple));
  const allocations = gobblers.map(({ id, multiple }) => {
    const gooAllocated = (multiple / sumOfMultiples) * initialGoo;
    const productionRate = Math.sqrt(gooAllocated * multiple);
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

const result = optimizeAllocation(gobblers, goo);

console.log({ result });
