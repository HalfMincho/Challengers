import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';

import Button from '@components/Button';
import CheckBox from '@components/CheckBox';
import Box from '@components/Box';
import {
  MAX_NAME_LENGTH,
  MAX_CONTENT_LENGTH,
  CATEGORY_ARR,
  DAY_ARR,
  TIME_DICT,
  PERIOD_DICT,
} from '@constants/CHALLENGE';

import './style.scss';
import 'react-datepicker/dist/react-datepicker.css';

export default function OpenPage() {
  const [inputs, setInputs] = useState({
    category: '',
    dailyCount: '',
    period: 0,
    cost: '',
  });
  // eslint-disable-next-line no-unused-vars
  const { category, dailyCount, period, cost } = inputs;
  const handleInput = (e) => {
    let { value, name } = e.target;
    if (!isNaN(value)) value = Number(value);
    setInputs({ ...inputs, [name]: value });
  };

  const [texts, setTexts] = useState({
    name: '',
    authWay: '',
    description: '',
  });
  const { name, authWay, description } = texts;
  const handleText = (e) => {
    const { value, name, maxLength } = e.target;
    if (name.length < maxLength) {
      setTexts({ ...texts, [name]: value });
    }
  };

  const [isAllDay, setIsAllDay] = useState(true);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [isSelected, setIsSelected] = useState(false);
  const handleIsAllDay = (e) => {
    setIsAllDay(e.target.value === 'true' ? true : false);
    if (isAllDay === true) setStartTime(new Date().setHours(0, 0, 0, 0));
    else setStartTime(new Date().setHours(23, 50, 0, 0));
  };
  const handleTimes = (time) => {
    setStartTime(time);
    setIsSelected(true);
    setEndTime(null);
  };

  const [checkedItems, setCheckedItems] = useState(new Set());
  const handleCheckedItems = (id, isChecked) => {
    if (isChecked) {
      checkedItems.add(id);
      setCheckedItems(checkedItems);
    } else if (!isChecked && checkedItems.has(id)) {
      checkedItems.delete(id);
      setCheckedItems(checkedItems);
    }
  };

  const [startDate, setStartDate] = useState(new Date());
  const calculateEndDate = (startDate, period) => {
    const tempDate = new Date(startDate);
    tempDate.setDate(startDate.getDate() + period);
    const endDate = tempDate;
    const dayOfWeek = DAY_ARR[endDate.getDay()];
    const fullDate = new Date(+endDate + 3240 * 10000).toISOString().split('T')[0];
    const [year, month, day] = fullDate.split('-');
    return `${year}년 ${month}월 ${day}일 ${dayOfWeek}`;
  };

  // eslint-disable-next-line no-unused-vars
  const convertDays = (days) => {
    const authDay = '0000000'.split('');
    days.forEach((day) => {
      authDay[day] = '1';
    });
    return authDay.join('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <section>
        <p>어떤 주제와 관련이 있나요?</p>
        <div className="options">
          {CATEGORY_ARR.map((value, index) => (
            <label key={index}>
              <input name="category" value={value} type="radio" onChange={handleInput} /> {value}
            </label>
          ))}
        </div>
      </section>
      <section>
        <p>챌린지 제목을 입력해 주세요.</p>
        <input
          name="name"
          value={name}
          onChange={handleText}
          placeholder="예) 블로그 글쓰기"
          maxLength={MAX_NAME_LENGTH}
          className="large"
        />
        <p className="lengthLimit">
          {name.length}/{MAX_NAME_LENGTH}자
        </p>
      </section>
      <section>
        <p>인증 방법을 입력해 주세요.</p>
        <p className="description">실천 여부를 알 수 있도록 구체적인 인증 방법을 작성해 주세요.</p>
        <textarea
          name="authWay"
          value={authWay}
          onChange={handleText}
          placeholder="예) 직접 쓴 것이 보이도록 블로그 글 사진 찍기"
          maxLength={MAX_CONTENT_LENGTH}
          className="large"
        />
        <p className="lengthLimit">
          {authWay.length}/{MAX_CONTENT_LENGTH}자
        </p>
      </section>
      <section>
        <p>인증 가능 요일</p>
        <div className="options">
          {DAY_ARR.map((value, index) => (
            <label key={index}>
              <CheckBox value={index} handleCheckedItems={handleCheckedItems} /> {value}
            </label>
          ))}
        </div>
      </section>
      <section>
        <p>하루 인증 횟수</p>
        <div className="flex">
          <input
            name="dailyCount"
            type="number"
            value={dailyCount}
            min="1"
            onChange={handleInput}
            className="small right"
          />
          <div>회</div>
        </div>
      </section>
      <section>
        <p>인증 가능 시간</p>
        <div className="options normal">
          {TIME_DICT.map((time, index) => (
            <label key={index}>
              <input name="isAllDay" value={time.value} type="radio" onChange={handleIsAllDay} />{' '}
              {time.name}
            </label>
          ))}
        </div>
        {isAllDay === false && (
          <div className="times">
            <DatePicker
              name="startTime"
              locale={ko}
              dateFormat="시작 HH:mm"
              selected={startTime}
              onChange={handleTimes}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={10}
              timeCaption="시각 선택"
              placeholderText="시작 시각"
            ></DatePicker>
            <DatePicker
              name="endTime"
              locale={ko}
              dateFormat="종료 HH:mm"
              selected={endTime}
              onChange={(time) => setEndTime(time)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={10}
              minTime={
                isSelected
                  ? new Date(startTime).setMinutes(startTime.getMinutes() + 10)
                  : new Date().setHours(0, 0, 0, 0)
              }
              maxTime={new Date().setHours(23, 50, 0, 0)}
              timeCaption="시각 선택"
              placeholderText="종료 시각"
            ></DatePicker>
          </div>
        )}
      </section>
      <section>
        <p>챌린지 시작일</p>
        <DatePicker
          locale={ko}
          dateFormat="yyyy년 MM월 dd일"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          minDate={new Date()}
          className="date medium center"
        />
      </section>
      <section>
        <p>챌린지 기간</p>
        <div className="options">
          {PERIOD_DICT.map((period, index) => (
            <label key={index}>
              <input name="period" value={period.value} type="radio" onChange={handleInput} />{' '}
              {period.name}
            </label>
          ))}
        </div>
      </section>
      {period > 0 && (
        <Box color="brand" fullWidth>
          챌린지 예상 종료일 {calculateEndDate(startDate, period)}
        </Box>
      )}
      <section>
        <p>참가비를 설정하세요.</p>
        <div className="flex">
          <input
            name="cost"
            type="number"
            value={cost}
            min="0"
            onChange={handleInput}
            className="medium right"
          />
          <div>원</div>
        </div>
      </section>
      <section>
        <p>(선택) 챌린지를 소개하세요.</p>
        <p className="description">추가 글로 챌린지를 자세히 소개해 보세요.</p>
        <textarea
          name="description"
          value={description}
          onChange={handleText}
          placeholder="예) 자신의 분야에 깊이를 쌓고 싶으시거나 꾸준히 글을 쓰고 싶은 분들께 추천합니다."
          maxLength={MAX_CONTENT_LENGTH}
          className="large"
        />
        <p className="lengthLimit">
          {description.length}/{MAX_CONTENT_LENGTH}자
        </p>
      </section>
      <div className="button">
        <Button type="submit" size="medium">
          개설하기
        </Button>
      </div>
    </form>
  );
}
