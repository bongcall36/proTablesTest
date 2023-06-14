import { Transfer, Table, Button } from 'antd';
import { useEffect, useState } from 'react';

export const AntChartsModalX = (props) => {
  const [data, setData] = useState();
  const [targetKeys, setTargetKeys] = useState();
  const [selectedKeys, setSelectedKeys] = useState([]);

  const getChartXData = () =>{
    const tempData = [];
    let index = 0;
    for(const [key, value] of Object.entries(props.data[0])){
      // console.log(`${key} : ${value}`)
      // console.log(typeof(value))
      if(typeof(value) !== 'number' && key !== 'key'){
        const newData = {
          key: index ++,
          title: key,
          disabled: false,
        }
        tempData.push(newData)
      }
      setData(tempData)
    }
    const tempTargetKeys = [];

    tempData.forEach((item)=>{
      if(props.initX !== '' && props.initX === item.title){
        tempTargetKeys.push(item.key)
      }
      else{
        item.disabled = true
      }
    })
    setTargetKeys(tempTargetKeys);
  }

  useEffect(() => {
    getChartXData();
  }, []);

  useEffect(() => {
    if(data === undefined) return
    if(targetKeys !== undefined && targetKeys.length == 1)
    {
      const tempData = data.map((item)=>{
        if(item.key !== targetKeys[0]){
          item.disabled = true
        }
        return item
      })
      setData(tempData)
    }
    else{
      const tempData = data.map((item)=>{
          item.disabled = false
          return item
      })
      setData(tempData)
    }

  }, [targetKeys]);

  const onChange = (nextTargetKeys, direction, moveKeys) => {
    console.log('targetKeys:', nextTargetKeys);
    console.log('direction:', direction);
    console.log('moveKeys:', moveKeys);
    setTargetKeys(nextTargetKeys);
    const findData = data.filter((item)=> item.key === nextTargetKeys[0])
    if(findData.length > 0){
      props.xfield(findData[0].title)
    }else  
      props.xfield('')
  };
  const onSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    console.log('sourceSelectedKeys:', sourceSelectedKeys);
    console.log('targetSelectedKeys:', targetSelectedKeys);
    if(sourceSelectedKeys.length > 1)
      return
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

  return (
    <div>
      <Transfer
        dataSource={data}
        showSearch
        showSelectAll={false}
        titles={['Source', 'Target']}
        targetKeys={targetKeys}
        selectedKeys={selectedKeys}
        onChange={onChange}
        onSelectChange={onSelectChange}
        render={(item) => item.title}
      />
    </div>        
  );
};