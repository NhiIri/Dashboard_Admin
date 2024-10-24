import React from 'react';
import { Table } from 'antd';
import './Style.css';

const TableComponent = ({ columns, dataSource, scrollHeight = 400}) => {
  return (
    <Table
      className="custom-table"
      columns={columns}
      dataSource={dataSource}
      scroll={{ x: 1300, y: scrollHeight }}
    />
  )
}

export default TableComponent;

