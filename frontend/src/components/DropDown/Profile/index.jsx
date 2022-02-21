import DropDown from '..';
import './style.scss';

export default function Profile({ visible }) {
  const menuList = (
    <ul className="menuListWrapper">
      <li>챌린지 현황</li>
      <li>챌린지 개설</li>
      <li>내 정보</li>
    </ul>
  );

  return <DropDown content={menuList} visible={visible} signOut />;
}
