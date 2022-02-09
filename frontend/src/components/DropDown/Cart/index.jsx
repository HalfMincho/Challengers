import Box from '@components/Box';
import Button from '@components/Button';
import DropDown from '..';
import './style.scss';

export default function Cart() {
  const tempChallengeInfo = [
    {
      name: '블로그 글쓰기',
      remaining: '오늘',
      startDay: '01.17(월)',
      endDay: '01.30(일)',
    },
    {
      name: '블로그 글쓰기',
      remaining: '오늘',
      startDay: '01.17(월)',
      endDay: '01.30(일)',
    },
    {
      name: '블로그 글쓰기',
      remaining: '오늘',
      startDay: '01.17(월)',
      endDay: '01.30(일)',
    },
  ];

  const cartList = (
    <div className="cartListWrapper">
      <ul>
        {tempChallengeInfo.map((item, index) => (
          <li key={index}>
            <Box color="gray">
              <p className="challengeName">{item.name}</p>
              <span>{item.remaining}부터 시작</span>
              <span>
                {item.startDay} ~ {item.endDay}
              </span>
            </Box>
          </li>
        ))}
      </ul>
      <div className="flex">
        <Button>참가하기</Button>
      </div>
    </div>
  );

  return <DropDown title="장바구니" content={cartList} />;
}
