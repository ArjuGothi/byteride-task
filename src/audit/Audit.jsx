import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { userActions } from "_store";

import { Table, Select, Input } from "antd";
import "antd/dist/reset.css";

export { Audit };

function Audit() {
  const [search, setSearch] = useState('')
  const [timeFormat, setTimeFormat] = useState('12');
  const users = useSelector((x) => x.users.list);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.getAll());
  }, []);

  const getList = () => {
    if (users && users.value) {
      if (!search) {
        return users.value;
      }
      return users.value.filter(e => e.firstName.toLowerCase().startsWith(search.toLowerCase()) || e.lastName.toLowerCase().startsWith(search.toLowerCase()) || e.username.toLowerCase().startsWith(search.toLowerCase()))
    }
    return [];
  }

  const timeDate = (value) => {
    const date = new Date(value);
    const appendZero = (digit) => digit.toString().length > 1 ? digit : `0${digit}`
    return `${appendZero(date.getDate())}/${appendZero(date.getMonth())}/${date.getFullYear()} ${appendZero(timeFormat === '12' ? date.getHours() % 12 || 12 : date.getHours())}:${appendZero(date.getMinutes())}:${appendZero(date.getSeconds())}`
  }

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      // onFilter: (value, record) => record.firstName.includes(value),
      sorter: (a, b) => {
        let fa = a.firstName.toLowerCase(),
          fb = b.firstName.toLowerCase();

        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      },
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Time",
      dataIndex: "createdDate",
      key: "createdDate",
      render: (text) => <span>{timeDate(text)}</span>,
    },
  ];

  return (
    <div>
      <h1>Auditor Page</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Input
          placeholder="Search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value || '')
          }}
          style={{ width: 180 }}
        />
        <Select
          aria-label="Time format"
          placeholder="Time format"
          defaultValue={timeFormat}
          style={{ width: 120 }}
          onChange={(e) => {
            setTimeFormat(e)
          }}
          options={[
            { value: '12', label: '12 Hours' },
            { value: '23', label: '24 Hours' },
          ]}
        />
      </div>
      <Table
        rowKey={(data) => data.id}
        dataSource={getList()}
        columns={columns}
      />;
    </div>
  );
}
