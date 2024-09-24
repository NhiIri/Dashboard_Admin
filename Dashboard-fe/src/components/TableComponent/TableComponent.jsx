import { Table } from 'antd';
import React, { useState } from 'react'

const TableComponent = (props) => {
  const { selectionType = 'checkbox', data:dataSource = [], isLoading = false, columns = [] } = props
  const [rowSelectedKeys, setRowSelectedKeys] = useState([])

    const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setRowSelectedKeys(selectedRowKeys)
    },
  };

 
  return (
      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={dataSource}
        {...props}
      />
  )
}

export default TableComponent