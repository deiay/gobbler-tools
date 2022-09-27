import { allocateGoo } from "./goo-allocator";
import { v4 as guid } from "uuid";

const goo = 4;
const gobblers = [
  {
    id: guid(),
    multiple: 1,
  },
  {
    id: guid(),
    multiple: 3,
  },
];

describe("allocateGoo", () => {
  it("computes the right amount of goo", () => {
    expect(allocateGoo(gobblers, goo)).toEqual({
      allocations: [
        {
          id: gobblers[0].id,
          multiple: gobblers[0].multiple,
          gooAllocated: 1,
          productionRate: 1,
        },
        {
          id: gobblers[1].id,
          multiple: gobblers[1].multiple,
          gooAllocated: 3,
          productionRate: 3,
        },
      ],
      totalProductionRate: 4,
    });
  });
});
