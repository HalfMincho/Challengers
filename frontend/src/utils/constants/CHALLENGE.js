const MAX_NAME_LENGTH = 25;

const MAX_CONTENT_LENGTH = 500;

const CATEGORY_ARR = ['건강', '역량', '정서', '자산', '생활', '취미', '그 외'];

const DAY_ARR = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];

const TIME_DICT = [
  { name: '24시간', value: true },
  { name: '시간 설정하기', value: false },
];

const PERIOD_DICT = [
  { name: '1주', value: 7 },
  { name: '2주', value: 14 },
  { name: '3주', value: 21 },
  { name: '4주', value: 28 },
  { name: '30일', value: 30 },
  { name: '40일', value: 40 },
  { name: '100일', value: 100 },
  { name: '기타', value: 0 },
];

export { MAX_NAME_LENGTH, MAX_CONTENT_LENGTH, CATEGORY_ARR, DAY_ARR, TIME_DICT, PERIOD_DICT };
