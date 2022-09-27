import { v4 as guid } from "uuid";
import type { NextPage } from "next";
import { ChangeEvent, useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import { BackGroundGradient } from "../src/components/BackgroundGradient";
import { allocateGoo, Gobbler } from "../src/lib/goo-allocator";
import { isNumber, toNumber } from "lodash";
import { RemoveCircle } from "@styled-icons/ionicons-solid";

const TextInput = ({
  value,
  onChange,
}: {
  value: any;
  onChange: (a: string) => void;
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };
  return <_TextInput value={value} onChange={handleChange} />;
};

const Home: NextPage = () => {
  const [gobblers, setGobblers] = useState<Gobbler[]>([
    {
      id: guid(),
      multiple: 1,
    },
    {
      id: guid(),
      multiple: 1,
    },
  ]);

  const [goo, setGoo] = useState<number | "">(4);

  const updateGoo = (input: string) => {
    if (input == "") return setGoo(input);

    if (!isNaN(toNumber(input))) return setGoo(toNumber(input));
  };

  const addGobbler = useCallback(() => {
    setGobblers((old) => [
      ...old,
      {
        id: guid(),
        multiple: 1,
      },
    ]);
  }, []);

  const setMultiple = useCallback(
    (gobblerId: string) => (rawMultiple: string) => {
      const index = gobblers.findIndex((gobbler) => gobbler.id === gobblerId);
      const multiple = isNaN(toNumber(rawMultiple))
        ? gobblers[index].multiple
        : rawMultiple && toNumber(rawMultiple);

      const newArr = [...gobblers];
      (newArr[index] = {
        id: gobblerId,
        multiple,
      }),
        setGobblers(newArr);
    },
    [gobblers]
  );

  const removeGobbler = useCallback((id: string) => {
    setGobblers((old) => old.filter((gobbler) => gobbler.id !== id));
  }, []);

  const isValid = useMemo(
    () => gobblers.every((gobbler) => isNumber(gobbler.multiple)),
    [gobblers]
  );

  const { allocations, totalProductionRate } = useMemo(() => {
    if (!isValid || typeof goo !== "number")
      return { allocations: undefined, totalProductionRate: undefined };
    return allocateGoo(gobblers, goo);
  }, [gobblers, goo, isValid]);

  return (
    <>
      <BackGroundGradient>
        <Navbar>
          <Title>Gobbler Tools</Title>
          <NavigationOptions>
            <Option selected>Goo Optimizer</Option>
            <Option>More tools coming soon</Option>
          </NavigationOptions>
        </Navbar>
        <ToolSection>
          <ToolContainer>
            <Title>Goo Optimizer</Title>
            <>
              <FieldSet>
                <Title>Goo</Title>
                <Field>
                  <TextInput value={goo} onChange={updateGoo} />
                </Field>
                <Field>
                  <Value>Total Production Rate</Value>
                  {totalProductionRate?.toFixed(7) || "-"}
                </Field>
              </FieldSet>
              <>
                {gobblers.map(({ id, multiple }, index) => {
                  const alloc = allocations?.find((alloc) => alloc.id === id);

                  return (
                    <FieldSet key={index}>
                      <Title>Gobbler #{index + 1}</Title>
                      <Field>
                        <TextInput
                          value={multiple}
                          onChange={setMultiple(id)}
                        />
                        <FieldLabel>Multiple</FieldLabel>
                      </Field>
                      <Field>
                        <Value>{alloc?.gooAllocated?.toFixed(7) || "-"}</Value>
                        <FieldLabel>Goo Allocation</FieldLabel>
                      </Field>
                      <Field>
                        <Value>
                          {alloc?.productionRate?.toFixed(7) || "-"}
                        </Value>
                        <FieldLabel>ProductionRate</FieldLabel>
                      </Field>
                      <RemoveCircleIcon
                        onClick={() => {
                          removeGobbler(id);
                        }}
                        size={32}
                      />
                    </FieldSet>
                  );
                })}
              </>
              <Button onClick={addGobbler}>+Add Gobbler</Button>
            </>
          </ToolContainer>
        </ToolSection>
      </BackGroundGradient>
    </>
  );
};

export default Home;

const FieldSet = styled.div`
  display: grid;
  justify: space-between;
  align-items: center;
  grid-template-columns: 3fr 3fr 4fr 4fr 1fr;
`;

const Button = styled.button`
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const RemoveCircleIcon = styled(RemoveCircle)`
  padding: 20px;
`;

const Value = styled.div`
  font-weight: 700;
`;

const Field = styled.div`
  display: flex;
  justify: space-between;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  flex-grow: 1;
`;

const Label = styled.div``;
const FieldLabel = styled.div`
  font-size: 12px;
  text-align: left;
  margin-botttom: 10px;
`;

const _TextInput = styled.input`
  font-size: 18px;
  width: 60px;
`;

const ToolSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
`;
const ToolContainer = styled.div`
  background: #fff;
  max-width: 900px;
  width: 700px;
  min-width: 600px;
  margin: 0 auto;
  margin-top: 100px;
  border-radius: 10px;
  border: 5px solid #000;
  text-align: center;
`;

const Navbar = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
`;

const Title = styled.div`
  font-weight: 900;
  font-size: 24px;
  padding: 20px;
`;

const NavigationOptions = styled.div`
  justify-self: center;
  display: flex;
`;

const Option = styled.a<{ selected?: boolean }>`
  padding: 20px;
  ${({ selected }) => (selected ? "text-decoration: underline" : "")}
`;
