import React from 'react';
import styled from 'styled-components';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: ${({ border }) => border || '1px solid #ddd'};
`;

const Td = styled.td`
  padding: ${({ padding }) => padding || '8px'};
  border: ${({ borderColor }) => borderColor || '1px solid #ddd'};
  background-color: ${({ bgColor }) => bgColor || 'transparent'};
  text-align: left;

  a {
    text-decoration: none;
    color: inherit;
  }
`;

const NestedTableContainer = styled.div`
  margin-top: 20px;
  border: 1px solid #ddd;
  padding: 10px;
`;

const TableClient = ({ data }) => {
  if (!data || !data.row) return null;

  return (
    <Table border={data.tableBorder}>
      <tbody>
        {data.row.map((row, rowIdx) => (
          <tr key={rowIdx}>
            {row.column.map((col, colIdx) => (
              <Td
                key={colIdx}
                colSpan={col.colspan || 1}
                rowSpan={col.rowspan || 1}
                padding={`${data.cellPadding || 8}px`}
                borderColor={data.cellBorderColor || '#ddd'}
                bgColor={col.cellBackgroundColor}
              >
                {col.linkField ? (
                  <a href={col.linkField}>{col.cell}</a>
                ) : (
                  col.cell
                )}
                {col.nestedTable && col.nestedTable.length > 0 && (
                  <NestedTableContainer>
                    {col.nestedTable.map((nestedTable, nestedIdx) => (
                      <TableClient key={nestedIdx} data={nestedTable} />
                    ))}
                  </NestedTableContainer>
                )}
              </Td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TableClient;