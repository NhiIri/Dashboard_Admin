import { Table } from "antd";
import React from "react";

const TableComponent = (props) => {
  const { data: dataSource = [], columns = [] } = props;
  return <Table columns={columns} dataSource={dataSource} {...props} />;
};

export default TableComponent;
