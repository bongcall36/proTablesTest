import { ProDescriptions } from '@ant-design/pro-components';

export const AntProDescription = () => {
  return (
    <ProDescriptions
      title="고급정의목록 request columns"
      request={async () => {
        return Promise.resolve({
          success: true,
          data: {
            id: '이것은 한 단락의 텍스트이다 columns',
            date: '20200809',
            money: '1212100',
            money2: -12345.33,
            state: 'all',
            switch: true,
            state2: 'open',
          },
        });
      }}
      columns={[
        {
          title: '원본',
          key: 'text',
          dataIndex: 'id',
        },
        {
          title: '상태',
          key: 'state',
          dataIndex: 'state',
          valueType: 'select',
          valueEnum: {
            all: { text: '전부', status: 'Default' },
            open: {
              text: '미해결',
              status: 'Error',
            },
            closed: {
              text: '완료됨',
              status: 'Success',
            },
          },
        },
        {
          title: '상태2',
          key: 'state2',
          dataIndex: 'state2',
        },
        {
          title: '시간',
          key: 'date',
          dataIndex: 'date',
          valueType: 'date',
        },
        {
          title: '날짜',
          key: 'date',
          dataIndex: 'date',
          valueType: 'date',
          fieldProps: {
            format: 'DD.MM.YYYY',
          },
        },
        {
          title: '변경',
          key: 'switch',
          dataIndex: 'switch',
          valueType: 'switch',
        },
        {
          title: 'money',
          key: 'money',
          dataIndex: 'money',
          valueType: 'money',
          fieldProps: {
            moneySymbol: '$',
          },
        },
        {
          title: 'money',
          key: 'money',
          dataIndex: 'money',
          valueType: 'money',
          fieldProps: {
            moneySymbol: false,
          },
        },
        {
          title: 'money2',
          key: 'money2',
          dataIndex: 'money2',
          valueType: 'money',
          fieldProps: {
            moneySymbol: false,
          },
        },
        {
          title: '조작',
          valueType: 'option',
          render: () => [
            <a target="_blank" rel="noopener noreferrer" key="link">
              링크
            </a>,
            <a target="_blank" rel="noopener noreferrer" key="warning">
              경보
            </a>,
            <a target="_blank" rel="noopener noreferrer" key="view">
              조사
            </a>,
          ],
        },
      ]}
    >
      <ProDescriptions.Item
        dataIndex="percent"
        label="백분율"
        valueType="percent"
      >
        100
      </ProDescriptions.Item>
      <div>과잉dom</div>
    </ProDescriptions>
  );
};