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
    return `${year}??? ${month}??? ${day}??? ${dayOfWeek}`;
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
        <p>?????? ????????? ????????? ??????????</p>
        <div className="options">
          {CATEGORY_ARR.map((value, index) => (
            <label key={index}>
              <input name="category" value={value} type="radio" onChange={handleInput} /> {value}
            </label>
          ))}
        </div>
      </section>
      <section>
        <p>????????? ????????? ????????? ?????????.</p>
        <input
          name="name"
          value={name}
          onChange={handleText}
          placeholder="???) ????????? ?????????"
          maxLength={MAX_NAME_LENGTH}
          className="large"
        />
        <p className="lengthLimit">
          {name.length}/{MAX_NAME_LENGTH}???
        </p>
      </section>
      <section>
        <p>?????? ????????? ????????? ?????????.</p>
        <p className="description">?????? ????????? ??? ??? ????????? ???????????? ?????? ????????? ????????? ?????????.</p>
        <textarea
          name="authWay"
          value={authWay}
          onChange={handleText}
          placeholder="???) ?????? ??? ?????? ???????????? ????????? ??? ?????? ??????"
          maxLength={MAX_CONTENT_LENGTH}
          className="large"
        />
        <p className="lengthLimit">
          {authWay.length}/{MAX_CONTENT_LENGTH}???
        </p>
      </section>
      <section>
        <p>?????? ?????? ??????</p>
        <div className="options">
          {DAY_ARR.map((value, index) => (
            <label key={index}>
              <CheckBox value={index} handleCheckedItems={handleCheckedItems} /> {value}
            </label>
          ))}
        </div>
      </section>
      <section>
        <p>?????? ?????? ??????</p>
        <div className="flex">
          <input
            name="dailyCount"
            type="number"
            value={dailyCount}
            min="1"
            onChange={handleInput}
            className="small right"
          />
          <div>???</div>
        </div>
      </section>
      <section>
        <p>?????? ?????? ??????</p>
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
              dateFormat="?????? HH:mm"
              selected={startTime}
              onChange={handleTimes}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={10}
              timeCaption="?????? ??????"
              placeholderText="?????? ??????"
            ></DatePicker>
            <DatePicker
              name="endTime"
              locale={ko}
              dateFormat="?????? HH:mm"
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
              timeCaption="?????? ??????"
              placeholderText="?????? ??????"
            ></DatePicker>
          </div>
        )}
      </section>
      <section>
        <p>????????? ?????????</p>
        <DatePicker
          locale={ko}
          dateFormat="yyyy??? MM??? dd???"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          minDate={new Date()}
          className="date medium center"
        />
      </section>
      <section>
        <p>????????? ??????</p>
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
          ????????? ?????? ????????? {calculateEndDate(startDate, period)}
        </Box>
      )}
      <section>
        <p>???????????? ???????????????.</p>
        <div className="flex">
          <input
            name="cost"
            type="number"
            value={cost}
            min="0"
            onChange={handleInput}
            className="medium right"
          />
          <div>???</div>
        </div>
      </section>
      <section>
        <p>(??????) ???????????? ???????????????.</p>
        <p className="description">?????? ?????? ???????????? ????????? ????????? ?????????.</p>
        <textarea
          name="description"
          value={description}
          onChange={handleText}
          placeholder="???) ????????? ????????? ????????? ?????? ??????????????? ????????? ?????? ?????? ?????? ????????? ???????????????."
          maxLength={MAX_CONTENT_LENGTH}
          className="large"
        />
        <p className="lengthLimit">
          {description.length}/{MAX_CONTENT_LENGTH}???
        </p>
      </section>
      <div className="button">
        <Button type="submit" size="medium">
          ????????????
        </Button>
      </div>
    </form>
  );
}
