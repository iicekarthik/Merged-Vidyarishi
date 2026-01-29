'use client';
import { Highlight, themes } from 'prism-react-renderer';
import React from 'react';
import styled from 'styled-components';
// import { CopyButton } from './CopyButton';

const CodeBlock = styled.pre`
  background-color: #1e1e1e;
  padding: 16px;
  border-radius: 8px;
  color: white;
  font-size: 14px;
  overflow-x: auto;

  .line {
    display: table-row;
  }

  .line-number {
    display: table-cell;
    width: 40px;
    text-align: right;
    color: rgba(255, 255, 255, 0.5);
  }

  .line-content {
    display: table-cell;
    padding-left: 12px;
  }
`;

const Code = ({ code, language = '' }) => {
  if (!code) return null;

  return (
    <Highlight code={code} language={language} theme={themes.vsDark}>
      {({ getLineProps, getTokenProps, tokens }) => (
        <CodeBlock className="code-block">
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ className: 'line', line })}>
              <span className="line-number">{i + 1}</span>
              <span className="line-content">
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </span>
            </div>
          ))}
          {/* <CopyButton code={code} /> */}
        </CodeBlock>
      )}
    </Highlight>
  );
};

export default Code;
