import Box from '@components/Box';
import DropDown from '..';
import './style.scss';

export default function Bookmark({ visible }) {
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

  const bookmarkList = (
    <ul className="bookmarkListWrapper">
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
  );

  return <DropDown title="저장한 챌린지" content={bookmarkList} visible={visible} />;
}
