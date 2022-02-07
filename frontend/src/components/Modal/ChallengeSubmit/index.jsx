import { useState } from 'react';
import Modal from '..';
import Button from '@components/Button';
import './style.scss';

export default function SubmitModal({ visible, onClose }) {
  const [text, setText] = useState('');

  const handleInput = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const SubmitComponent = (
    <form className="submitWrapper" onSubmit={handleSubmit}>
      <textarea
        value={text}
        placeholder="이번 인증은 어떠셨나요?"
        onChange={handleInput}
        required
      />
      <Button type="submit" size="medium" fullWidth>
        인증하기
      </Button>
    </form>
  );

  return (
    <Modal
      title="챌린지 인증"
      middleContent={SubmitComponent}
      visible={visible}
      onClose={onClose}
      size="large"
    />
  );
}
