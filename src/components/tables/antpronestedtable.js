import { Children, useRef, useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import { DownOutlined, SearchOutlined } from '@ant-design/icons';
import { ProProvider, ProTable } from '@ant-design/pro-components';
import { Button, Input, Space, Table, Tag, Divider, Radio, Badge } from 'antd';
import Highlighter from 'react-highlight-words';

import { AntvBasicColumnPlot } from '../charts/antvbasiccolumnplot';

const statusMap = {
  0: {
    color: 'blue',
    text: '진행중',
  },
  1: {
    color: 'green',
    text: '완료',
  },
  2: {
    color: 'volcano',
    text: '경고',
  },
  3: {
    color: 'red',
    text: '실패',
  },
  4: {
    color: '',
    text: '미완성',
  },
};

const tableListDataSource = [];

const creators = ['付小小', '曲丽丽', '林东东', '陈帅帅', '兼某某'];

for (let i = 0; i < 5; i += 1) {
  tableListDataSource.push({
    key: i,
    name1: 'AppName' + (i+1),
    name2: 'AppName' + (i+1),
    containers: Math.floor(Math.random() * 20),
    creator: creators[Math.floor(Math.random() * creators.length)],
    status: statusMap[Math.floor(Math.random() * 10) % 5],
    createdAt: Date.now() - Math.floor(Math.random() * 100000),
    fixed: 'fixed',
  });
 
}

const getDataByStatus=(status)=>{
  let data = []
  if(status === '전체'){
    data = tableListDataSource
  }else{
    data = tableListDataSource.filter((data) => data.status.text === status)
  }
  return data
}

const expandedRowRender = () => {
  const data = [];
  for (let i = 0; i < 3; i += 1) {
    data.push({
      key: i,
      date: '2014-12-24 23:12:00',
      name: 'This is production name',
      upgradeNum: 'Upgraded: 56',
    });
  }
  return (
    <ProTable
      columns={[
        { title: 'Date', dataIndex: 'date', key: 'date' },
        { title: 'Name', dataIndex: 'name', key: 'name' },

        { title: 'Upgrade Status', dataIndex: 'upgradeNum', key: 'upgradeNum' },
        {
          title: 'Action',
          dataIndex: 'operation',
          key: 'operation',
          valueType: 'option',
          render: () => [<a key="Pause">Pause</a>, <a key="Stop">Stop</a>],
        },
      ]}
      headerTitle={false}
      search={false}
      options={false}
      dataSource={data}
      pagination={false}
    />
  );
};

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === 'Disabled User',
    // Column configuration not to be checked
    name: record.name,
  }),
};

const renderBadge = (count, active = false) => {
  return (
    <Badge
      count={count}
      style={{
        marginBlockStart: -2,
        marginInlineStart: 4,
        color: active ? '#1890FF' : '#999',
        backgroundColor: active ? '#E6F7FF' : '#eee',
      }}
    />
  );
};
const changeChartData = (data, xfield, yfield, xalias, yalias) => {
  //data
  //const newData = data.map(({ key, name2, creator, createdAt, fixed, status, ...rest }) => rest);
  //config
  const config = {
    data: data,
    xField: xfield,
    yField: yfield,
    label: {
      position: 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      xalias: {
        alias: xalias,
      },
      yalias: {
        alias: yalias,
      },
    },
  }; 
  config.meta[xfield] = config.meta['xalias']
  config.meta[yfield] = config.meta['yalias']
  delete config.meta['xalias']
  delete config.meta['yalias']
  return config  
}

