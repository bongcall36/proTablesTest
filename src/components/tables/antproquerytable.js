import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Dropdown, Space, Tag } from 'antd';
import { useRef } from 'react';
import request from 'umi-request';
export const waitTimePromise = async (time = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const waitTime = async (time = 100) => {
  await waitTimePromise(time);
};

const GithubIssueItem = {
  url:'',
  id:0,
  number:0,
  title:'',
  labels: [{
    name: '',
    color: '',
  }],
  state: '',
  comments: 0,
  created_at: '',
  updated_at: '',
  closed_at: '',
};

const columns = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '제목',
    dataIndex: 'title',
    copyable: true,
    ellipsis: true,
    tip: '제목이 너무 길면 저절로 줄어들 수 있다',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '이 항목은 필수 기입 항목이다',
        },
      ],
    },
  },
  {
    disable: true,
    title: '상태',
    dataIndex: 'state',
    filters: true,
    onFilter: true,
    ellipsis: true,
    valueType: 'select',
    valueEnum: {
      all: { text: '너무 길다'.repeat(50) },
      open: {
        text: '미해결',
        status: 'Error',
      },
      closed: {
        text: '해결됨',
        status: 'Success',
        disabled: true,
      },
      processing: {
        text: '해결중',
        status: 'Processing',
      },
    },
  },
  {
    disable: true,
    title: '라벨',
    dataIndex: 'labels',
    search: false,
    renderFormItem: (_, { defaultRender }) => {
      return defaultRender(_);
    },
    render: (_, record) => (
      <Space>
        {record.labels.map(({ name, color }) => (
          <Tag color={color} key={name}>
            {name}
          </Tag>
        ))}
      </Space>
    ),
  },
  {
    title: '생성 시간',
    key: 'showTime',
    dataIndex: 'created_at',
    valueType: 'date',
    align: 'center',
    sorter: true,
    hideInSearch: true,
  },
  {
    title: '생성 시간',
    dataIndex: 'created_at',
    valueType: 'dateRange',
    hideInTable: true,
    search: {
      transform: (value) => {
        return {
          startTime: value[0],
          endTime: value[1],
        };
      },
    },
  },
  {
    title: '옵션',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.id);
        }}
      >
        편집
      </a>,
      <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
        조회
      </a>,
      <TableDropdown
        key="actionGroup"
        onSelect={() => action?.reload()}
        menus={[
          { key: 'copy', name: '복사' },
          { key: 'delete', name: '삭제' },
        ]}
      />,
    ],
  },
];

export const AntProQueryTable = () => {
  const actionRef = useRef();
  // const fetchData = () => {
  //   fetch(`https://proapi.azurewebsites.net/github/issues`)
  //   .then((res)=>res.json())
  //   .then(({results}) => {
  //     console.log(results)
  //   })
  // }

  return (
    <ProTable
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params = {}, sort, filter) => {
        console.log(sort, filter);
        console.log(params)
        await waitTime(2000);
        return request('https://proapi.azurewebsites.net/github/issues', {
          params,
        });
      }}
      editable={{
        type: 'multiple',
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
        onChange(value) {
          console.log('value: ', value);
        },
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      options={{
        setting: {
          listsHeight: 400,
        },
      }}
      form={{
        // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
            };
          }
          return values;
        },
      }}
      pagination={{
        pageSize: 5,
        onChange: (page) => console.log(page),
      }}
      dateFormatter="string"
      headerTitle="고급양식"
      toolBarRender={() => [
        <Button
          key="button"
          icon={<PlusOutlined />}
          onClick={() => {
            actionRef.current?.reload();
          }}
          type="primary"
        >
          새로만들기
        </Button>,
        <Dropdown
          key="menu"
          menu={{
            items: [
              {
                label: '1st item',
                key: '1',
              },
              {
                label: '2nd item',
                key: '1',
              },
              {
                label: '3rd item',
                key: '1',
              },
            ],
          }}
        >
          <Button>
            <EllipsisOutlined />
          </Button>
        </Dropdown>,
      ]}
    />
  );
}
