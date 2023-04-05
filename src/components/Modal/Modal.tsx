import { useRef, useEffect } from 'react';
import cx from 'classnames';
import './Modal.css';

export default function Modal(props: any) {
  const TOUCH_MOVE_CONTAINER_CLASS_NAME = 'DiableScroll-touch-move-container';
  const {
    isVisible,
    setIsVisible,
    className,
    zIndex,
    onAfterOpen,
    disableBodyScrollLock,
    allowContentTouchMove,
  } = props;

  const modalRef = useRef(null);

  useEffect(() => {
    function close(e: any) {
      if (e.keyCode === 27 && setIsVisible) {
        setIsVisible(false);
      }
    }
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [setIsVisible]);

  useEffect(() => {
    if (typeof onAfterOpen === 'function') onAfterOpen();
  }, [onAfterOpen]);

  const fadeVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  if (!isVisible) {
    return <div></div>;
  }
  return (
    <div className={cx('Modal', className)} style={{ zIndex }}>
      <div
        className="Modal-backdrop"
        style={{
          overflow: isVisible ? 'hidden' : 'visible',
          position: 'fixed',
        }}
        onClick={() => setIsVisible(false)}
      ></div>
      <div className="Modal-content">
        <div className="Modal-title-bar">
          <div className="Modal-title">{props.label}</div>
          <div
            className="Modal-close-button"
            onClick={() => setIsVisible(false)}
          >
            {/* <MdClose fontSize={20} className="Modal-close-icon" /> */}
            {/* 关闭图标 */}
          </div>
        </div>
        <div className="divider" />
        <div
          className={cx('Modal-body', TOUCH_MOVE_CONTAINER_CLASS_NAME)}
          ref={modalRef}
        >
          {props.children}
        </div>
      </div>
    </div>
  );
}
