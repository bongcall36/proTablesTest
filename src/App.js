import React, {useContext} from 'react';
import './App.css';
import {AntProForm} from './components/tables/antproform'
import {AntProDragSortTable} from './components/tables/antprodragsorttable'
import {AntProTable} from './components/tables/antprotable'
import {AntProQueryTable} from './components/tables/antproquerytable'
import {AntProNestedTable} from './components/tables/antpronestedtable'
import {AntProCard} from './components/cards/antprocard'
import {AntProStatisticCard} from './components/cards/antprostatisticcard'
import {AntProDescription} from './components/descriptions/antprodescription';
import {AntProWaterMark} from './components/watermarks/antprowatermark';
import {AntProCheckCard} from './components/checkcards/antprocheckcard';

import { ConfigProvider } from 'antd';
import ProConfigContext from '@ant-design/pro-provider';
// import enUS from 'antd/lib/locale/en_US';
import koKR from 'antd/lib/locale/ko_KR';
import * as ProKoKRlib  from '@ant-design/pro-provider/lib/locale/ko_KR';
import * as ProKoKRes  from '@ant-design/pro-provider/es/locale/ko_KR';

const tableListDataSource = [];

const creators = ['付小小', '曲丽丽', '林东东', '陈帅帅', '兼某某'];

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

const chartAlias = {
    key: {
        alias: '',
    },
    name1: {
        alias: '분류',
    },
    name2: {
        alias: 'AppName2',
    },
    containers: {
        alias: '수량',
    },
    creator: {
        alias: 'creator',
    },
    status: {
        alias: '상태',
    },
    createdAt: {
        alias: '날짜',
    },  
    fixed: {
        alias: 'fixed',
    },            
};
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

const defaultChartData = {
    chartType: 'Column',
    chartX: 'name1',
    chartY: 'containers'
}

export function App() {
    // const AntdConfigContext = useContext(ConfigProvider.ConfigContext);
    // console.log(AntdConfigContext)
    // const proProvide = useContext(ProConfigContext);
    // console.log(proProvide)
    return(
        <>
       <ConfigProvider locale={koKR}>
        	{/* <AntProForm/> */}
            <AntProNestedTable data={tableListDataSource} defaultChart={defaultChartData} chartAlias={chartAlias}/>
            {/* <AntProQueryTable/>
            <AntProTable/>
            <AntProDragSortTable/> */}
            <AntProCard/>
            <AntProStatisticCard/>
            <AntProDescription/>
            <AntProWaterMark/>
            <AntProCheckCard/>
        </ConfigProvider>  
        </> 
    )
}
export default App;
