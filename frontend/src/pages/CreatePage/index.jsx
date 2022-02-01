import AppbarLayout from '../../layouts/AppbarLayout';
import ChallengeCreate from '../../components/Form/ChallengeCreate';
import './style.scss';

export default function CreatePage() {
  return (
    <AppbarLayout>
      <div className="CreatePage">
        <p className="title">챌린지 개설하기</p>
        <p>원하는 챌린지를 직접 만들어 보세요!</p>
      </div>
      <ChallengeCreate />
    </AppbarLayout>
  );
}
