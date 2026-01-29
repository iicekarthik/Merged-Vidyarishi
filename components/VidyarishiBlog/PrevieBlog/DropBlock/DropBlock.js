import React from "react";
import styled from "styled-components";
import DropBlockClient from "./DropBlockClient";

const DropBlockContainer = styled.div`
  width: 100%;
  margin: 20px auto;
`;

const DropBlock = ({ className, ...props }) => {
  return (
    <DropBlockContainer className={className}>
      <DropBlockClient data={props} />
    </DropBlockContainer>
  );
};

export default DropBlock;
