import { useRef, useState } from 'react';
import { MenuOutlined } from '@ant-design/icons';
import { DragSortTable } from '@ant-design/pro-components';
import { message } from 'antd';

const data = [
    {
      key: 'key1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      index: 0,
    },
    {
      key: 'key2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      index: 1,
    },
    {
      key: 'key3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      index: 2,
    },
];
    const wait = async (delay = 1000) =>
    new Promise((resolve) => setTimeout(() => resolve(void 0), delay));

    let remoteData = data.map((item) => ({
        ...item,
        name: `[remote data] ${item.name}`,
    }));
    const request = async () => {
        await wait(3000);
        return {
            data: remoteData,
            total: remoteData.length,
            success: true,
        };
    };

export const AntProDragSortTable = () => {
    const columns = [
        {
          title: '정렬',
          dataIndex: 'sort',
          render: (dom, rowData, index) => {
            return (
              <span className="customRender">{`사용자지정Render[${rowData.name}-${index}]`}</span>
            );
          },
        },
        {
          title: '이름',
          dataIndex: 'name',
          className: 'drag-visible',
        },
        {
          title: '연령',
          dataIndex: 'age',
        },
        {
          title: '주소',
          dataIndex: 'address',
        },
      ];
      const columns2 = [
        {
          title: '정렬',
          dataIndex: 'sort',
        },
        {
          title: '이름',
          dataIndex: 'name',
          className: 'drag-visible',
        },
        {
          title: '연령',
          dataIndex: 'age',
        },
        {
          title: '주소',
          dataIndex: 'address',
        },
    ];
    const actionRef = useRef();
    const [dataSource1, setDatasource1] = useState(data);
    const [dataSource2, setDatasource2] = useState(data);
    const handleDragSortEnd1 = (newDataSource) => {
    console.log('정렬된데이터', newDataSource);
    setDatasource1(newDataSource);
    message.success('목록 정렬을 하였습니다');
    };
    const handleDragSortEnd2 = (newDataSource) => {
    console.log('정렬된데이터', newDataSource);
    setDatasource2(newDataSource);
    message.success('목록 정렬을 하였습니다');
    };
    const handleDragSortEnd3 = (newDataSource) => {
    console.log('정렬된데이터', newDataSource);
    // 模拟将排序后数据发送到服务器的场景
    remoteData = newDataSource;
    // 请求成功之后刷新列表
    actionRef.current?.reload();
    message.success('목록 정렬을 하였습니다');
    };
    
    const dragHandleRender = (rowData, idx) => (
    <>
        <MenuOutlined style={{ cursor: 'grab', color: 'gold' }} />
        &nbsp;{idx + 1} - {rowData.name}
    </>
    );

    return (
    <>
        <DragSortTable
        headerTitle="드래그정렬(기본)"
        columns={columns}
        rowKey="key"
        pagination={false}
        dataSource={dataSource1}
        dragSortKey="sort"
        onDragSortEnd={handleDragSortEnd1}
        />
        <DragSortTable
        headerTitle="드래그정렬(사용자지정)"
        columns={columns2}
        rowKey="index"
        search={false}
        pagination={false}
        dataSource={dataSource2}
        dragSortKey="sort"
        dragSortHandlerRender={dragHandleRender}
        onDragSortEnd={handleDragSortEnd2}
        />
        <DragSortTable
        actionRef={actionRef}
        headerTitle="request를 사용하여 데이터 원본 가져오기"
        columns={columns2}
        rowKey="index"
        search={false}
        pagination={false}
        request={request}
        dragSortKey="sort"
        onDragSortEnd={handleDragSortEnd3}
        />
    </>
    );
}
