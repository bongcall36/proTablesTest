import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Column, Bar } from '@ant-design/plots';

export const AntvCharts = (props) => {
  //console.log(props.config)
  if(props.type === 'Column')
    return <Column {...props.config} />;
  else if(props.type === 'Bar')
    return <Bar {...props.config} />;
};
