import { Transfer, Table, Button } from 'antd';
import { useEffect, useState } from 'react';

export const AntChartsModalType = (props) => {
  const initialData = [
    {
      disabled: false,
      key: 0,
      title: 'Column',
      description: 'Column Chart',
      chosen: props.chartType === 'Column' ? true : false,

    },
    {
      disabled: false,
      key: 1,
      title: 'Bar',
      description: 'Bar Chart',
      chosen: props.chartType === 'Bar' ? true : false,
    }
  ]

  const leftTableColumns = [
    {
      dataIndex: 'title',
      title: 'title',
    },
    {
      dataIndex: 'description',
      title: 'Description',
    },
  ];
  const rightTableColumns = [
    {
      dataIndex: 'title',
      title: 'title',
    },
    {
      dataIndex: 'description',
      title: 'Description',
    },
  ];

  const [chartsType, setChartsType] = useState(initialData);
  const [targetKeys, setTargetKeys] = useState([]);
  const [chartType, setChartType] = useState();
  const [disabled, setDisabled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const onChange = (nextTargetKeys) => {
    setTargetKeys(nextTargetKeys);
    console.log(nextTargetKeys)
    const findData = chartsType.filter((item)=> item.key === nextTargetKeys[0])
    console.log(findData)
    if(findData.length > 0){
      props.chart(findData[0].title)
    }else  
      props.chart('')
  };

  const getChartType = () =>{
    const tempTargetKeys = [];
    const tempChartType = [];

    chartsType.forEach((item)=>{
      if(item.chosen == true){
        tempTargetKeys.push(item.key)
        setChartType(item)
      }
      else{
        item.disabled = true
      }
    })
    setTargetKeys(tempTargetKeys);
  }

  useEffect(() => {
    getChartType();
  }, []);

  useEffect(() => {
    if(targetKeys.length == 1)
    {
      const tempData = chartsType.map((item)=>{
        if(item.key !== targetKeys[0]){
          item.disabled = true
        }
        return item
      })
      setChartsType(tempData)
    }
    else{
      const tempData = chartsType.map((item)=>{
          item.disabled = false
          return item
      })
      setChartsType(tempData)
    }

  }, [targetKeys]);

  const filterOption = (inputValue, option) => option.description.indexOf(inputValue) > -1;

  const handleChange = (newTargetKeys) => {
    setTargetKeys(newTargetKeys);
  };
  const handleSearch = (dir, value) => {
    console.log('search:', dir, value);
  };
  const TableTransfer = ({ leftColumns, rightColumns, ...restProps }) => (
    <Transfer {...restProps}>
      {({
        direction,
        filteredItems,
        onItemSelectAll,
        onItemSelect,
        selectedKeys: listSelectedKeys,
        disabled: listDisabled,
      }) => {
        const columns = direction === 'left' ? leftColumns : rightColumns;
        const rowSelection = {
          getCheckboxProps: (item) => ({
            disabled: listDisabled || item.disabled,
          }),
          // onSelectAll(selected, selectedRows) {
          //   const treeSelectedKeys = selectedRows
          //     .filter((item) => !item.disabled)
          //     .map(({ key }) => key);
          //   const diffKeys = selected
          //     ? difference(treeSelectedKeys, listSelectedKeys)
          //     : difference(listSelectedKeys, treeSelectedKeys);
          //   onItemSelectAll(diffKeys, selected);
          // },
          // onSelectAll(selected, selectedRows) {
          //   const treeSelectedKeys = selectedRows
          //     .filter((item) => !item.disabled)
          //     .map(({ key }) => key);
          //   onItemSelectAll(treeSelectedKeys, selected);
          // },
          onSelect({ key }, selected) {
            if(listSelectedKeys.length === 0 || selected === false){
              // 하나 선택
              onItemSelect(key, selected);
            }
            else {
              return
            }
            console.log(listSelectedKeys)
            console.log(key)
            console.log(selected)
            onItemSelect(key, selected);
          },
          selectedRowKeys: listSelectedKeys,
        };
        return (
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={filteredItems}
            size="small"
            style={{
              pointerEvents: listDisabled ? 'none' : undefined,
            }}
            onRow={({ key, disabled: itemDisabled }) => ({
              onClick: () => {
                if (itemDisabled || listDisabled) return;
                onItemSelect(key, !listSelectedKeys.includes(key));
              },
            })}
          />
        );
      }}
    </Transfer>
  );

  return (
    <div>
      <TableTransfer
        dataSource={chartsType}
        targetKeys={targetKeys}
        disabled={disabled}
        showSearch={showSearch}
        onChange={onChange}
        filterOption={(inputValue, item) =>
          item.title.indexOf(inputValue) !== -1 || item.tag.indexOf(inputValue) !== -1
        }
        leftColumns={leftTableColumns}
        rightColumns={rightTableColumns}
        showSelectAll={false}
      />
    </div>        
  );
};