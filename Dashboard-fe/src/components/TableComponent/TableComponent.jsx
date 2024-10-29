import React from 'react';
import { Table } from 'antd';
import './Style.css';

const TableComponent = (props) => {
  const {columns = [], dataSource:dataSource = []} = props
  return (
    <Table
      className="custom-table"
      columns={columns}
      dataSource={dataSource}
      scroll={{ x: 1300, y: 460 }}
      {...props}
    />
  )
}

export default TableComponent
