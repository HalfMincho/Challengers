import { useParams, useNavigate } from 'react-router-dom';
import Modal from '..';
import Button from '@components/Button';
import { CHALLENGE_MANAGE_MESSAGE } from '@constants/MESSAGE';
import './style.scss';

const { CHALLENGE_DELETE_SUCCESS } = CHALLENGE_MANAGE_MESSAGE;

export default function ChallengeDeleteModal({ visible, onClose }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const deleteChallenge = async () => {
    const status = await deleteChallenge(id);
    if (status === 200) {
      alert(CHALLENGE_DELETE_SUCCESS);
      onClose();
      navigate('/');
    }
  };
  const ChallengeDeleteComponent = (
    <div className="buttons">
      <Button color="gray" onClick={onClose}>
        취소
      </Button>
      <Button onClick={deleteChallenge}>삭제</Button>
    </div>
  );

  return (
    <Modal
      title="챌린지 삭제"
      subTitle={`챌린지를 삭제하면 모든 정보가 사라집니다.\n챌린지를 정말 삭제하시겠습니까?`}
      middleContent={ChallengeDeleteComponent}
      visible={visible}
      onClose={onClose}
      size="small"
    />
  );
}
