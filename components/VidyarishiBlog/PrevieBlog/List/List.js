import React from "react";
import styled from "styled-components";
import ListClient from "./ListClient";

const ListContainer = styled.div`
  width: 100%;
  margin: 20px auto;
`;

const List = ({ className, ...props }) => {
  return (
    <ListContainer className={className}>
      <ListClient data={props} />
    </ListContainer>
  );
};

export default List;
