import AppbarLayout from '@layouts/AppbarLayout';
import CardList from '@components/CardList';
import Tag from '@components/Tag';
import './style.scss';

export default function DashboardPage() {
  return (
    <AppbarLayout>
      <p className="pageTitle">챌린지 현황</p>
      <div className="tagList">
        <Tag>참가 중인 챌린지</Tag>
        <Tag>완료한 챌린지</Tag>
        <Tag>개설한 챌린지</Tag>
      </div>
      <CardList />
      {/*
       * TODO
       * 각 태그 클릭 시 CardList type props 전달 (accessToken 필요)
       * 참가 중 participate
       * 완료 complete
       * 개설 open
       */}
    </AppbarLayout>
  );
}
