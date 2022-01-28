import { useState } from 'react';
import './style.scss';

export default function CheckBox({ value, handleCheckedItems }) {
  const [isChecked, setIsChecked] = useState(false);

  const checkHandler = ({ target }) => {
    setIsChecked(!isChecked);
    handleCheckedItems(value, target.checked);
  };

  return <input type="checkbox" onChange={(e) => checkHandler(e)} />;
}
