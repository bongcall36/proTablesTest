export const tableListDataSource = [];

const creators = ['홍길동', '이이', '이황', '정약용', '정조'];

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

export const chartAlias = {
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

export const defaultChartData = {
    chartType: 'Column',
    chartX: 'name1',
    chartY: 'containers'
}
