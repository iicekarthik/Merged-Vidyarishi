import React from "react";
import styled from "styled-components";
import JsonToTableClient from "./JsonToTableClient";

const JsonToTableContainer = styled.div`
  width: 100%;
  margin: 20px auto;
`;

const JsonToTable = ({ className, ...props }) => {
  return (
    <JsonToTableContainer className={className}>
      <JsonToTableClient data={props} />
    </JsonToTableContainer>
  );
};

export default JsonToTable;
