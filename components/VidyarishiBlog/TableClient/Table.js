import React from "react";
import styled from "styled-components";
import TableClient from "./TableClient";

const TableContainer = styled.div`
  margin: 0 auto;
  margin-top: 32px;
  margin-bottom: 32px;
  width: 100%;
  max-width: 100%;

  .custom-table {
    width: 100%;
    border: 1px solid #ddd;
    border-collapse: collapse;
    border-radius: 8px;
  }
`;

const Table = ({ className, ...props }) => {
  return (
    <TableContainer className={className}>
      <TableClient data={props} />
    </TableContainer>
  );
};

export default Table;