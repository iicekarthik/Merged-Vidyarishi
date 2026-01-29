import React from "react";
import styled from "styled-components";

const StyledList = styled.ul`
  padding-left: 20px;
  list-style-type: ${(props) => (props.listType === "ordered" ? "decimal" : "disc")};
`;

const StyledListItem = styled.li`
  margin-bottom: 8px;
  font-size: 14px;
  color: #333;
`;

const ListClient = ({ data }) => {
  if (!data) return null;

  const ListElement = data.listType === "unordered" ? "ul" : "ol";

  return (
    <StyledList as={ListElement} listType={data.listType}>
      {data.listItem?.map((item, index) => (
        <StyledListItem key={index}>{item.itemData}</StyledListItem>
      ))}
    </StyledList>
  );
};

export default ListClient;
