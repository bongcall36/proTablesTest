import { Button, message, Steps, theme } from 'antd';
import { useEffect, useState } from 'react';
import { AntChartsModalType } from './antchartsmodaltype'
import { AntChartsModalX } from './antchartsmodalx'
import { AntChartsModalY } from './antchartsmodaly'

export const AntChartsModal = (props) => {
  const steps = [
    {
      title: 'Chart Type',
      content: <AntChartsModalType chartType={props.chartType} data={props.data} chart={props.chart}/>,
    },
    {
      title: 'X Field',
      content: <AntChartsModalX initX={props.initX} data={props.data} xfield={props.xfield}/>,
    },
    {
      title: 'Y Field',
      content: <AntChartsModalY initY={props.initY} data={props.data} yfield={props.yfield}/>,
    },
  ];

  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
    if(steps.length-1 === current+1)
      props.bButtonDisabled(false)
  };

  const prev = () => {
    setCurrent(current - 1);
      props.bButtonDisabled(true)  
  };

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  const contentStyle = {
    lineHeight: '260px',
    textAlign: 'center',
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };

  return (
    <>
      <Steps current={current} items={items} />
      <div style={contentStyle}>{steps[current].content}</div>
      <div
        style={{
          marginTop: 24,
        }}
      >
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => message.success('Processing complete!')}>
            Done
          </Button>
        )}
        {current > 0 && (
          <Button
            style={{
              margin: '0 8px',
            }}
            onClick={() => prev()}
          >
            Previous
          </Button>
        )}
      </div>
    </>
  );
};