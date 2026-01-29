import React from 'react';
import styled from 'styled-components';
// import RichText from '@/components/RichText';

const BannerBlockContainer = styled.div`
  margin: 32px auto;
  width: 100%;

  .banner-content {
    padding: 16px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    font-size: 14px;
    text-align: left;

    &.info {
      border: 1px solid #2b8a3e;
      background-color: #2b8a3e30;
    }

    &.error {
      border: 1px solid #e53e3e;
      background-color: #e53e3e30;
    }

    &.success {
      border: 1px solid #48bb78;
      background-color: #48bb7830;
    }

    &.warning {
      border: 1px solid #f6ad55;
      background-color: #f6ad5530;
    }
  }
`;

const BannerBlock = ({ className, content, style }) => {
  return (
    <BannerBlockContainer className={`banner-block ${className || ''}`}>
      <div className={`banner-content ${style || ''}`}>
        {/* <RichText data={content} enableGutter={false} enableProse={false} /> */}
      </div>
    </BannerBlockContainer>
  );
};

export default BannerBlock;