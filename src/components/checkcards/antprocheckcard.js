import { CheckCard } from '@ant-design/pro-components';

export const AntProCheckCard = () => (
  <CheckCard.Group
    onChange={(value) => {
      console.log('value', value);
    }}
    defaultValue="A"
  >
    <CheckCard title="Card A" description="옵션1" value="A" />
    <CheckCard title="Card B" description="옵션2" value="B" />
    <CheckCard
      title="Card C"
      disabled
      description="옵션3, 이것은 선택 불가"
      value="C"
    />
  </CheckCard.Group>
);