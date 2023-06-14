import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Column } from '@ant-design/plots';

export const AntvBasicColumnPlot = (props) => {
  //console.log(props.config)
  return <Column {...props.config} />;
};