export const AntProNestedTable = () => {
  const [selectionType, setSelectionType] = useState('checkbox');
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [activeKey, setActiveKey] = useState('전체');
  const [activeData, setActiveData] = useState('');
  const tableChartRef = useRef();
  const searchInput = useRef(null);
  const [columnsStateMap, setColumnsStateMap] = useState({
    name: {
      disable: false,
    },
    name1: {
      disable: true,
    },
    name2: {
      disable: true,
    },        
  });
  const [chartConfig, setChartConfig] = useState();
  const [tableChartShow, SetTableChartShow] = useState(false);
  useEffect(() => {
    setActiveData(getDataByStatus(activeKey))
  }, [activeKey]);

  const OnChartClick = () => {
    const config = changeChartData(tableListDataSource, 'name1', 'containers', '분류', '수량')
    SetTableChartShow(!tableChartShow)
    setChartConfig(config)
  }

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });
  
  const searchConfig = {
    searchText : '검색' 
  }

  const columns = [
    {
      //disable: true, 
      // hideInSetting: true,
      title : '응용프로그램명', 
      dataIndex: 'name',
      key: 'name',
      children : [
      {
        disable: true, 
        title: '응용프로그램명1',
        width: 120,
        dataIndex: 'name1',
        render: (_) => <a>{_}</a>,
        ...getColumnSearchProps('name1')
      },
      {
        disable: true, 
        title: '응용프로그램명2',
        width: 120,
        dataIndex: 'name2',
        render: (_) => <a>{_}</a>,
        ...getColumnSearchProps('name2')
      }]
    },
    {
      title: '상태',
      disable: true,  
      width: 120,
      dataIndex: 'status',
      key: 'status',
      filters: [
        {
          text: '진행중',
          value: '진행중',
        },
        {
          text: '완료',
          value: '완료',
        },
        {
          text: '경고',
          value: '경고',
        },
        {
          text: '실패',
          value: '실패',
        },  
        {
          text: '미완성',
          value: '미완성',
        },                         
      ],
      filterSearch: true,
      //onFilter: (value, record) => record.status.text.indexOf(value) === 0,   
      onFilter: (value, record) => record.status.text.startsWith(value),
      render: (_, record) => (
        <Tag color={record.status.color}>{record.status.text}</Tag>
      ),
    },
    {
      title: '수량',
      width: 120,
      dataIndex: 'containers',
      align: 'right',
      sorter: (a, b) => a.containers - b.containers,
    },
  
    {
      title: '만든이',
      width: 120,
      dataIndex: 'creator',
      valueEnum: {
        all: { text: '전부' },
        付小小: { text: '付小小' },
        曲丽丽: { text: '曲丽丽' },
        林东东: { text: '林东东' },
        陈帅帅: { text: '陈帅帅' },
        兼某某: { text: '兼某某' },
      },
    },
    {
      title: 'fixed',
      dataIndex: 'fixed',
      key: 'fixed',
      width: 80,
      fixed: 'right',
    },    
  ];
  const values = useContext(ProProvider);
  return (
    <div>
      <Radio.Group
      onChange={({ target: { value } }) => {
        setSelectionType(value);
      }}
      value={selectionType}
    >
        <Radio value="checkbox">Checkbox</Radio>
        <Radio value="radio">radio</Radio>
      </Radio.Group>

      <Divider />

      <ProTable
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}      
        columns={columns}
        request={(params, sorter, filter) => {
          // 검색 부분 구현
          console.log(params, sorter, filter);
          return Promise.resolve({
            data: activeData,
            success: true,
          });
        }}
        dataSource={activeData}
        toolbar={{
          menu: {
            type: 'tab',
            activeKey: activeKey,
            items: [
              {
                key: '전체',
                label: <span>전체{renderBadge(getDataByStatus('전체').length, activeKey === '전체')}</span>,
              },              
              {
                key: '진행중',
                label: <span>진행중{renderBadge(getDataByStatus('진행중').length, activeKey === '진행중')}</span>,
              },
              {
                key: '완료',
                label: <span>완료{renderBadge(getDataByStatus('완료').length, activeKey === '완료')}</span>,
              },
              {
                key: '경고',
                label: <span>경고{renderBadge(getDataByStatus('경고').length, activeKey === '경고')}</span>,
              },
              {
                key: '실패',
                label: <span>실패{renderBadge(getDataByStatus('실패').length, activeKey === '실패')}</span>,
              },
              {
                key: '미완성',
                label: <span>미완성{renderBadge(getDataByStatus('미완성').length, activeKey === '미완성')}</span>,
              },                            
            ],
            onChange: (key) => {
              setActiveKey(key);
            },
          },          
        }}
        toolBarRender={() => [
          <Button key="show">로그보기</Button>,
          <Button key="out">
            데이터내보내기
            <DownOutlined />
          </Button>,
          <Button key="primary" type="primary" onClick={OnChartClick}>
            차트
          </Button>,
        ]}        
        rowKey="key"
        pagination={{
          showQuickJumper: true,
        }}
        expandable={{ expandedRowRender }}
        search={searchConfig}
        dateFormatter="string"
        headerTitle="중첩Table"
        options={true}
        // options={{
        //   setting: {
        //     draggable: true,
        //     checkable: true,
        //     checkedReset: false,
        //     extra: [<a key="confirm">确认</a>],
        //   },
        // }}        
        scroll={{ x: 'calc(700px + 50%)', y: 240 }}
        bordered
        title={() => 'Header'}
        footer={() => 'Footer'}
        columnsState={{
          value: columnsStateMap,
          onChange: setColumnsStateMap,
        }}
      />
      <div ref={tableChartRef} id='tablechart'>
        {tableChartShow ? <AntvBasicColumnPlot config={chartConfig}/>:null}
      </div>
    </div>
  );
}
