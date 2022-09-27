import { ReactNode } from "react";
import styled from "styled-components";

export const BackGroundGradient = ({ children }: { children: ReactNode }) => {
  return <Box>{children}</Box>;
};

const Box = styled.div`
  background: linear-gradient(
    270deg,
    rgba(235, 247, 135, 0.4) 0%,
    #ebf787 17.19%,
    #ebf787 82.81%,
    rgba(235, 247, 135, 0.4) 100%
  );
  width: 100%;
  height: 100%;
  min-height: 100vw;
  position: absolute;
`;
