import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import AppbarLayout from '../../layouts/AppbarLayout';
import Tag from '../../components/Tag';
import Button from '../../components/Button';
import Box from '../../components/Box';
import Paragraph from '../../components/Paragraph';

import './style.scss';

export default function DetailPage() {
  const [data, setData] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/challenge/${id}`);
        setData(response.data);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    data && (
      <AppbarLayout>
        <div className="container">
          <p className="views">조회 {data.views}</p>
          <div className="startDiv">
            <p className="name">{data.name}</p>
            <Button>로그인 후 이용해 주세요</Button>
          </div>
          <div className="tags">
            <Tag>주 O일</Tag>
            <Tag>O주</Tag>
          </div>
          <Paragraph>{['챌린지 비용', `${data.cost}원`]}</Paragraph>
          <Paragraph>{['챌린지 설명', data.description]}</Paragraph>
          <Paragraph>{['챌린지 기간', 'O주']}</Paragraph>
          <Paragraph>
            {[
              '챌린지 진행 시 꼭 알아주세요!',
              `1. O주 동안 주 O일, 하루에 ${data.auth_count_in_day}번 인증샷을 업로드하셔야 합니다.\n2. 인증 가능한 요일은 ${data.auth_day}입니다.\n 3. 인증 가능 시간은 ${data.auth_start_time}부터 ${data.auth_end_time}입니다.`,
            ]}
          </Paragraph>
          <Paragraph>{['인증 방법 및 주의사항', data.auth_way]}</Paragraph>
          <Paragraph>
            {[
              '환급정책',
              <Box key={id} color="gray">
                <div>{`100% 성공\n85% 이상 성공\n85% 미만 성공`}</div>
                <div>{`참가비 전액 환급 + 성공 리워드\n참가비 전액 환급\n참가비 일부 환급(성공률만큼)`}</div>
              </Box>,
            ]}
          </Paragraph>
        </div>
      </AppbarLayout>
    )
  );
}
