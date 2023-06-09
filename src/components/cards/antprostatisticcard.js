import { ProCard, StatisticCard } from '@ant-design/pro-components';
import RcResizeObserver from 'rc-resize-observer';
import { useState } from 'react';
import {DemoArea} from '../charts/antprochart'

const { Statistic } = StatisticCard;

export const AntProStatisticCard = () => {
  const [responsive, setResponsive] = useState(false);

  return (
    <RcResizeObserver
      key="resize-observer"
      onResize={(offset) => {
        setResponsive(offset.width < 596);
      }}
    >
      <ProCard split={responsive ? 'horizontal' : 'vertical'}>
        <StatisticCard
          colSpan={responsive ? 24 : 6}
          title="회계연도 실적 목표"
          statistic={{
            value: 82.6,
            suffix: '亿',
            description: <Statistic title="전년동기대비" value="6.47%" trend="up" />,
          }}
          chart={
            // <img
            //   src="https://gw.alipayobjects.com/zos/alicdn/PmKfn4qvD/mubiaowancheng-lan.svg"
            //   alt="진행표"
            //   width="100%"
            // />
            <DemoArea/>
          }
          footer={
            <>
              <Statistic
                value="70.98%"
                title="회계연도 실적완료율"
                layout="horizontal"
              />
              <Statistic
                value="86.98%"
                title="전년 동기 실적 달성률"
                layout="horizontal"
              />
              <Statistic
                value="88.98%"
                title="전년 동기 실적 완료율"
                layout="horizontal"
              />
            </>
          }
        />
        <StatisticCard.Group
          colSpan={responsive ? 24 : 18}
          direction={responsive ? 'column' : undefined}
        >
          <StatisticCard
            statistic={{
              title: '회계연도 총수입',
              value: 601987768,
              description: (
                <Statistic title="전년동기대비" value="6.15%" trend="up" />
              ),
            }}
            chart={
              <img
                src="https://gw.alipayobjects.com/zos/alicdn/zevpN7Nv_/xiaozhexiantu.svg"
                alt="꺾은선 그래프"
                width="100%"
              />
            }
          >
            <Statistic
              title="총주문수입"
              value={1982312}
              layout="vertical"
              description={
                <Statistic title="전년동기대비" value="6.15%" trend="down" />
              }
            />
          </StatisticCard>
          <StatisticCard
            statistic={{
              title: '당일 순위',
              value: 6,
              description: (
                <Statistic title="전년동기대비" value="3.85%" trend="down" />
              ),
            }}
            chart={
              <img
                src="https://gw.alipayobjects.com/zos/alicdn/zevpN7Nv_/xiaozhexiantu.svg"
                alt="꺾은선 그래프"
                width="100%"
              />
            }
          >
            <Statistic
              title="최근7일수입"
              value={17458}
              layout="vertical"
              description={
                <Statistic title="전년동기대비" value="6.47%" trend="up" />
              }
            />
          </StatisticCard>
          <StatisticCard
            statistic={{
              title: '회계연도 실적 수입 순위',
              value: 2,
              description: (
                <Statistic title="전년동기대비" value="6.47%" trend="up" />
              ),
            }}
            chart={
              <img
                src="https://gw.alipayobjects.com/zos/alicdn/zevpN7Nv_/xiaozhexiantu.svg"
                alt="꺾은선 그래프"
                width="100%"
              />
            }
          >
            <Statistic
              title="월 결제 개수"
              value={601}
              layout="vertical"
              description={
                <Statistic title="전년동기대비" value="6.47%" trend="down" />
              }
            />
          </StatisticCard>
        </StatisticCard.Group>
      </ProCard>
    </RcResizeObserver>
  );
};