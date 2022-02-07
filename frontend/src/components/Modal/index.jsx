import { GrClose } from 'react-icons/gr';
import './style.scss';

export default function Modal({ size, title, subTitle, middleContent, visible, onClose }) {
  const closeModal = (e) => {
    if (onClose) onClose(e);
  };

  return (
    <>
      <div className={`modalOverlay ${visible ? 'visible' : 'none'}`} onClick={closeModal}></div>
      <div
        className={`modalWrapper ${visible ? 'visible' : 'none'} ${size}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="closeIcon">
          <GrClose onClick={closeModal} />
        </div>
        {title && <p className="title">{title}</p>}
        {subTitle && <p className="subTitle">{subTitle}</p>}
        {middleContent}
      </div>
    </>
  );
}
