import React from 'react';
import DATA from '../db.json';
import '@/styles/Home.module.css'
import { Table } from 'antd';

const columns = DATA.columns.map(column => {
  if (column.dataIndex === 'name') {
    return {
      ...column,
      onFilter: (value, record) => record.name.includes(value),
    };
  } else if (column.dataIndex === 'address') {
    return {
      ...column,
      onFilter: (value, record) => record.address.includes(value),
    };
  }else if (column.dataIndex === 'age') {
      return {
        ...column,
        sorter: (a, b) => a.age - b.age,
      };
    }
  return column;
});

const data = DATA.data;

const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};

const App = () => (
    <div className="table-container">
      <Table columns={columns} dataSource={data} onChange={onChange} />
    </div>
  );
export default App;
