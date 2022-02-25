import AppbarLayout from '@layouts/AppbarLayout';
import Box from '@components/Box';
import ParticiPateBox from '@components/Box/Participate';
import Button from '@components/Button';
import Tag from '@components/Tag';
import './style.scss';

export default function ParticipatePage() {
  /**
   * TODO
   * 장바구니에 포함되어 있는 챌린지 목록 가져오기
   * 버튼 클릭하면 participate/:id POST
   */
  return (
    <AppbarLayout>
      <p className="listTitle">참가하기</p>
      <ParticiPateBox title="챌린지 정보">
        <div className="challengeInfo">
          <p>블로그 글쓰기</p>
          <span>
            <Tag>주 O일</Tag>
            <Tag>2주</Tag>
          </span>
          <span>1월 19일(수) ~ 1월 30일(일)</span>
        </div>
      </ParticiPateBox>
      <ParticiPateBox title="목표에 캐시를 걸고 의지를 유지하세요!">
        <div className="feeInfo">
          <span>참가비</span>
          <span>10,000 원</span>
        </div>
        <Box color="gray">
          <div className="bold">{`100% 성공\n85% 이상 성공\n85% 미만 성공`}</div>
          <div>{`참가비 전액 환급 + 성공 리워드\n참가비 전액 환급\n참가비 일부 환급(성공률만큼)`}</div>
        </Box>
      </ParticiPateBox>
      <ParticiPateBox title="결제 금액">
        <div className="paymentInfo">
          <div>
            <p>
              <span>현재 보유 중인 캐시</span>
              <span className="currentCash">10,000 원</span>
            </p>
            <p>
              <span>총 참가비</span>
              <span className="totalFee">- 10,000 원</span>
            </p>
          </div>
        </div>
      </ParticiPateBox>
      <div className="flex">
        <Button size="medium">결제하고 챌린지 참가하기</Button>
      </div>
    </AppbarLayout>
  );
}
