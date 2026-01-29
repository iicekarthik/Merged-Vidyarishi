import React from "react";
import styled from "styled-components";
import { RiArrowDropDownLine } from "react-icons/ri";

const DropBlockWrapper = styled.details`
  background-color: #f9f9f9;
  padding: 16px;
  border-radius: 8px;

  summary {
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    color: #333;
    padding: 8px 0;
  }

  .drop-block-heading {
    margin-right: 10px;
  }

  .drop-block-icon {
    width: 18px;
    height: 18px;
    float: right;
    text-align: right;
    transition: transform 0.2s;
  }

  &[open] .drop-block-icon {
    transform: rotate(-180deg);
  }

  .drop-block-content {
    padding: 10px;
    background-color: #f0f0f0;
    margin-top: 10px;
    border-radius: 4px;
  }
`;

const DropBlockClient = ({ data }) => {
  if (!data) return null;
  // console.log("DropBlockClient", data);

  return (
    <DropBlockWrapper className="drop-block m-4">
      <summary className="drop-block-summary">
        <span className="drop-block-heading">{data?.fields?.DropHead}</span>
        {/* <svg
          className="drop-block-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg> */}
        <RiArrowDropDownLine size={26} />
      </summary>
      <div className="drop-block-content">{data?.fields?.DropContent}</div>
    </DropBlockWrapper>
  );
};

export default DropBlockClient;
