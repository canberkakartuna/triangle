import styled from "styled-components";

const StyledDrawerBox = styled.div`
  width: 300px;
  height: 300px;
  background-color: #fff;
  border: 1px solid #000;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const DrawerBox = ({ children }) => {
  return <StyledDrawerBox>{children}</StyledDrawerBox>;
};

export default DrawerBox;
