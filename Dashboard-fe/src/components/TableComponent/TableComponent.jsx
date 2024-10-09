import { Table } from 'antd';
import React from 'react'
import './style.css'

const TableComponent = (props) => {
  const { data:dataSource = [], columns = [] } = props
  return (
      <Table
        columns={columns}
        dataSource={dataSource}
        {...props}
      />
  )
}

export default TableComponent