/*
import { MenuOutlined } from '@ant-design/icons';
import {
  arrayMoveImmutable,
  ProTable,
  useRefFunction,
} from '@ant-design/pro-components';
import { useState } from 'react';
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from 'react-sortable-hoc';

const DragHandle = SortableHandle(() => (
  <MenuOutlined style={{ cursor: 'grab', color: '#999' }} />
));

const columns = [
  {
    title: '순서',
    dataIndex: 'sort',
    width: 60,
    className: 'drag-visible',
    search: false,
    render: () => <DragHandle />,
  },
  {
    title: '이름',
    tooltip: '이름 tooltip',
    dataIndex: 'name',
    className: 'drag-visible',
  },
  {
    title: '나이',
    dataIndex: 'age',
  },
  {
    title: '주소',
    dataIndex: 'address',
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    index: 0,
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    index: 1,
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    index: 2,
  },
];

export const AntProTable = () => {
  const [dataSource, setDataSource] = useState(data);
  const SortableItem = SortableElement((props) => <tr {...props} />);
  const SortContainer = SortableContainer((props) => <tbody {...props} />);

  const onSortEnd = useRefFunction(
    ({ oldIndex, newIndex }) => {
      if (oldIndex !== newIndex) {
        const newData = arrayMoveImmutable({
          array: [...dataSource],
          fromIndex: oldIndex,
          toIndex: newIndex,
        }).filter((el) => !!el);
        setDataSource([...newData]);
      }
    },
  );

  const DraggableContainer = (props) => (
    <SortContainer
      useDragHandle
      disableAutoscroll
      helperClass="row-dragging"
      onSortEnd={onSortEnd}
      {...props}
    />
  );

  const DraggableBodyRow = (props) => {
    const { className, style, ...restProps } = props;
    // function findIndex base on Table rowKey props and should always be a right array index
    const index = dataSource.findIndex(
      (x) => x.index === restProps['data-row-key'],
    );
    return <SortableItem index={index} {...restProps} />;
  };

  return (
    <ProTable
      headerTitle="드래그정렬"
      columns={columns}
      rowKey="index"
      pagination={false}
      dataSource={dataSource}
      components={{
        body: {
          wrapper: DraggableContainer,
          row: DraggableBodyRow,
        },
      }}
      search={searchConfig}
      form={{
        // disabled: true,
        colon: false,
        requiredMark : true,
      }}
    />
  );
}
*/
import { DragSortTable } from '@ant-design/pro-components';
import { message } from 'antd';
import { useState } from 'react';

const columns = [
  {
    title: '排序',
    dataIndex: 'sort',
    width: 60,
    className: 'drag-visible',
  },
  {
    title: '姓名',
    dataIndex: 'name',
    className: 'drag-visible',
  },
  {
    title: '年龄',
    dataIndex: 'age',
  },
  {
    title: '地址',
    dataIndex: 'address',
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    index: 0,
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    index: 1,
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    index: 2,
  },
];

export const AntProTable = () => {
  const [dataSource, setDataSource] = useState(data);

  const handleDragSortEnd = (newDataSource) => {
    console.log('排序后的数据', newDataSource);
    setDataSource(newDataSource);
    message.success('修改列表排序成功');
  };

  return (
    <DragSortTable
      headerTitle="拖拽排序(默认把手)"
      columns={columns}
      rowKey="key"
      pagination={false}
      dataSource={dataSource}
      dragSortKey="sort"
      onDragSortEnd={handleDragSortEnd}
    />
  );
};