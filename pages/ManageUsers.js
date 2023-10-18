import React from 'react';
import DATA from '../db1.json';
import '@/styles/Home.module.css';
import { Table, Button } from 'antd';

const mapColumn = (column) => {
  if (column.dataIndex === 'roll' || column.dataIndex === 'location') {
    return {
      ...column,
      onFilter: (value, record) => {
        const dataValue = record[column.dataIndex].toLowerCase();
        return dataValue.includes(value.toLowerCase());
      },
    };
  }
  return column;
};

// Define a custom column for "Actions"
const actionsColumn = {
  title: 'Actions',
  dataIndex: 'actions',
  render: (text, record) => (
    <div>
      <Button type="primary" onClick={() => handleEdit(record)}>Edit</Button>
      <Button type="danger" onClick={() => handleDelete(record)}>Delete</Button>
    </div>
  ),
};

// Add the "Actions" column to the columns array
const columns = [...DATA.columns, actionsColumn].map(mapColumn);
const data = DATA.data;

const handleEdit = (record) => {
  // Implement edit logic here
  console.log('Edit clicked for record:', record);
};

const handleDelete = (record) => {
  // Implement delete logic here
  console.log('Delete clicked for record:', record);
};

const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};

const App = () => (
  <div className="table-container">
    <Table
      columns={columns}
      dataSource={data}
      onChange={onChange}
      pagination={{ pageSize: 7 }}
    />
  </div>
);

export default App;
