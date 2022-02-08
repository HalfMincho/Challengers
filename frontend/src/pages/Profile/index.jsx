import { useState } from 'react';
import Box from '@components/Box';
import AppbarLayout from '@layouts/AppbarLayout';
import UserNameChangeModal from '@components/Modal/UserNameChange';
import PasswordChangeModal from '@components/Modal/PasswordChange';
import './style.scss';

export default function ProfilePage() {
  const [modalState, setModalState] = useState({
    userNameChangeModalVisible: false,
    passwordChangeModalVisible: false,
  });
  const { userNameChangeModalVisible, passwordChangeModalVisible } = modalState;

  const openModal = (type) => {
    setModalState({ ...modalState, [type + 'ChangeModalVisible']: true });
  };

  const closeModal = (type) => {
    setModalState({ ...modalState, [type + 'ChangeModalVisible']: false });
  };

  return (
    <AppbarLayout>
      <div className="ProfilePageWrapper">
        <section>
          <p className="sectionTitle">내 정보</p>
          <Box color="gray" fullWidth>
            <div>
              <p className="infoName">이름(닉네임)</p>
              <p className="infoName">이메일</p>
            </div>
            <div>
              <div>
                <span>OOO</span>
                <button onClick={() => openModal('userName')} className="modalLink">
                  변경
                </button>
              </div>
              <p>example@example.com</p>
            </div>
          </Box>
        </section>
        <section>
          <span className="sectionTitle">비밀번호 변경</span>
          <button onClick={() => openModal('password')} className="modalLink">
            변경
          </button>
        </section>
      </div>
      {userNameChangeModalVisible && (
        <UserNameChangeModal
          visible={userNameChangeModalVisible}
          onClose={() => closeModal('userName')}
        />
      )}
      {passwordChangeModalVisible && (
        <PasswordChangeModal
          visible={passwordChangeModalVisible}
          onClose={() => closeModal('password')}
        />
      )}
    </AppbarLayout>
  );
}
