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

export function App() {
    // const AntdConfigContext = useContext(ConfigProvider.ConfigContext);
    // console.log(AntdConfigContext)
    // const proProvide = useContext(ProConfigContext);
    // console.log(proProvide)
    return(
        <>
       <ConfigProvider locale={koKR}>
        	{/* <AntProForm/> */}
            <AntProNestedTable/>
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
