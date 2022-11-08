import styled from "styled-components";
import { DARK_GREY } from "utils/constant";

const StyledDrawerBox = styled.div`
  width: 300px;
  height: 300px;
  background-color: #fff;
  border: 1px solid ${DARK_GREY};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

interface DrawerBoxProp {
  children: React.ReactNode;
}

const DrawerBox: React.FC<DrawerBoxProp> = ({ children }: DrawerBoxProp) => {
  return <StyledDrawerBox>{children}</StyledDrawerBox>;
};

export default DrawerBox;
